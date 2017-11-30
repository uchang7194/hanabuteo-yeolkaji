## 페이스북 로그인 & 로그아웃 연동
1. [Facebook Developer](https://developers.facebook.com/)에서 앱 등록
2. 등록 후 대시보드에 들어가서 Facebook 로그인 -> 빠른시작 
  - 사이트 URL 설정
  - SDK 설정(React에서 사용할 때는 로그인을 사용할 영역의 ComponentDidMount함수에 적용함.)
  ```javascript
    ComponentDidMount = () => {
      
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '{your-app-id}',
          cookie     : true,
          xfbml      : true,
          version    : '{latest-api-version}'
        });
          
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  ```
3. login
  ```javascript
    // this._handleCheckLoginStatus(); 콜백 함수
    window.FB.login(this._handleCheckLoginStatus())

    _handleCheckLoginStatus = (response) => {
      window.FB.getLoginStatus((response) => {
        this._handleFacebookStatusChange(response);
      });
    }
    _handleFacebookStatusChange = (response) => {
      let user_info = {};
      if( !this.state.is_logged_in && response.status === 'connected' ) {
        window.FB.api('/me', {fields: 'email, name, picture'}, (response) => {
          // 페이스북 유저정보를 받아옴.
        });
      } else if( response.status === 'not_authorized' ) {
        console.log('not_authorized');
      } else {
        console.log('not connected');

      }
    }
  ```
4. logout
  ```javascript
    window.FB.logout((response) => {
      console.log('logout: ', response);
    }
  ```
