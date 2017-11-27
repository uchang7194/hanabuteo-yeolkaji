# 이벤트 다루기

리액트 엘리먼트에서 이벤트를 다루는 것은 DOM 엘리먼트에서 이벤트를 다루는 것 보다 매우 간단합니다.

몇몇 문장 구조가 다릅니다.
- 리액트는 lowercase 말고 camelCase로 네이밍되어 있습니다.
- 문자열말고 이벤트 핸들러로써 JSX로 함수를 사용할 수 있습니다.

html을 예를 들어: 
```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

리액트에서는 약간 다릅니다:
```html
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

다른점은 React에서 기존 동작을 막기 위해 `false`를 리턴할 수 없는 것입니다. 당신은 명확하게 `preventDefault`를 호출해야만 합니다. 예를 들어 새로운 페이지를 여는 행동을 하는 기본 링크 동작을 막기 위해서 평범한 HTML에서는 이렇게 사용합니다.
```html
<a href="#" onclick="console.log('The link was clicked.); return false">
  Click me
</a>
``` 

리액트에서는 이렇게 사용합니다.
```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked');
  }
  
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

여기 `e`는 인조 event입니다. 리액트는 이 [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/)을 따르는 인조 events들을 정의합니다. 그리고 당신은 크로스 브라우저 호환성에 대해 걱정할 필요가 없습니다. 레퍼런스 가이드에서 [SyntheticEvent](https://reactjs.org/docs/events.html)에 대해 볼 수 있습니다.

리액트를 사용할 때는 당신은 일반적으로 DOM 엘리먼트에 listener를 추가하기 위해 `addEventListener`를 호출할 필요가 없습니다. 대신에 단지 처음에 엘리먼트가 렌더되어질 때 리스너를 제공합니다.

당신이 [ES6 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)를 사용하는 컴포넌트를 정의 할 때 일반적인 패턴은 클래스에서 메소드가 되는 이벤트 핸들러가 있습니다. 예를들어 Toggle 컴포넌트가 "ON", "OFF" 상태를 토글하는 버튼을 렌더합니다.

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => (
      {isToggleOn: !prevState.isToggleOn}
    ));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[CodePen에서 시도하세요!](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

당신은 JSX 콜백에서 `this`의 의미에 대해 조심해야합니다. 자바스크립트에서 클래스 메서드들은 기본적으로 [bound](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 되어있지 안습니다. 만약 `this.handleClick`을 바인드 하는 것을 잃어버리거나 `onClick`에 그것을 사용한다면 `this`는 함수를 항상 호출할 떄 마다 `undefined`가 될 것입니다.

[Javascript에서 function들이 작동하는 방법](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)의 한부분으로 이것은 리액트에서 꼭 사용해야할 행동은 아닙니다. 일반적으로 만약 () 없이 `onClick={this.handleClick}` 같이 메서드를 사용한다면 당신은 메서드를 바인드 해야합니다. 

만약 너를 화나게 하는 `bind`를 호출해야 한다면 이것을 사용하는 두가지 방법이 있습니다. 만약 [public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/)를 사용한다면 당신은 콜백을 바인딩할 class fields를 사용할 수 있습니다.
```javascript
class LoggingButton extends React.Component {
  // 'this'를 보장하는 이 syntax는 handleClicka없이 바인드 합니다.
  //  경고: 이것은 experimental syntax입니다.
  handleClick = () => {
    console.log('this is', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
``` 

이 syntax는 [Create React App](https://github.com/facebookincubator/create-react-app)에서 기본적으로 사용가능합니다.

만약 class fields syntax를 사용하지 않는다면 당신은 callback에 [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)을 사용할 수 있습니다.
```javascript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this.is:', this);
  }

  render() {
    // 'this'를 보장하는 이 syntax는 handleClick 없이 바운드 합니다.
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

이 syntax의 문제는 `LoggingButton`이 렌더할 때마다 다른 콜백이 된다는 것입니다. 대부분의 케이스는 괜찮습니다. 하지만 이 콜백이 자식 component의 prop으로 보내진다면 이 컴포넌트들은 다시 렌더링 할지도 모릅니다. 우리는 이 퍼포먼스 문제를 피하기 위해서 일반적으로 constructor에 바인딩하고 class fields syntax를 사용하는 것을 추천합니다.

### 이벤트 핸들러에 실인자를 보내는 방법.

루프 안에서 이벤트 핸들러에 파라미터를 주기를 원합니다. 예를들어 `id`가 그 행의 ID라면 다음중 하나가 작동됩니다.
```javascript
<button onClick={(e) => this.deleteRow(id, e)}>
  Delete Row
</button>
<button onClick={(e) => this.deleteRow.bind(this, id)}>
  Delete Row
</button>
```
위의 두 라인들은 동일합니다. 그리고 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)를 사용하고 [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)를 사용합니다.

둘다 리액트 이벤트를 대표하는 `e` 실인자는 ID 이후 두번째 실인자로써 받아집니다. arrow function으로 우리는 명확하게 `e`를 받고 `bind`에서 더 많은 실인자들은 자동적으로 `e` 앞으로 와집니다.