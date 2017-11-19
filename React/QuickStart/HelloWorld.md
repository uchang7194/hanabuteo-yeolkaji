# Hello World

리액트를 시작하는 가장 쉬운 방법은 [CodePen의 Hello Wrold 예제 코드](https://codepen.io/pen?&editors=0010)를 사용해보는 것입니다. 어느 것도 설치할 필요가 없습니다. 단지 CodePen을 열고 우리하 진행하는 예제를 따라하면 됩니다. 로컬 개발환경을 사용한다면 [Installation](./Install.md) 페이지를 확인하세요.

가장 기본적인 리액트 예제입니다:
```
ReactDOM.render(
  <h1>Hello, World</h1>,
  document.getElementById('root')
)
```

페이지에서 헤더가 "Hello, Wrold"를 렌더하는 것을 볼 수 있습니다.

다음 섹션들에서 점점 리액트를 사용하는 것에 대해 소개할 것입니다. 우리는 React앱이 어떻게 동작하는지에 대해 설명할 것입니다. (elements와 components). 그것들을 마스터했을 때 당신은 재사용가능한 부분들로 복잡한 앱을 만들 수 있습니다.

## A Note on Javascript
리액트는 자바스크립트 라이브러리입니다. 그리고 자바스크립트 언어를 기본적으로 이해하고 있다고 가정합니다. 만약 확인이 들지 않는다면 자바스크립트 지식을 더 공부하는 것을 추천합니다. 그러면 더욱 쉽게 따라할 수 있을 것입니다.

우리는 이 예제에서 몇몇 ES6 문법을 사용합니다. 비교적 새로운 기능이기 때문에 사용하지 않으려고 하지만 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [template iterals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) 같이 친숙한 문법들은 사용하도록 권장합니다. 그리고 ES6 코드를 컴파일하는 것으로 [Babel REPL](https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6ByA)을 사용할 수 있습니다.