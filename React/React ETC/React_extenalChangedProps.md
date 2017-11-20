# 외부에서 props를 변경 후 UI를 변경시키는 방법
- componentWillReceiveProps 메서드를 이용
```javascript
  componentWillReceiveProps: function(newProps) {
    this.setState({
      text: newProps.defaultValue
    });
  }
```
- 변경된 props를 받아 setState함수로 state를 변경해주면 reRendering이 일어남.

