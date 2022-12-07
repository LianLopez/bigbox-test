import Vue from "vue";
import VueRouter from "vue-router";
import ActivitiesList from "../views/ActivitiesView/ActivitiesList.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
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
