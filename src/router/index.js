import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FeatureSelector from "../views/FeatureSelector.vue"
import FeatureStore from "../views/FeatureStore.vue"
import UploadCv from "../views/UploadCv.vue"

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
  {
    path: '/feature-store/:id',
    name: "FeatureStore",
    component: FeatureStore
  },
  {
    path: '/upload-cv/:id',
    name: "UploadCv",
    component: UploadCv
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
