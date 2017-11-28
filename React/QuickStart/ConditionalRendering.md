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
