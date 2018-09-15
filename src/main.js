import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/moment'
import './plugins/filters'
import router from './plugins/router'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data() {
    return {
      someData: 123
    }
  }
}).$mount('#app')
