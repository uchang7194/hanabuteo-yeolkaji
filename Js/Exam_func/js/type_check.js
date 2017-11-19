(function(global){
  'use strict';


  var check_type_box = null, check_type_input = null;

  function init() {
    check_type_box = document.querySelector('.check-type-box');
    check_type_input = document.querySelector('#check-type-input');

    console.log(check_type_input);
    bind();
  }

  function bind() {
    check_type_input.addEventListener('blur', setBackgroundEffect.bind(null, 'inactive'));
    check_type_input.addEventListener('focus', setBackgroundEffect.bind(null, 'active'));
  }

  function setBackgroundEffect(type) {
    var class_name = check_type_box.getAttribute('class');
    var new_class_name = '';

    if( type === 'active') {
      new_class_name = 'check-type-box ' + type;
    } else {
      new_class_name = 'check-type-box ' + type;
    }
    check_type_box.setAttribute('class', new_class_name);
  }

  init();

}(window));