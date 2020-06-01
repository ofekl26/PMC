import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import OwnerStatistics from "../components/OwnerStatistics.vue";
import FavoriteUnits from "../components/FavoriteUnits.vue";
import addUnit from "../components/addUnit.vue";
import Cart from "../views/cart.vue";
import login from "../components/login.vue";
import register from "../components/register.vue";
import forgotPass from "../components/forgotPass.vue";
import accDetails from "../components/accDetails.vue";
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
    meta: { t: -1, requiresAuth:false},
    props: { default: true, t: -1 },
  },
  {
    path: "/Statistics",
    name: "OwnerStatistics",
    component: OwnerStatistics,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/addUnit",
    name: "addUnit",
    component: addUnit,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    meta: { requiresAuth: false },
    component: login,
  },
  {
    path: "/register",
    name: "register",
    meta: { requiresAuth: false },
    component: register,
  },
  {
    path: "/accdetails",
    name: "accdetails",
    component: accDetails,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/forgotpass",
    name: "forgotpass",
    meta: { requiresAuth: false },
    component: forgotPass,
  },
  {
    path: "/Cart",
    name: "Cart",
    component: Cart,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/Favorites",
    name: "FavoriteUnits",
    component: FavoriteUnits,
    props: true,
    meta: { requiresAuth: true },
    
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    var requiresAuth = to.meta.requiresAuth;
    console.log("from: "+ from.name + " to: " + to.name  + " " + requiresAuth);
    console.log("*****");
    if (requiresAuth && !user) {
      alert("you need to login first!");
      next("/login");
    } else {
      next();
    }
  });
});

export default router;
