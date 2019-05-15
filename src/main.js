// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import queryString from 'query-string'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(queryString)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  queryString,
  router,
  components: { App },
  template: '<App/>'
})
