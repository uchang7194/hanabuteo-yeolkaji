# Components와 Props

컴포넌츠는 독립적으로 UI를 나누고 재사용하고 각 부분을 개별적으로 생각할 수 있습니다.

개념적으로 컴포넌츠는 자바스크립트 함수와 같습니다. 컴포넌츠는 임의의 inputs(props)를 받아들이고 스크린에 나타내기 위한 React Elements를 반환합니다.

## 함수 및 클래스 Components

컴포넌트를 정의하는 가장 간단한 방법은 자바스크립트 함수로 쓰는 것입니다:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

이 함수는 리액트 컴포넌트에 유효합니다. 왜냐하면 이것은 하나의 `props(속성을 나타냅니다.)` Object arguments와 데이터를 받고 리액트 엘리먼트를 반환합니다.
우리는 이 컴포넌츠를 `functional`이라 부릅니다. 왜냐하면 말 그대로 자바스크립트 함수이기 때문입니다.

ES6 클래스로 컴포넌트를 정의하여 사용할 수 있습니다:
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
위의 두 컴포넌츠는 리액트의 관점에서 동일합니다.

클래스는 몇몇 추가적인 기능들을 가지고 있습니다. 그것은 [다음 섹션]()에서 다루어 볼 것 입니다. 그 때까지 우리는 간결함을 가진 functional 컴포넌트를 사용할 것입니다.

## 컴포넌트를 렌더링하는 방법

이전에 우리는 DOM 태그를 가진 리액트 엘리먼트를 사용했습니다.:
```javascript
const element = <div />;
```

그러나 엘리먼트는 유저와 정의한 컴포넌트를 사용할 수 있습니다.: 
```javascript
const element = <Welcome name="Sara" />;
```
리액트가 유저가 정의한 컴포넌트를 사용한 것을 알았을 때 리액트는 하나의 객체로써 이 컴포넌트를 JSX속성으로 전달합니다. 우리는 이 객체를 `props`라고 부릅니다.

예를 들어 이 코드는 "Hello, Sara"라는 문장을 렌더합니다.: 
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[CodePen에서 시도해보세요.](https://codepen.io/pen?&editors=0010)

이 예제를 요약해보자면:
  1. `<Welcome name="Sara" />`를 가지고 있는 `ReactDOM.render()`를 호출합니다.
  2. 리액트는 props로써 `{name: 'Sara'}`를 가지고 있는 `Welcome`을 호출합니다.
  3. `Welcome` 컴포넌트는 결과로써 `<h1>Hello, Sara</h1>` 엘리먼트를 반환합니다.
  4. React DOM은 효과적으로 `<h1>Hello, Sara</h1>`와 매치되는 DOM을 업데이트 합니다.

> 경고: 항상 컴포는트의 이름은 대문자로 시작해야 합니다. 예를들어 `<div />`는 돔 태그를 말하는 거지만 `<Welcome />`은 하나의 컴포넌트를 말하고 `<Welcome />`은 범위안에 있어야 합니다.


## 컴포넌트를 작성하는 방법

컴포넌트는 그들의 output에서 다른 컴포넌트를 인용할 수 있습니다. 이것은 모든 세부적인 레벨에서 추상화한 컴포넌트를 사용할 수 있습니다. button, form, dialog, screen에서: 리액트 앱에서 이 모든것들은 일반적으로 컴포넌트로 표현되어집니다.

예를들어 우리는 몇번이고 `Welcome`을 렌더 할 수 있습니다:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Uchang" />
    </div>
  );
}

