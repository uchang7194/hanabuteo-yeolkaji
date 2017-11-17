# Installation
> React는 유연하고 다양한 프로젝트에서 사용할 수 있습니다. 당신은 리액트로 새로운 앱을 만들 수 있고 기존의 코드베이스에 점진적으로 추가해서 사용할 수 있습니다.

### 시작하기 위한 몇가지 방법들이 있습니다.
1. 당신이 리액트를 가지고 노는데 흥미가 있다면 CodePen을 사용할 수 있습니다. CodePen의 [Hello World](https://codepen.io/gaearon/pen/rrpgNB?editors=0010) 예제 코드를 가지고 시작할 수 있습니다. 그리고 당신은 아무것도 설치할 필요 없이 코드를 수정하고 그것이 어떻게 작동되는지 볼 수 있습니다. 
만약 당신이 사용하는 텍스트 에디터를 사용하길 원한다면 이 [HTML file](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)을 다운로드해서 당신의 브라우저에서 그 파일을 열고 편집할 수 있습니다. 그러나 파일 변환이 느리므로 프로덕션에서는 사용하지 말아주십시오.
full application을 위해 사용하길 원한다면 리액트를 시작하기 위한 대중적인 2가지 방법이 있습니다. Create React App을 사용하는 것 또는 기존 프로젝트에 리액트를 추가하는 방법이 있습니다.

### 새로운 Application을 생성하는 방법.
[Create React App](https://github.com/facebookincubator/create-react-app)은 새로운 리액트 SPA를 구축하기위한 최고의 방법입니다. Create React App은 최신 자바스크립트 기능을 사용하고 나이스한 개발자 경험을 제공하며 production을 위해 당신의 앱을 최적하하는 개발환경을 설치합니다.당신은 Node.js 6버전 이상의 환경이 필요할 것입니다.
```
npm install -g create-react-app

create-react-app my-app // create-react-app이 설치가 된 후

cd my-app
npm start
```

만약 npm 5.2.0이상에서 설치를 한다면 당신은 npx를 대신 사용할 수 있습니다.
```
npx create-react-app my-app

cd my-app
npm start
```

Create React App은 백엔드 로직이나 데이터베이스를 다루지 못합니다. 단지 프론트엔드 빌드 파이프라인을 생성하고 당신이 원하는 백엔드와 함께 사용할 수 있습니다. 프론트엔드 빌드 파이프라인은 webpack과 Babel같은 빌드 툴을 사용합니다. 하지만 환경설정은 되어있지 않습니다. 
당신이 production을 배포할 준비가 되었을 때 `npm run build`를 작동시키는 것은 `build` 폴더 안에 최적화되어 만들어진 당신의 App을 생성하는 것입니다. 당신은 [README](https://github.com/facebookincubator/create-react-app#create-react-app-)와 [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents)으로 Create React App에 대해 더 배울 수 있습니다.

### 작업중인 Application에 React를 추가하는 방법.
당신은 React를 사용하기위해 App을 다시 설정할 필요가 없습니다.

우리는 당신의 Application에 개별적인 위젯같이 작은 부분으로 리액트를 추가하는 것을 추천합니다. 그리고 당신의 use case에서 잘 동작하는지 볼 수 있습니다.

Build pipeline없이 리액트를 [사용할 수 있지만](https://reactjs.org/docs/react-without-es6.html) 우리는 Build pipeline을 사용하여 더욱 생산적인 prodution을 구축하는 것을 추천합니다. Modern build pipeline은 다음과 같이 구성됩니다.

- [Yarn](https://yarnpkg.com/lang/en/) 또는 [npm](https://www.npmjs.com/) 같은 Package Manager는 방대한 생태계의 서드 파티(third-party)를 당신에게 경험할 수 있게 하고 그것들을 더 쉽게 설치하고 업데이트 할 수 있습니다.
- [webpack](https://webpack.js.org/)과 [Browerify](http://browserify.org/) 같은 bundler는 모듈화된 코드를 사용하게 하고 최적화된 로딩 시간을 위해 작은 패키지들로 함께 묶어줍니다.
- [Babel](http://babeljs.io/)같은 Compiler는 older browser에서 작동하는 모던 자바스크립트 코드를 사용할 수 있게 해줍니다.

#### Installing React
> Note: 프로덕션 환경에서 React의 빠른 버전을 사용하도록 프로덕션 빌드 프로세스를 설정하는 것이 좋습니다.

우리는 front-end dependencies를 관리하기 위해 [Yarn](https://yarnpkg.com/lang/en/) 또는 [npm](https://www.npmjs.com/)을 사용하는 것을 추천합니다. 만약 패키지 매니저가 처음이라면 [Yarn documentation](https://yarnpkg.com/en/docs/getting-started)이 시작하기에 좋습니다. 

Yarn으로 react를 설치하고 작동하는 방법.
```
yarn init
yarn add react react-dom
```

npm으로 React를 설치하고 작동하는 방법.
```
npm init
npm install --save react react-dom
```

Yarn과 npm 둘다 [npm registry](https://www.npmjs.com/)에서 패키지를 다운받습니다.

### ES6와 JSX를 사용하는 방법

우리는 당신의 자바스크립트 코드에서 ES6와 JSX를 사용하기 위해서 바벨을 사용하길 추천합니다. ES6는 개발을 더 쉽게 만들어주는 모던 자바스크립트 기능들의 집합입니다. 그리고 JSX는 React를 더 나이스하게 작동시키도록 자바스크립트 언어를 확장한 것입니다.

[바벨 설치 설명서](https://babeljs.io/docs/setup/)는 많은 다른 개발환경에서 바벨을 환경설정 하는 방법을 설명합니다. 그리고 babel-preset-react와 babel-preset-env의 설치와 [.babelrc 환경설정](http://babeljs.io/docs/usage/babelrc/)을 확실히 해야합니다.

### ES6와 JSX를가지고 Hello world를 만들어보기.

우리는 [webpack](https://webpack.js.org/)또는 [Browerify](http://browserify.org/) 같은 bundler를 사용하는 것을 추천합니다. 그리고 모듈화된 코드를 사용하게 하고 최적화된 로딩 시간을 위해 작은 패키지들로 함께 묶어줍니다.

간단한 리액트 예제입니다:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
```
이 코드는 `root` id를 가지고 있는 DOM element를 렌더합니다. 그리고 HTML file에 `root` id를 가지고 있는 div태그가 필요합니다.


다른 자바 스크립트 UI 라이브러리로 작성된 기존 앱 내부에 간단하게 DOM element안에서 React compoenent를 렌더할 수 있습니다.
[이미 작성된 코드에서 통합된 React에 대해 더 배울 수 있습니다.](https://reactjs.org/docs/integrating-with-other-libraries.html#integrating-with-other-view-libraries)

### 개발과 제품의 버전

기본적으로 React는 많은 도움을 줄 수 있는 경고를 포함합니다. 이 경고들은 개발에서 매우 유용합니다.

그러나 경고들은 React의 개발 버전을 더 크고 느리게 만들었기 때문에 앱을 배포할 때 production 버전을 사용해야 합니다.

당신의 웹사이트가 올바른 React 버전을 제공하는지 확인하는 방법과 어떻게 프로덕션 빌드 프로세스를 가장 효율적으로 구성하는지 배우세요.

- Create React App으로 Production Build 만들기
- Single-File Builds로 Production Build 만들기
- Brunch로 Production Build 만들기
- Browserify로 Production Build 만들기
- Rollup으로 Production Build 만들기
- webpack으로 Production Build 만들기

### CDM을 사용하는 방법

만약 Package Manager를 사용하고 싶지 않다면 react와 react-dom npm 패키지들은 CDN에 호스팅된 umd folder들에서 single-file 배포판을 제공합니다. 
```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```
이 버전은 단지 개발용으로만 사용이 되고 production에 알맞지 않습니다. 최소화되고 최적화된 React production 버전은 사용가능합니다.
```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
``` 

특정한 react와 react-dom 버전을 로드하기 위해서는 version number를 16으로 대체하세요.
만약 Bower를 사용한다면 react package를 통해 react를 사용할 수 있습니다.


#### 왜 crossorigin 속성을 사용하나요?

당신이 CDN으로 React를 제공한다면 우리는 [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) 속성을 설정하는 것을 추천합니다.
```html
<script crossorigin src="..."></script>
```

또한 사용중인 CDN이 HTTP 헤더에 `Access-Control-Allow-Origin: *`을 설정하는지 확인하는 것이 좋습니다.
이것은 React 16 이후의 더 나은 오류 처리 경험을 가능하게합니다.
