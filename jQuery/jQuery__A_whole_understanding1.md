## jQuery에 대한 전체적인 이해1
> 소년코딩 블로그를 가이드로 한 jQuery를 전반적으로 이해

## IIFE(즉시 함수 호출 표현식)
> jQuery는 IIFE 표현식을 사용해 전역객체에 namespace(jQuery, $)를 설정하고 해당 namespace에 jQuery객체를 할당해 사용한다.

```
window.jQuery || window.$
            ∧
            ┃
            ┃  
            ┗━ new jQuery.fn.init(selector, context)
               selector[default]: document

jQuery.fn.init <━━━ jQuery.fn.init.prototype = jQuery.fn
                      ┗━ this === jQuery[Function]
```

### jQuery가 초기화 되는 과정

```javascript
// 1. jQuery의 makeArray 메서드를 통해 배열화된 객체를 반환.
jQuery.fn.makeArray = jQuery.prototype.makeArray = function( arr, results ) {
  var ret = results || [];

  if ( arr != null ) {
    if ( isArrayLike( Object( arr ) ) ) {
      jQuery.merge( ret,
        typeof arr === "string" ?
        [ arr ] : arr
      );
    } else {
      push.call( ret, arr );
    }
  }

  return ret;
}

// 2. jQuery의 prototype의 init 메서드는 jQuery의 makeArray 메서드를 통해 배열화된 객체를 반환.
var init = jQuery.fn.init = function(selector, context, root ) {

  /*
    ...
     logic
    ...
  */

  return jQuery.makeArray( selector, this );
}

// 3. jQuery의 prototype의 init 메서드를 통해 jQuery함수의 새로운 인스턴스 객체를 만들어 반환.
var jQuery = function(selector, context) {
  
  return new jQuery.fn.init( selector, context );
}
```
#### 결과
  1. $('body') => jQuery.fn.init [body, prevObject: jQuery.fn.init(1)] 
    - body를 jQuery화 시켰을 때 반환되는 값.
      - jQuery.fn.init [body, prevObject: jQuery.fn.init(1)]
      - 이 객체는 `배열`이고 jQuery 배열 객체의 key값으로 `prevObject`가 추가가 됨.
      - `prevObject`는 body를 jQuery화 시키기 이전의 jQuery의 기본적으로 초기화 된 값[`document`]


### prototype
- javascript는 prototype based language
- prototype is Object

### method chaning
> 함수는 실행 될 때 어떤 객체에 바인딩되어 실행된다.
- jQuery의 인스턴스 객체의 toArray 메서드의 this(context)를 호출하면 jQuery.fn.init [body, prevObject: jQuery.fn.init(1)]가 호출 되는데 jQuery의 prototype의 context가 jQuery.fn.init이라는 것을 알 수 있음.

```javascript
$('body').fade().fadeOut();
```
- jQuery의 method의 반환값을 this를 반환
- $('body')의 fade()메서드를 호출하고 this를 반환하면 fade함수의 로직이 적용된 후 자기 자신을 반환하게 됨.
- 자기 자신을 반환하기 때문에 그 직후 `.fadeOut()`을 사용할 수 있음.

### function

