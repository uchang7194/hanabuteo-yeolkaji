# 함수
> 함수는 재사용 할 수 있는 코드블록이다.

## 특징
1. 매개변수(parameter)를 가지고 있다.
  - 매개변수는 함수의 지역변수로써 사용할 수 있다.
2. 함수를 호출 시 매개 변수가 있는 값에 실인자(arguments)를 전달 할 수 있다.
  - argument 뿐만 아니라 호출 컨텍스트(invocation context)가 포함되는데 `this` 키워드 값이 바로 해당 컨텍스트이다.
3. 함수는 객체이다.
  - 함수를 변수에 저장할 수 있고 다른 함수에 인자로 전달할 수 있다. 그리고 property로 저장할 수 있고 함수의 메서드를 호출 할 수 있다.
4. 클로저를 사용할 수 있다.
  - 함수 안에 다른 함수가 중첩되고 중첩된 함수가 정의된 유효범위 안의 어떤 변수에도 접근할 수 있다.
```javascript
  // 클로저
  function closure() {
    
    var _name = 'uchang';

    return {
      getName: function() {
        return _name;
      },
      setName: function(name) {
        _name = name;
      }
    }
  }

  var aa = closure();

  aa.getName(); // uchang

  aa.setName('Heo Uchang');
  aa.getName(); // Heo Uchang;

```

## 함수 정의
> 함수는 function 키워드에 의해 정의되고 여러 요소들과 함께 구성된다.

```javascript
  function angKimochi() {
    
  }
```
1. `function`: 함수를 정의하기 위한 키워드
2. `'angKimochi'`: 함수 이름 식별자 
3. `()`: 매개변수가 들어올 장소. 지역변수처럼 취급
4. `{}`: javascript 코드를 정의할 장소(계속 재사용 되어지는 코드들)

### 선언문 형태
```javascript
  // 1. return이 없는 경우 
  function ang() {
    console.log('kimochi');
  }

  ang(); // kimochi
  console.log(ang()) // undefined 

  // 2. return이 있는 경우
  function ang() {
    return 'kimochi';
  }
  
  ang(); // 'kimochi'가 반환되기는 하지만 출력되지는 않는다.
  console.log(ang()); // 'kimochi'가 정상적으로 출력이 된다.
```
#### 특징
1. 선언문 형태의 함수를 호출할 경우 return 유무에 따라 반환하는 값이 다르다.

### 표현식 형태
```javascript
  // 1. 출력되는 부분 위쪽에 선언을 했을 경우.
  var ang = function() {
    return 'kimochi';
  }

  console.log(ang()); // kimochi가 정상적으로 출력이 된다.

  // 2. 출력되는 부분 아래쪽에 출력했을 경우.

  console.log(ang()); // undefined

  var ang = function() {
    return 'kimochi';
  }

  // 3. 변수를 위쪽에 선언하고 함수를 할당했을 경우.

  var ang = null;

  console.log(ang()); // null
  
  ang = function() {
    return 'kimochi';
  }

  // 4. 함수의 이름을 포함하는 표현식

  var ang = function kimochi() {
    return 'kimochi';
  }

  console.log(ang()); // kimochi

  // 5. 함수 표현식은 전달인자로 사용할 수 있다.
  
  var ang = function() {
    return 'kimochi';
  }

  function angKimochi(kimochi) {
    return 'ang ' + kimochi;
  }

  console.log( angKimochi( ang() ) ); // ang kimochi 
```
#### 특징
1. 표현식으로 함수를 선언할 경우 함수 선언은 항상 출력되는 곳 위쪽에 선언해야 한다.
  - 자바스크립트의 호이스팅(Hoisting) 때문에 `2번`의 경우가 생기게 된다.
  - Hoisting은 간단히 이야기 하자면 프로그램을 실행할 때 변수는 해당 Context의 가장 위쪽에 먼저 초기화가 되기 때문이다.
    프로그램이 실행이 되면 `3번`의 경우처럼 실행이 된다.

### 중첩 함수
> 함수는 중첩해서 사용할 수 있다.
```javascript
  // 1. 중첩 함수는 해당 Context의 변수에 접근 할 수 있다.

  function ang(just_feeling) {
    function kimochi(say_what) {
      return say_what;
    }

    return 'ang ' + kimochi(just_feeling);
  }

  console.log( ang('kimochi!!') ); // ang kimochi
```

#### 특징
1. 중첩된 함수는 해당 함수가 속한 함수의 매개변수와 변수에 접근할 수 있다.
  - `1번`을 보면 kimochi(중첩함수)는 ang Context의 just_feeling을 사용할 수 있다.

### 함수 호출하기

#### 호출 방법
1. 일반적인 함수 형태
  - 호출 순서
    1. 각각의 전달인자 표현식이 평가(evaluated)가 된다.
    2. 평가 결과 값이 해당함수의 전달인자가 된다.
    3. 전달인자 값들은 함수 정의에 등장하는 형식인자에 대응된다.
    4. 함수 몸체에서 형식인자는 실인자의 값으로 평가된다.
      - 전달인자가 매개변수에 대응이 되었을 경우 실인자 값으로 평가된다는 이야기 같음.
  - return값 유무에 따라 반환값이 결정된다.

  ```javascript
    // 1-1. 일반적인 함수 형태 (선언문 형식)
    function ang() {
      console.log('kimochi!!');
    }
    
    ang(); // kimochi!!

    // 1-2. 일반적인 함수 형태 (표현식 형식)
    var ang = function() {
      console.log('kimochi!!');
    }

    ang(); //kimochi!!
  ```

