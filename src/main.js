import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import VueRx from 'vue-rx'
import VuejsClipper from "vuejs-clipper/dist/vuejs-clipper.umd.min";
import "vuejs-clipper/dist/vuejs-clipper.css";

Vue.use(VueRx);
Vue.use(VuejsClipper, {
  components: {
     clipperBasic: true,
     clipperPreview: true
  }
 });
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
