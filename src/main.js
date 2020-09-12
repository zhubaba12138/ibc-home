import Vue from 'vue'
import App from './App.vue'
import './icons' // svg 图标

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
