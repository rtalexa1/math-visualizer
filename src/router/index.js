import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LongDivision from "../views/LongDivision.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/long_division",
    name: "long_division",
    component: LongDivision,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
