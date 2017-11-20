# 렌더링 엘리먼트

엘리먼트는 리애트앱에서 가장 작은 구조화된 블록이다.

스크린에 보여줄 엘리먼트입니다:
```javascript
const element = <h1>Hello, world</h1>
```

브라우저의 DOM element와는 달리 리액트는 일반 객체이기 때문에 적은 자원으로 만들 수 있습니다. 리액트 DOM은 리액트 elements와 일치하도록 DOM을 업데이트합니다.

> Note: elements와 널리 알려진 `components`개념과 혼동할 수 있다. 우리는 [다음 섹션]에서 components를 소개할 것 입니다. Elements는 컴포넌트들이 "~을 만드는 것" 이고 우리는 당신이 앞서 넘어가기 전에 이 색션을 읽어보기를 권장합니다.

## DOM에서 엘리먼트를 렌더링하는 방법.

예를 들어 당신의 HTML파일에 `<div>`가 있다면:
```html
<div id="root"></div>
``` 

우리는 이것을 DOM 노드의 "root"라고 부릅니다. 왜냐하면 그 안에 있는 모든 것들은 리액트 DOM에 의해서 관리될 것이기 때문입니다.

Application들은 항상 하나의 DOM 노드 루트를 가지는 리액트로 구축됩니다. 만약 당신이 작업중인 App에 리액트를 추가한다면 분리된 root DOM nodes에서 원하는 만큼 추가 할 수 있습니다.

root DOM node에서 리액트를 렌더링 하기 위해 ReactDOM.render()에 모두 전달하세요:
```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root');
);
```
[CodePen에서 시도해보세요](https://codepen.io/gaearon/pen/rrpgNB?editors=1010)

페이지에서 "Hello, world"라고 보여집니다.

## 렌더된 엘리먼트를 업데이트 하는 방법.

리액트 엘리먼트들은 불변합니다. 당신이 하나의 엘리먼트를 만들었을 떄 당신은 그것들의 자식들 또는 엘리먼트를 바꿀 수 없습니다. 엘리먼트는 영화에서 하나의 프레임과 같습니다. 특정 시점의 UI를 나타냅니다.

지금까지 UI를 업데이트 하기위한 방법으로 새로운 엘리먼트를 생성하고 ReactDOM.render()로 전달하는 방법을 알고 있었습니다.

동작하는 시계 예제를 생각해봅시다:
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>
        {new Date().toLocaleTimeString()}.
      </h2>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);

```
[CodePen에서 시도해보세요](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

[setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)의 콜백함수로 부터 매초마다 ReactDOM.render()를 호출합니다.

> Note: 연습으로 대부분의 리액트 앱들은 하나의 ReactDOM.render()를 호출합니다. 다음 섹션에서 어떻게 [stateful components]()로 캡슐화 되는지 배울 것입니다. 우리는 그것들이 서로에 기반하기 때문에 주제를 스킵하지 않는 것을 추천합니다.

## 리액트는 필요한 부분만 업데이트 합니다.

리액트 DOM은 엘리먼트와 자식들을 비교하고 변화된 상태의 DOM 부분을 업데이트 합니다.

