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

