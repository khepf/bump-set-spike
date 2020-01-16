import Vue from "vue";
import VueRouter, { RouterOptions, RouteConfig } from "vue-router";
import store from "@/store";
import Landing from "@/pages/PageLanding.vue";
import Home from "@/pages/PageHome.vue";
import ThreadShow from "@/pages/PageThreadShow.vue";
import ThreadCreate from "@/pages/PageThreadCreate.vue";
import ThreadEdit from "@/pages/PageThreadEdit.vue";
import Category from "@/pages/PageCategory.vue";
import Forums from "@/pages/PageForums.vue";
import Forum from "@/pages/PageForum.vue";
import Profile from "@/pages/PageProfile.vue";
import Register from "@/pages/PageRegister.vue";
import SignIn from "@/pages/PageSignIn.vue";
import NotFound from "@/pages/PageNotFound.vue";

Vue.use(VueRouter);

const routes = <Array<RouteConfig>>[
  {
    path: "/",
    name: "Landing",
    component: Landing
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "@/pages/PageHome.vue")
  },
  {
    path: "/forums",
    name: "Forums",
    component: Forums
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: Forum,
    props: true
  },
  {
    path: "/thread/create/:forumId",
    name: "ThreadCreate",
    component: ThreadCreate,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/me",
    name: "Profile",
    component: Profile,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: Profile,
    props: { edit: true },
    meta: { requiresAuth: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: "/logout",
    name: "SignOut",
    meta: { requiresAuth: true },
    beforeEnter(to: any, from: any, next: any) {
      store.dispatch("signOut").then(() => next({ name: "Home" }));
    }
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = <RouterOptions>new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
