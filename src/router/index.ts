import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "",
          name: "balances",
          component: () => import("@/components/UserBalances.vue"),
        },
        {
          path: "events",
          name: "events",
          component: () => import("@/components/UserEvents.vue"),
        },
      ],
    },
  ],
});

export default router;
