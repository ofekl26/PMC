<template>
  <v-app>
    <v-app-bar app color="gray" dark>
      <div id="logo" class="d-flex align-center" @click="$router.replace('/')">
        <v-img 
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <div id="site-name">
          samiroom
        </div>
      </div>

      <v-spacer></v-spacer>
      <div  v-if="!connected">
      <v-btn @click="move('/login')">
        <span class="mr-2">Login</span>
        <v-icon>mdi-open</v-icon>
      </v-btn>
      </div>
      <div  v-else>
      <v-btn @click="SignOut"
      >
        <span class="mr-2">Sign Out</span>
        <v-icon>mdi-open</v-icon>
      </v-btn>
      </div>
      <div>
      <v-btn @click="move('/addunit')"
      >
        <span class="mr-2">Add Unit</span>
        <v-icon>mdi-open</v-icon>
      </v-btn>
      <v-btn @click="move('/Statistics')"
      >
        <span class="mr-2">Statistics</span>
        <v-icon>mdi-open</v-icon>
      </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <div>
      <router-view/>
      </div>
      
    </v-content>
  </v-app>
</template>

<style>
#site-name {
  font-size: 30px;
  font-weight: bold;

}
#logo { cursor: pointer; }

</style>

<script>
import HelloWorld from "./components/HelloWorld";
import * as firebase from "firebase/app"
import "firebase/auth"

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data(){
        return{
            connected: ""
        }
    },
    created(){
      firebase.auth().onAuthStateChanged(user => {
            this.connected = true;
            console.log(!!user);
    });
    },
    methods:{
      async SignOut(){
            try{
            const data = await firebase.auth().signOut();
            this.connected = false;
            console.log(data);
            this.move(this.route.path);
            }   
            catch(err){
               console.log(err)
            }
        },
        move(path){
          if(this.$route.path != path){
            this.$router.replace(path);}
        } 
    }
    
};

</script>
<style scoped>

</style>
