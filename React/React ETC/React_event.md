# [시작하세요! 리액트 프로그래밍] 책을 참고.
# 일반 DOM에서 Event 처리방식
1. inline에서 처리하는 방법 
  ```html
    <button type="button" id="btn" onclick="doStuff">
  ```
  - 동일한 버튼에 리스너를 2개 이상 추가하기 어려움

2. addEventListener
  ```html
    <div id="parent">
      <button type="button" id="ok">OK</button>
      <button type="button" id="cancle">Cancel</button>
    </div>
  ```
  ```javascript
    document.getElementById('btn').addEventListener('click', function(event) {
      var button = event.target;

      switch(button.id) {
        case 'ok':
          console.log('Ok');
          break;
        case 'cancel':
          console.log('Cancel');
          break;
        default:
          new Error('Unexpected button ID');
      };
    });
  ```
  - 단점
    1. 리스너 선언이 ui 컴포넌트와 떨어져 있기 떄문에 우너하는 코드를 찾고 디버그하기 어렵다.
      - 직접적으로 이벤트가 걸려있는게 아니기 때문에 부모 영역에서 자식 컴포넌트를 찾아야 해서 디버그하기 어렵다는 것
    2. 이와 같은 이벤트 선언을 하기 위해서는 똑같은 베이스 파트 코드를 만들어야 함.
    3. 브라우저간의 차이 때문에 코드가 더 길어져야 한다.
      - addEventListener와 attachEvent(IE6 ~ 10)가 필요.
      - var envent = event || window.event(IE)가 필요.

# 리액트에서의 이벤트 처리
  - 리액트는 브라우저 이벤트를 래핑하고 정규화하는 합성 이벤트(Synthetic event)를 사용하므로 브라우저 불일치 문제가 자연스럽게 해결된다.

  ```javascript
  _handleOkClick = () => {
    console.log('Ok');
  }
  _handleCancleClick = () => {
    console.log('Cancle');
  }
  const ok_btn = <button type="button" onClick={() => { _handleOkClick(); }} />;
  const cancle_btn = <button type="button" onClick={() => { _handleCancleClick(); }} />;
  ```
  - 리액트는 성능 개선을 위해 이벤트 위임을 사용한다.

