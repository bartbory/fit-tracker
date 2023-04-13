import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAuth } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/UserRegister.vue"),
  },
  {
    path: "/calculation",
    name: "calculation",
    component: () =>
      import(
        /* webpackChunkName: "calculation" */ "../views/CalculationView.vue"
      ),
  },
  {
    path: "/user",
    name: "user",
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
      },
      {
        path: "body-measurement",
        name: "measurement",
        component: () =>
          import(
            /* webpackChunkName: "measurement" */ "../views/BodyMeasurement.vue"
          ),
      },
      {
        path: "body-details",
        name: "details",
        component: () =>
          import(/* webpackChunkName: "details" */ "../views/BodyDetails.vue"),
      },
      {
        path: "body-setup",
        name: "setup",
        component: () =>
          import(/* webpackChunkName: "setup" */ "../views/BodySetup.vue"),
      },
      {
        path: "summary",
        name: "summary",
        component: () =>
          import(/* webpackChunkName: "summary" */ "../views/SummaryView.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
