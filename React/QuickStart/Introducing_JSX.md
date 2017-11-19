# Introducing JSX

이 변수선언을 생각해봅시다:
```javascript
const element = <h1>Hello, World</h1>;
```
이 재밌는 태그 문법은 HTML, string형식 둘다 아닙니다.

이것은 JSX라고 불립니다. JSX는 자바스크립트의 문법을 확장한것입니다. 우리는 UI를 구현하기 위해 리액트에서 JSX를 사용하는 것을 추천합니다. JSX는 당신에게 template 언어를 상기시킬지도 모르지만 Template문법과는 달리 자바스크립트의 모든 기능을 사용할 수 있습니다. 

JSX는 리액트 "element"를 생산합니다. 우리는 [다음 섹션]에 DOM에서 JSX가 렌더링하는 것을 알아볼 것입니다. 이하 당신은 시작하기 위해 필요한 JSX기초를 알 수 있습니다.

## JSX에서 표현식 추가하기

당신은 JSX에서 어느 자바스크립트 표현식을 중괄호로 묶어 추가할 수 있습니다.
예를 들어 `2 + 2`, `user.firstName`그리고 `formatName(user)`는 모두 유효한 표현식입니다.
```javascript
function formatName(name) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
}

const element = (
  <h1>
    Hello, {formatName(user)}
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root');
);
```

[CopePen에서 시도해보세요.](https://codepen.io/pen?&editors=0010)

우리는 가동성을 위해 여러 라인으로 JSX를 나누었습니다. 이것이 필수적인 것은 아니지만 우리는 자동 새미콜론 삽입의 함정을 피하기 위해 괄호 안에 이것을 wrapping하는 것을 추천합니다.

## JSX는 표현식이기도 합니다.

편집 후에 JSX 표현식은 정규 자바스크립트 객체가 되었습니다.

이것은 if, for loops, 변수 할당, 실인자로써 그것을 받는 것, 그리고 함수에서 JSX를 반환하는데에서 JSX를 사용할 수 있다는 의미입니다.

```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
``` 

## JSX로 속성 지정하기

당신은 속성으로 문자열 리터럴을 명시하기 위해 quotes를 사용할지도 모릅니다.
```javascript
const element = <div tabIndex="0"></div>;
```

당신은 또한 속성안에 자바스크립트 표현식을 넣기 위해 중괄호를 사용할지도 모릅니다.
```javascript
const element = <img src={user.avatarUrl}></img>;
```

속성 안에 자바스크립트를 추가할 때 중괄호 주위에 quotes를 넣지마세요. 중괄호와 quotes를 둘다 사용할 수 있지만 같은 속성안에서 사용할 수 없습니다.

> Warning: JSX가 HTML보다 자바스크립트를 가까이 한 이래로 React DOM은 HTML 속성이름 대신에 네이밍 컨벤션에서 camelCase 속성을 사용합니다. 예를 들어 class는 JSX에서 className이 되고 tabindex는 tabIndex가 됩니다.

## JSX로 자식을 지정하기

만약 태그가 비어있다면 당신은 XML 처럼 즉시 `/>`로 그것을 닫아줘야 합니다.

```javascript
const element = <img src={user.avatarUrl} />;
```

JSX 태그들은 자식들을 포함합니다.

```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## Javascript는 Injection Attacks를 예방합니다.

JSX에서 user input을 추가하는 것은 안전합니다.
```javascript
const title = response.potentiallyMaliciousInput;
// Tis is safe:
const element = <h1>{title}</h1>;
```
기본적으로 React DOM은 그것들이 render 되기 전 JSX에서 추가된 어느 값이든 [이스케이프](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) 처리합니다. 그러므로 이것은 당신의 App에서 명시적으로 쓰여진 것들을 절대 주입할 수 없습니다. 모든 것들은 렌더되기 전 문자열로 변환됩니다. 이것은 [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) 공격을 예방하는 것을 돕습니다.

## JSX는 객체를 대표합니다.

Babel은 JSX를 React.createElement() 호출로 컴파일합니다.

같은 두 예제가 있습니다:
```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
```javascript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElement()는 버그가 없는 코드를 쓰기위해 몇가지 확인을 수행하지만 필수적으로 그것은 이와 같은 객체를 생성합니다.
```javascript
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
이 객체들을 "React elements"라고 부릅니다. 당신은 당신이 스크린에서 보길 원하는 것들의 묘사들로서 그것들을 생각할 수 있습니다. React는 이 객체들을 읽고 그것들을 DOM에 구축하기 위해 사용하며 최신상태로 업데이트 합니다.

우리는 다음 섹션에서 DOM에서 React element들을 렌더링하는 것을 알아볼 것입니다.

> Tip: 
ES6 및 JSX 코드가 모두 올바르게 표시되도록 선택한 편집기에 ["Babel"언어 정의](http://babeljs.io/docs/editors)를 사용하는 것이 좋습니다. 이 웹 사이트는 호환 가능한 [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) 색 구성표를 사용합니다.