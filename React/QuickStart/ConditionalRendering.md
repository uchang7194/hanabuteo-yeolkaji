# 조건부 렌더링

리액트에서 당신이 필요한 행동을 캡슐화 한 명확한 컴포넌트를 만들 수 있습니다. 그 때 당신은 application의 state에 의존하는 것들 몇몇을 렌더할 수 있습니다.

리액트에서 조건부 렌더링은 자바스크립트의 조건 작업과 같은 방법으로 동작합니다. [if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 또는 [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) 같은 javascript operator를 사용하여 현재 상태를 나타내는 엘리먼트를 만들기 위해 사용됩니다. 그리고 리액트의 UI를 업데이트하여 그것과 일치하게 하세요.(???)

이 두 컴포넌트를 생각해보세요:
```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

우리는 `Greeting` 한 유저가 로그인 한지 안한지에 의존하는 이 컴포넌트 어느쪽이든 보이게 할 컴포넌트를 만들 것입니다. 
```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[CodePen에서 시도하세요!](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

이 예제는 `isLoggedIn` prop의 값에 의존하는 다른 인삿말을 렌더합니다.

### 엘리먼트 변수들

당신은 엘리먼트들을 저장하기 위한 변수들을 사용할 수 있습니다. 이것은 당신을 나머지 output이 변하지 않는 동안 조건적으로 컴포넌트의 한 부분을 렌더하는 것을 돕습니다.

Logout과 Login을 알리는 새로운 두 버튼 컴포넌트를 생각해보세요.
```javascript
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

아래의 예제에서 우리는 `LoginControl`을 호출하는 [stateful component](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class)를 생성할 것입니다.

이것은 현재 state에 의존하는 `<LoginButton />` 또는 `<LogoutButton />`을 렌더할 것입니다. 또한 이전 예제로부터 `<Greeting />`을 렌더할 것입니다.

```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[CodePen에서 실행하세요!](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

변수를 선언하고 `if`문으로 컴포넌트를 조건부 렌더를 하는 동안 때때로 당신은 짧은 syntax를 사용하길 원할지 모릅니다. JSX로 인라인 조건을 위한 몇가지 방법이 있습니다. 아래 설명이 있습니다.

### 논리적 && 연산자를 가지는 inline If문

당신은 중괄호로 그것들을 감싸 JSX로 어느 표현식을 추가할지 모릅니다. 이것은 자바스크립트 논리적 `&&` 연산자를 포함합니다. 엘리먼트를 조건적으로 포함하는 것은 편리할 수 있습니다.

```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[CodePen에서 시도하세요!](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

항상 자바스크립트에서 `true && expression`은 표현식으로 평가하고 `false && expression`은 항상 `false`로 평가하기 때문에 작동합니다.

그러므로 `true` 상태라면 그 엘리먼트는 `&&` 후에 바로 output으로 나타날 것입니다. 만약 `false` 상태라면 리액트는 그것을 스킵하거나 거부할 것입니다.


### 조건적 연산자를 가지는 If-Else

엘리먼트를 조건적 렌더하는 다른 방법은 자바스크립트 조건 연산자인 [condition ? true : false](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)를 사용하는 것입니다.

아래 예제에서 우리는 작은 텍스트 블럭을 조건부 렌더하는 것에 그것을 사용합니다.
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

비록 어떤 일이 일어날지 불분명하지만 이것은 또한 더큰 표현식으로 사용될 수 있습니다.
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

단지 자바스크립트에서 처럼 이것은 당신 그리고 당신의 팀이 더욱 가독성이 좋다고 생각하는 것으로 베이스를 잡는 적절한 스타일을 선택하는 것은 당신에게 달려있습니다. 또한 상태가 너무 복잡하게 될 때는 언제나 컴포넌트를 추출 하는 것이 좋다는 것을 기억하세요.

### 렌더링으로 부터 컴포넌트를 예방하는 방법

특이한 경우에서 당신은 심지어 다른 컴포넌트에서 렌더되어지는 그 자신을 숨길 컴포넌트를 원할지도 모릅니다. 이것을 하기 위해 그것의 output을 렌더하는 대신 `null`을 반환합니다.

아래의 예제에서 `<WarningBanner />`는 `warn`을 호출하는 prop 값에 의존하여 렌더되어 집니다. 만약 그 값이 `false`라면 컴포넌트는 렌더되지 않습니다.

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[CodePen에서 실행하세요!](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

한 컴포넌트의 렌더 메서드로부터 `null`을 반환하는 것은 컴포넌트의 라이프사이클 메서드들의 실행에 영향을 미치지 않습니다. 대신에 `componentWillUpdate`와 `componentDidUpdate`는 아직까지 호출 될 것입니다.