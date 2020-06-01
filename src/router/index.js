import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import OwnerStatistics from "../components/OwnerStatistics.vue";
import addUnit from "../components/addUnit.vue"
import favorites from "../components/favorites.vue"
import Cart from "../views/cart.vue";
import login from "../components/login.vue"
import register from "../components/register.vue"
import forgotPass from "../components/forgotPass.vue"
import accDetails from "../components/accDetails.vue"
import * as firebase from "firebase/app"
import "firebase/auth"


Vue.use(VueRouter);
var requiresAuth;

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld
  },
  {
    path: "/Statistics",
    name: "OwnerStatistics",
    component:OwnerStatistics,
    meta: {requiresAuth: true},
    props: true
  },
  {
    path: "/addUnit",
    name: "addUnit",
    component: addUnit,
    meta: {requiresAuth: true}
  },
  {
    path: "/favorites",
    name: "favorites",
    component: favorites,
    meta: {requiresAuth: true}
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path:"/register",
    name:"register",
    component: register
  },
  {
    path: "/accdetails",
    name: "accdetails",
    component:accDetails,
    meta: {requiresAuth: true},
    props: true
  },
  {
    path: "/forgotpass",
    name: "forgotpass",
    component: forgotPass
  },
  {
    path: "/Cart",
    name: "Cart",
    component:Cart,
    props: true,
    meta: {requiresAuth: true}
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to,from,next)=> {
  const isAuthenticated = firebase.auth().currentUser;
  requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth && !isAuthenticated)
  {
    alert('you need to login first!')
    next("/login");
  }else{
    next();
  }
})
export default router;
