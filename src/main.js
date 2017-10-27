// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */
import Vue from 'vue'
const VueTouch = require('vue-touch')
const VueWild = require('vuewild');

// vue-component
import App from './App';

//  --             --
//  -- vue-setting --
//  --             --
Vue.config.productionTip = false;

//  --             --
//  -- vue-plugin  --
//  --             --
Vue.use(VueWild);
Vue.use(VueTouch);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
