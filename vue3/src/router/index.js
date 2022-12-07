import { createRouter, createWebHistory } from "vue-router";
import ActivitiesList from "@/views/ActivitiesView/ActivitiesList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: {
        name: "activities",
      },
    },
    {
      path: "/actividades",
      name: "activities",
      component: ActivitiesList,
    },
    {
      path: "/actividades/:id",
      name: "single",
      component: () => import("@/views/ActivitiesView/ActivitySingle.vue"),
    },
  ],
});

export default router;
