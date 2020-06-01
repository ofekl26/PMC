<template>
  <v-app>
    <v-app-bar app color="gray" dark>
      <div id="logo" class="d-flex align-center" @click="move('/')">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <div id="site-name">samiroom</div>
      </div>

      <v-spacer></v-spacer>

      <div>
        <v-btn id="addUnitBtn" @click="move('/addunit')">
          <span class="mr-2">Add Unit</span>
          <v-icon>mdi-open</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn id="statsBtn" @click="move('/Statistics')">
          <span class="mr-2">Statistics</span>
          <v-icon>mdi-open</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn id="favBtn" @click="move('/Favorites')">
          <span class="mr-2">Favorites</span>
          <v-icon>mdi-open</v-icon>
        </v-btn>
      </div>
      <div v-if="!connected">
        <v-btn @click="move('/login')">
          <span class="mr-2">Login</span>
          <v-icon>mdi-open</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn @click="SignOut">
          <span class="mr-2">Sign Out</span>
          <v-icon>mdi-open</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <div>
        <router-view @userType="controlUser" />
      </div>
    </v-content>
  </v-app>
</template>

<style>
#site-name {
  font-size: 30px;
  font-weight: bold;
}
#logo {
  cursor: pointer;
}
</style>

<script>
import HelloWorld from "./components/HelloWorld";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data() {
    return {
      connected: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      try{
      if (user) {
        this.connected = true;

        console.log("user: " + user.email);
      }
      }
      catch(err)
      {
        console.log(err);
      }
    });
  },
  mounted() {
    document.getElementById("statsBtn").style.display = "none";
    document.getElementById("addUnitBtn").style.display = "none";
    document.getElementById("favBtn").style.display = "none";
  },
  methods: {
    SignOut() {
      try {
        const data = firebase.auth().signOut();
        this.connected = false;
        console.log("logout");
        if (this.$route.name != "HelloWorld") {
          this.move('/');
        }
      } catch (err) {
        console.log(err);
      }
    },
    move(path) {
      if (this.$route.path != path) {
        console.log("goes to:" + path);
        this.$router.replace(path);
      }
    },
    controlUser(tp) {
      if (tp == 1 && tp != -1) {
        document.getElementById("favBtn").style.display = "block";
      }
      if (tp == -1) {
        document.getElementById("favBtn").style.display = "none";
      }
      if (tp == 1 || tp == -1) {
        document.getElementById("statsBtn").style.display = "none";
        document.getElementById("addUnitBtn").style.display = "none";
      } else if (tp == 0) {
        document.getElementById("statsBtn").style.display = "block";
        document.getElementById("addUnitBtn").style.display = "block";
        document.getElementById("favBtn").style.display = "none";
      }
    }
  }
};
</script>
<style scoped>
</style>
