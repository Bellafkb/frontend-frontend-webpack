// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import queryString from 'query-string'
import VueStar from 'vue-star'
import {store} from './store'

Vue.component('VueStar', VueStar)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(queryString)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  queryString,
  router,
  store,
  components: { App },
  template: '<App/>'
})
