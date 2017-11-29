# 스택을 만들어 봅시다
> LIFO(Last In First Out) 나중에 들어온 값이 먼저 빠지는 구조.

## 조건
1. Stack 생성자를 만든다.
  - 생성자를 생성할 때 값을 push할 때 배열에 들어갈 수 있는 `최대갯수`를 설정할 수 있도록 만든다.
  - 만약 아무 값도 넣지 않을 경우 `최대갯수의 default값`을 설정한다.
  - 최대 갯수를 설정 할 `init` 메서드를 prototype으로 만들어 사용한다.
```javascript
  var stack = new Stack(5); // 값을 5개만 받을 수 있다. ex) this.max => 5
  var stack_empty_param = new Stack(); // ex) this.max => 10
```
2. 값을 받을 장소를 `배열의 형태`로 만든다.
3. `push` 메서드를 prototype으로 만든다.
  - push 메서드는 아래의 형태로 만들어지며 어느 값이든 받을 수 있다.
```javascript
  function Stack() {
    // ...
  }

  // value: anyone
  Stack.prototype.push = function(value) {
    // ...
  }
```
4. `pop` 메서드를 prototype으로 만든다.
  - pop 메서드는 push메서드와 같은 형태로 만들어지며 배열의 마지막 값을 출력한다.
  - pop을 했을 경우 배열이 pop 이후의 값들로만 구성된 배열로 `swap` 시키도록 만든다. 
    - ex) [2, 3] -> pop -> [2]
    - Array.prototype.slice, Array.prototype.splice 함수를 사용.
5. 배열의 값이 얼마가 들어있는지 알기 위한 `crtValueCount` 메서드를 prototype으로 만든다.
6. 배열을 순회(travelsing)을 할 수 있는 메서드를 prototype으로 만든다.


### Stack 구현  
```javascript
function Stack(max) {

  this.max = 10;
  this.idx = 0;
  this.values = [];


  this.init(max);
}

Stack.prototype = {
  init: function(value) {
    value = value || 10;
    this.max = value;
  },
  push: function(value) {
    if( this.idx >= this.max ) {
      console.log('데이터가 '+ this.max + '개를 초과하였습니다.');
      return;
    }
    this.values[this.idx++] = value;
  },
  pop: function() {

    if( this.idx <= 0 ) {
      console.log('데이터가 없습니다.');
      return;
    } 
    var copy_values = this.values.slice();
    var pop_value = copy_values.splice(--this.idx, 1);

    this.values = copy_values;

    return pop_value[0];
  },
  crtValueCount: function() {
    return this.idx;
  },
  travelsing: function() {
    this.values.forEach(function(data, index) {
      console.log('values의 ' + index + '번쨰 값: ' + data);
    });
  }
}
```