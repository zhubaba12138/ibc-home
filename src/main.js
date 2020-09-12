import Vue from "vue";
import App from "./App.vue";
import "./icons"; // svg 图标
import CanvasNest from "canvas-nest.js";
import VueClipboard from "vue-clipboard2";
import Toasted from 'vue-toasted';

const config = {
  color: "255,255,255",
  count: 88,
  zIndex: 1,
  opacity: 1
};
new CanvasNest(document.body, config);
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);
Vue.use(Toasted);
Vue.config.productionTip = false;
import './icons' // svg 图标
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app");
