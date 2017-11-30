# 리스트와 키

첫번째로 자바스크립트에서 리스트를 변화시키는 방법을 리뷰 할 것입니다.

주어진 아래의 코드에서 우리는 `number`의 배열을 가지고 그들의 값을 2배 곱하는 [map()]() 함수를 사용할 것입니다. 우리는 2배가 된 값을 `map()`에 의해 반환 된 새로운 배열을 할당하고 그것을 log합니다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

이 코드는 콘솔에서 `[2, 4, 6, 8, 10]`를 log합니다.

리액트에서 `elements`의 리스트에서 변환하는 배열은 거의 동일합니다.

### 여러 컴포넌트를 렌더링하는 방법

당신은 엘리먼트들의 컬렉션들을 구축할 수 있고 중괄호를 사용한 JSX로 그것들을 포함시킬 수 있습니다.

아래에서 우리는 javascript `map()`함수를 사용하는 `numbers` 배열을 통해 반복할 것입니다. 우리는 각 아이템들에 `<li>`를 반환합니다. 마지막으로 결과적으로 `listItems`에 엘리먼트의 배열을 할당합니다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

우리는 `<ul>`엘리먼트 안에 `listItems`배열 전체를 포함시키고 [DOM에서 그 것을 렌더합니다]()

```javascript
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[CodePen에서 실행하세요!](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

이 코드는 1부터 5 사이의 숫자를 불릿 리스트로 보여줍니다.

