# [Javascript Pattern - oreilly] 책을 참고
# DOM과 브라우저 패턴

## 관심사의 분리
  - 단순히 HTML, CSS, Js 파일을 분리하는 것이 아닌 분리 하고도 각각의 역할에 충실 할 수 있는 것을 말한다.
1. CSS를 끈 상태에서 페이지를 테스트 할 때 사용가능하고 내용이 표시되며 읽을 수 있어야 한다.
2. 자바스크립트를 끈 상태에서 페이지를 테스트한다. 주 목적에 맞게 제대로 동작하고 모든링크가 작동하며 폼 또한 제대로 동작하고 전송할 수 있어야 한다.
3. 인라인 이벤트 핸들러 또는 인라인 style 속성은 `내용`에 속하지 않으므로 사용하지 않는다.
4. 시맨틱하고 의미에 맞는 HTML엘리먼트를 사용한다.

## 기능 탐지(Capability detection)
  - 브라우저의 차이점을 다루는 일반적인 기술.

```javascript
  // 안티패턴
  if( navigator.userAgent.indexOf('MSIE') !== -1 ) {
    document.attachEvent('onclick', console.log);
  }
  
  // 더 좋은 방법
  if( document.attatchEvent ) {
    document.attachEvent('onclick', console.log);
  }

  // 조금 더 정확한 방법
  if( typeof document.attachEvent !== 'undefined' ) {
    document.attachEvent('onclick', console.log)
  }
```

## DOM 접근
  - 돔의 접근을 최소화 해야 한다.( 비용이 많이드는 작업이기 떄문 )
1. 루프 내에서 DOM 접근을 피한다.
2. DOM 참조를 지역변수에 할당하여 사용한다.
3. 가능하면 셀렉터 API를 사용한다.
4. HTML 콜렉션을 순회할 때 length를 캐시하여 사용한다.

## DOM 조작
  - 브라우저가 DOM을 렌더링하는 작업도 비용이 많이드는 작업이다. 
1. 변경되는 트리의 최소화
2. 변경점을 한번만 처리하도록 하는 것이 좋다.(document.createDocumentFragment 사용)