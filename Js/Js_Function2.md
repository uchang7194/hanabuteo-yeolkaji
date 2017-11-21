# 함수 전달인자와 매개변수

## 매개변수는 생략이 가능
```javascript

  function getParams(a, b, c) {

    console.log('a: ', a);
    console.log('b: ', b);
    console.log('c: ', c);
  }

  getParams(1); // a: 1 b: undefined c: undefined
  getParams(1, 2); // a: 1 b: 2 c: undefined
  getParams(1, 2, 3); // a: 1 b: 2 c: 3

  // 매개변수 초기화

  function getParamsInit(a, b, c) {

    a = a || 1;
    b = b || 2;
    c = c || 3;

    console.log('a: ', a);
    console.log('b: ', b);
    console.log('c: ', c);
  }
  getParamsInit(4); // a: 4 b: 2 c: 3
  getParamsInit(4, 5); // a: 4 b: 5 c: 3
  getParamsInit(4, 6, 7); // a: 4 b: 5 c: 6

  // 매개변수 초기화 es6
  function getParamsInitES6(a = 1, b = 2, c = 3) {
    console.log('a: ', a);
    console.log('b: ', b);
    console.log('c: ', c);
  }

  getParamsInitES6(8); // a: 8 b: 2 c: 3
  getParamsInitES6(8, 9); // a: 8 b: 9 c: 3
  getParamsInitES6(8, 9, 10); // a: 8 b: 9 c: 10
```

## Arguments 객체
- 정의된 매개변수보다 더 많은 인자가 전달이 될 때 사용한다.

```javascript
function max() {
  return Math.max.apply(null, arguments);
}

console.log('max: ', max(2, 5, 8)); // 8
```