2. 메서드 형태
> 객체의 속성으로 저장된 함수.
```javascript

  // 1-1. 메서드 형태의 호출방법
  var ang = {},
      kimochi = null;

  kimochi = function() {
    console.log('kimochi');
  }

  ang.kimochi = kimochi;

  ang.kimochi(); // kimochi

  // 1-2. 메서드 형태의 호출방법
  var ang = {};

  ang.kimochi = function() {
    console.log('kimochi');
  }

  ang.kimochi(); // kimochi
  
  // 1-3. 메서드 형태의 호출방법

  var ang = {};

  ang.kimochi = function(just_feeling) {
    console.log(just_feeling);
  } 

  ang.kimochi('kimochi'); // kimochi

  // 1-4. 메서드 형태의 호출방법(객체의 Context를 참조하는 방법)

  var ang = {
    current_feeling: 'kimochi',
    kimochi: function() {
      console.log('ang' + this.current_feeling);
    }
  }

  ang.kimochi(); // ang kimochi
  ang['kimochi'](); // ang kimochi

  // 1-5. 메서드 체이닝을 이용한 호출방법

  var ang = {
    connected_words: '',
    connected_count: 0,
    connect_word: function(word) {

      (this.connected_count !== 0) ? word = ' ' + word : word;

      this.connected_words += word;
      this.connected_count++;
      return this;
    } 
  }
  
  ang.connect_word('ang').connect_word('kimochi');
  console.log(ang.connected_words); // ang kimochi

  // 1-6 중첩 함수에서 객체의 Context를 사용하는 방법.

  var ang = {
    connected_words: '',
    connected_count: 0,
    connect_word: function(word) {

      var self = this;

      function increaseConnectedCount() {
        (self.connected_count !== 0) ? word = ' ' + word : word;
      }

      this.connected_words += word;
      this.connected_count++;
      return this;
    } 
  }

  ang.connect_word('ang').connect_word('kimochi');
  console.log(ang.connected_words); // ang kimochi

```
  - 특징
    1. 메서드의 Context는 객체 `ang`이 호출 컨텍스트가 된다.
      - this 키워드를 사용해서 `ang`을 참조할 수 있다.
      - `1-4`을 보면 `ang`객체의 메서드인 kimochi는 this 키워드를 통해서 current_feeling을 참조하고 있다.
      - this에 값을 할당하는 것을 허용하지 않는다.
    2. 메서드는 해당 객체의 Context를 암시적 인자로 전달받는다.
    3. 메서드 호출 문법은 해당 객체에 무언가를 한다는 사실을 나타내는 방법이다.
    4. 메서드 체이닝
      - 메서드가 객체를 반환하면 메서드의 반환 값을 후속 호출의 일부로 사용할 수 있다.
      - `1-5`를 보면 `ang`객체의 `connected_word` 메서드에서 `ang`객체의 Context를 반환하도록 `return this`를 하였고 이를 이용해서 `ang.connect_word('ang').connect_word('kimochi');`처럼 후속 호출을 할 수 있다.
    5. 메서드에서 중첩 함수를 사용시 객체의 Context를 참조할 수 있는 방법.
      - 중첩 함수에서 객체의 속성에 접근시 `strict 모드` 유무에 따라 global객체에 접근하거나 undefined를 호출하게 된다.
      - 이 문제를 해결하기 위해 `1-6`을 보면 중첩 함수의 Context에서 this를 변수에 담아 사용할 수 있다.

3. 생성자
> 메서드 호출 앞에 new 키워드가 있으면 생성자 호출이다.

```javascript

  // 1. 생성자 호출 방식

  function Ang() {
    this.sayWhat = function() {
      console.log('kimochi');
    }
  }

  function ExplictAng() {
    this.sayWhat = function() {
      console.log('kimochi');
    }
    return {
      explict_sayWhat: function() {
        console.log('kimochi');
      }
    }
  }

  function returnPrimitiveAng() {
    this.sayWhat = function() {
      console.log('kimochi');
    }
    return 'kimochi';
  }
  var ang1 = new Ang();
  var ang2 = new Ang;
  // ang1의 값 => {sayWhat: f, _proto_: Object}
  // ang2의 값 => {sayWhat: f, _proto_: Object}

  var explict_ang = new ExplictAng();
  // explict_ang의 값 => {explict_sayWhat: f, _proto_: Object}

  var primitive_ang = new returnPrimitiveAng();
  // primitive_ang의 값 => {sayWhat: f, _proto_: Object}
```
  - 특징
    1. 생성자 호출은 일반 함수와 메서드 호출에 비해 매개변수, 호출 컨텍스트와 반환 값을 다루는 방식이 다르다.
    2. 생성자 호출에서 괄호 안에 전달가 포함되어 있다면, 전달인자 표현식이 평가된 후 생성자 함수에 전달된다. 그러나 생성자에 매개변수가 없다면 괄호를 아예 생략하는 것을 허용한다.
      - `1번`처럼 `()`를 생략할 수 있다.
    3. 생성자를 호출하면 생성자의 prototype property를 상속받은 새로운 빈 객체가 생성된다.
      - 생성자는 이 객체를 초기화하고 이 객체는 생성자 함수의 호출 컨텍스트로 사용된다. 그래서 this 키워드로 참조 할 수 있다.
      - 객체를 초기화 한 후 암시적으로 그 객체를 반환한다.
      - 만약 return 문을 사용하여 명시적으로 어떤 객체르 반환한다면 반환된 객체가 생성자 호출 표현식의 값이 된다.
      - return 문만 사용하거나 primitive value를 반환한다면 그 반환값은 무시되고 새로 생성된 객체가 호출 표현식 값으로 사용된다.

4. call과 apply 메서드를 통한 간접 호출
> 메서드를 특정 객체의 매서드로 호출

