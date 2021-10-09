import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FeatureSelector from "../views/FeatureSelector.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feature-selector/:id",
    name: "FeatureSelector",
    component: FeatureSelector,
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
