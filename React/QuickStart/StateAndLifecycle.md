# State 와 Lifecycle

[이전 예제](./ComponentsAndProps.md)에서 시계 예제를 생각해봅시다.

지금까지 우리는 단지 UI를 업데이트 하는 것만 배웠습니다.

우리는 render된 output을 바꾸기 위해서 ReactDOM.render()를 호출합니다.
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
[CodePen에서 시도하세요!](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

이 섹션에서 우리는 진정으로 재사용하고 캡슐화할 수 있는 Clock 컴포넌트를 만드는 방법을 배울 겁니다. 컴포넌트 자신의 타이머를 설치하고 매초마다 자신을 업데이트 할 것입니다.

우리는 어떻게 시계를 보일 수 있는지 캡슐화할 것입니다.

```javascript
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
[CodePen에서 시도하세요!](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

그러나 이 코드는 결정적인 요구사항을 놓쳤습니다. `Clock`이 타이머를 설치하고 UI를 매초마다 업데이트 시키는 것은 `Clock` 컴포넌트 내부에서 실행되어야 합니다.

이상적으로 `Clock`을 한번만 사용하고 자기 자신을 업데이트 시키길 원합니다.

```javascript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

이 것을 개선하기 위해 우리는 `Clock` 컴포넌트에 `state`를 추가할 것입니다.

State는 props와 비슷합니다. 하지만 이것은 private하고 컴포넌트에 의해 전부 컨트롤됩니다.

우리는 전에 컴포넌트들이 클래스가 몇몇 추가적인 기능들을 정의한다고 [언급했습니다](./ComponentsAndProps.md). 로컬 스테이트는 정확하게 오직 클래스에서 이용할 수 있는 기능들입니다.

## 함수를 클래스로 변환하는 방법.

당신은 다섯 단계로 `Clock`과 같은 함수 컴포넌트를 클래스로 변환할 수 있습니다.
1. React.Compnent가 확장된(extends) 같은 이름의 [ES6 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)를 생성하세요. 
2. `render()`를 호출할 빈 메서드를 추가하세요.
3. `render()`메서드 안의 함수의 내용을 옮기세요.
4. `render()`의 내용에서 `this.props`를 `props`로 대체하세요.
5. 이미 사용했었던 빈 함수는 삭제하세요.

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[CodePen에서 시도하세요!](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock`은 지금 function에서 클래스로 정의되어있습니다.

이것은 local state와 lifecycle hook 같은 추가적인 기능들을 사용합니다.

## Local State를 Class에 추가하기

우리는 세 단계에서 props를 state로 `date`를 옮길것입니다.

1. `render()` 메서드에서 this.props.date를 this.state.date로 대체합니다.
```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. 초기화 된 this.state를 할당할 [class constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Constructor)를 추가합니다.
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Base constructor에 props를 통과시키는 것을 유의하십시오.
```javascript
constructor(props) {
  super(props);
  this.state = {date: new Date()};
}
```

클래스 컴포넌트들은 항상 props를 가지고 있는 base constructor를 호출할 수 있습니다.

3. `<Clock />` 엘리먼트로 부터 `date` prop을 제거하세요.
```javascript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
우리는 이후에 timer code를 컴포넌트에 다시 추가할 것입니다.

그 결과는 이것 처럼 보일겁니다:

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[CodePen에서 실행하세요!](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

다음으로 우리는 `Clock` 컴포넌트에 타이머를 추가하고 매초마다 업데이트 시킬 것입니다.

## Lifecycle 메서드를 클래스에 추가하기

많은 컴포넌트를 가지고 있는 어플리케이션에서 컴포넌트가 detroyed 되었을 때 컴포넌트가 가지고 있던 자원을 놓아주는 것은 매우 중요합니다. 

언제나 `Clock`이 처음 DOM을 렌더할 때 [타이머를 설치](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)하는 것을 원합니다. 이것을 React에서 "mounting"이라고 부릅니다.

우리는 `Clock`이 제거되어졌을 때 만들어졌던 DOM이 언제든 타이머를 없에 주길 원합니다. 이것을 React에서 "unmounting"이라고 부릅니다.

우리는 컴포넌트가 mount, unmount 되었을 때 몇몇 코드를 실행할 컴포넌트 클래스에서 특별한 메서드를 선언할 수 있습니다.

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

이 메소드들을 "lifecycle hook"이라고 부릅니다.

`componentDidMount()` hook은 component output이 DOM에 렌더 된 후 실행합니다. 타이머를 설치하기에 좋은 장소입니다.

```javascript
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```

타이머 ID를 어떻게 저장하는지 유의하세요!

`this.props`가 리액트에 의해 셋업되고 `this.state`가 특별한 의미를 가지는 동안 수동으로 당신이 시각적으로 사용되지 않는 어떤 것을 저장하길 필요하다면 클래스에 필드를 추가할 수 있습니다.

만약 `render()`안에 어떤 것을 사용하지 않는다면 state안에 있을 필요가 없습니다. 

우리는 componentWillUnmount() 라이프 사이클 훅에서 타이머를 없엘것입니다.
```javascript
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

마침내 우리는 `Clock` 컴포넌트에서 매초 동작 할 `tick()`메서드를 개선할 겁니다.

`this.setState()`를 사용하여 컴포넌트 로컬 스테이트를 업데이트 할 것입니다.
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[CodePen에서 실행하세요!](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

지금 매초마다 시계는 돌아가고 있습니다.

빠르게 메소드가 호출되는 순서를 요약해봅시다.

1. `<Clock />`이 `ReactDOM.render()`를 통과할 때 리액트는 Clock 컴포넌트의 constructor를 호출합니다. `Clock`이 현재 시간을 보여줘야하기 때문에 현재시간을 포함한 객체와 함께 `this.state`를 초기화 합니다.

2. React는 `Clock` component의 `render()` 메서드를 호출합니다. 이것은 리액트가 스크린에 무엇을 보여줘야 하는지 알게 되는 방법입니다. 리액트는 `Clock`의 렌더한 output을 일치시키기 위해서 DOM을 업데이트 합니다.

3. `Clock` output이 DOM에 삽입되어졌을 떄 리액트는 componentDidMount() 라이프 사이클 훅을 호출합니다. 그 안에는 `Clock` 컴포넌트가 매초마다 `tick()`메서드를 호출할 timer를 셋업하라고 브라우저에게 호출합니다.

4. 매초마다 브라우저는 `tick()`메서드를 호출합니다. 그 안에서 `Clock` 컴포넌트는 현재 시간을 포함한 객체를 가진 `setState()`를 호출함으로써 UI를 업데이트 합니다. `setState()`호출 덕분에 리액트는 state가 변했다는 것을 알 수 있고 스크린에 있어야 할 것을 알아 다시 render 메서드를 호출합니다. `render()`안에서 `this.state.date`는 변하게 될 시간입니다 그리고 render output은 업데이트 된 시간을 포함할 것 입니다. 리액트는 이에 따라 DOM을 업데이트 합니다.

5. `Clock` 컴포넌트가 DOM에서 제거된다면 리액트는 componentWillUnmount() 라이프 사이클 훅을 호출합니다. 그리고 타이머는 멈춰집니다.

## 정확하게 state를 사용하는 방법

`setState()`에 대해 알아야할 3가지가 있습니다.

### State를 직접적으로 수정하지 말것.

예를들어 이것은 re-render하지 않을 것입니다.:
```javascript
this.state.comment = 'hello';
```

대신에 setState()를 사용합니다.
```javascript
this.setState({comment: 'Hello'});
```

`this.state`를 지정할 수 있는 유일한 장소는 constructor입니다.

### state는 비동기적으로 update합니다.

리액트는 여러 `setState()`의 호출을 퍼포먼스를 위해 한번 업데이트 할 수 있습니다.

왜냐하면 `this.props`와 `this.state`는 비동기적으로 업데이트가 될 수 있기 때문에 당신은 다음 state의 계산된 값을 의존하면 안됩니다.

예를들어 이 코드는 카운터를 업데이트 하는 것을 실패할 수 있습니다.
```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment
});
```

이것을 고치기 위해 객체가 아닌 함수를 받아들이는 `setState()`의 두번째 폼을 사용합니다. 이 함수는 첫번째 argument로써 이전 스테이트를 받아들입니다. 그리고 update 될 때 두번째 argument로써 props를 받아들입니다.
```javascript
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

우리는 위에서 [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)을 사용했습니다. 이것은 일반적인 함수에서도 사용됩니다.
```javascript
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

### State가 업데이트 될 때 병합됩니다.

우리가 `setState()`를 호출했을 때 리액트는 그 객체를 현재 스데이트에서 제공하는 객체를 병합합니다.

예를들어 당신의 state는 몇몇 독립적인 변수들을 포함합니다.
```javascript
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  }
}
```

그때 당신은 그것들을 독립적으로 setState()를 호출하여 개별적으로 업데이트 할 수 있습니다.
```javascript
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

이 병합들은 얕습니다. `this.setState ({comments})`는 `this.state.posts`는 그대로 두지만 `this.state.comments`를 완전히 대체합니다.

## 데이터 흐름이 아래로 흐릅니다.

부모와 자식컴포넌트 둘다 특정 컴포넌트가 stateful 또는 stateless인지 알 수 없고 함수 또는 클래스로 정의 되었는지 신경 써서는 안됩니다.