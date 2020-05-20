import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase


const firebaseapp = firebase.initializeApp(firebaseConfig);

export default firebaseapp.firestore();

firebase.auth.Auth.Persistence.LOCAL;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  render: function(h) {
    return h(App);
  },
}).$mount("#app");