ReactDom.render(
  <App />,
  document.getElementById('root')
)
```

[CodePen에서 시도하세요!](https://codepen.io/pen?&editors=0010)

일반적으로 새로운 리액트앱은 최상위에 하나의 App 컴포넌트를 가집니다. 그러나 만약 작업중인 app에서 리액트를 추가한다면 당신은 `Button`같은 작은 컴포넌트로 bottom-up을 시작하고 점차적으로 뷰 계층의 상위로 작업을 해야할지 모릅니다.


## 컴포넌트를 추출하는 방법

더 작은 컴포넌트로 컴포넌트를 나누는 것을 두려워하지 마세요.

예를 들어 이 컴포넌트를 생각해봅시다:
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar" 
          src={props.author.avatarUrl}
          alt={props.author.name}
        /> 
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-data">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[CodePen에서 시도하세요!](https://codepen.io/pen?&editors=0010)

이것은 props로 `author`(객체), `text`(문자열), 그리고 `date`(데이트 객체) 그리고 소셜 미디어 웹사이트의 코멘트를 묘사합니다.

이 컴포넌트는 충첩된 것들 때문에 변경하기 까다로울 수 있습니다 그리고 이것은 개별적인 부분들로 재사용하기 어렵습니다. 이 컴포넌트에서 몇몇 컴포넌트를 추출해보겠습니다.

첫번째로 우리는 Avartar를 추출할 것입니다.:

```javascript
  function Avatar(props) {
    return (
      <img className="Avatar" 
        src={props.user.avatarUrl}
        alt={props.user.name}
      />
    );
  }
```

`Avatar`는 Comment안에 렌더가 되고 있는 것을 알 필요가 없습니다. 이것에 prop을 `user` 말고 `author`를 사용한 이유입니다. 

우리는 컴포넌트 자신의 관점으로 prop의 이름을 지정하는 것 보다 그것을 사용하는 컨텍스트로 부터 prop의 이름을 짓는 것을 추천합니다.

이제 `Comment`를 단순화 할 수 있습니다.
```javascript
  function Comment(props) {
    return (
      <div className="Comment">
        <div className="UserInfo">
          <Avatar user={props.author} />
          <div className="UserInfo-name">
            {props.author.name}
          </div>
        </div>
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
  }
```

다음으로 우리는 `Avartar`를 포함한 `UserInfo` 컴포넌트를 추출 할 것입니다.
```javascript
  function UserInfo(props) {
    return (
      <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">
          {props.user.name}
        </div>
      </div>
    );
  }
```

이것은 `Comment`를 훨씬 더 단순화 할 수 있습니다.
```javascript
  function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
  }
```

[CodePen에서 시도하세요!](https://codepen.io/pen?&editors=0010)


컬포넌트를 추출하는 것은 쓸데없는 일 처럼 보일지도 모르지만 재사용할 컴포넌트를 가지고 있으면 더 큰 비용이 발생합니다. 좋은 경험은 (`Button`, `Panel`, `Avatar`) 같은 것을 몇번씩 사용하거나 (`App`, `FeedStory`, `Comment`)처럼 복잡한 UI를 사용한다면 재사용하는 컴포넌트는 좋은 대안입니다.

## Props는 읽기 전용입니다.

당신이 [함수 또는 클래스로써]() 컴포넌트르 선언하든지간에 절대 그 자신의 props는 수정할 수 없습니다. sum 함수를 생각해봅시다:

```javascript
function sum(a, b) {
  return a + b;
}
```

이러한 함수들을 [`"pure"`](https://en.wikipedia.org/wiki/Pure_function) 하다라고 부릅니다. 왜냐하면 그들은 그들의 inputs들을 변하게 하지않기 때문입니다. 그리고 항상 같은 inputs에 같은 결과를 반환합니다.

대조적으로 이 함수는 impure 합니다 왜냐하면 inputs을 바꿔버리기 때문입니다.:
```javascript
function withdraw(account, amount) {
  account.total -= amount;
}
```

리액트는 꽤나 유연하지만 하나의 엄격한 룰을 가지고 있습니다.
`모든 리액트 컴포넌트는 그들의 props와 관련해서 순수한 함수처럼 행동해야합니다.`

물론 App UI들은 다이나믹하고 매번 바뀝니다. 다음 섹션에서 우리는 state의 새로운 컨셉을 소개할 것입니다. 스테이트는 리액트 컴포넌트를 이 규칙을 위반하지 않고 그들의 유저의 액션, network response, 그 밖에 것들에 반응하는 output으로 매번 바꾸도록 허락합니다. 