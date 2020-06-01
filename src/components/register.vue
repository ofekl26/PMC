<template>
    <div class="wrapper" id="background" style="background-image: url('https://imgur.com/kdVhnAJ.jpg') ;">
            
            <div class="inner">
                <div class="image-holder">
                    <img src="../../design_files/images/registration-form-1.png">
                </div>

                <form action="">
                    <h3>הרשמה</h3>
                    <div class="form-wrapper">
                        <input id="email" type="email" v-model="email" placeholder="דואר אלקטרוני" class="form-control">
        
                        <!--from material-design-iconic-font.css-->
                            <i class="zmdi zmdi-email"></i> 
                    </div>
                    <div class="form-wrapper">
                        <input id="password" type="password" v-model="password" placeholder="סיסמא " class="form-control">
                        
                        <!--from material-design-iconic-font.css-->
                            <i class="zmdi zmdi-lock"></i> 
                    </div>
                    <div class="form-wrapper">
                            <input id="confirmPassword" type="password" v-model="cpass" placeholder="אימות סיסמא" class="form-control">
                        
                        <!--from material-design-iconic-font.css-->
                            <i class="zmdi zmdi-lock"></i> 
                    </div>
                    <!-- <div class="form-wrapper" id="radioType" >
                     <div class="typeFont">  <b> :בחר את סוג המשתמש</b> </div>
                        <input type="radio" name="radio" id="student" value='סטודנט'>
                        <label for="student">סטודנט</label>
                        nbsp
                        <input type="radio" name="radio" id="owner" value='משכיר דירה'>
                        <label for="owner">משכיר דירה</label>
                
                   </div> -->
                   <v-radio-group v-model="radioGroup" dir="ltr">
                        <v-radio dir="ltr"
                            label="סטודנט"
                            value="1"
                        ></v-radio>
                        <v-radio dir="ltr"
                            label="בעל יחידה"
                            value="0"
                        ></v-radio>
                    </v-radio-group>
                    <div class="form-group container-login100-form-btn">
                        <v-btn @click="btnclick" id="btn-signup" type="button">
                            הירשם
                            <i class="zmdi zmdi-arrow-right"></i>
                        </v-btn>
                    </div>
                    <div class="w-full text-center"  style="margin-top: 49%; top: 100px; font-size: 15px;">
                        <a  @click=login id="haveUser" class="text-dark">
                            ?כבר יש לך חשבון
                        </a>
                    </div> 
                </form>    

            </div>

        </div> 
</template>
<script>
import $ from 'jquery'
import * as firebase from "firebase/app"
import "firebase/auth"
import db from '../main'
export default {
    data:()=>{return{
        radioGroup: 1,
        email: "",
        password: "",
        cpass: ""
    }},
    methods:
    {
        login(){
            this.$router.replace('/login');
        },
        btnclick(){
            // Sign up button actions
            // Check if email and password not empty
            if(this.email != "" && this.password !="" && this.cpass )
            {
                //Check if password match to Confirm password
                if(this.password== this.cpass)
                {
                var result = firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
                //firebase.auth().signInWithEmailAndPassword(email, password);
                var uID = firebase.auth().currentUser.uid; 
                var docname = uID;
                console.log(uID);
                console.log(docname);
                if(this.radioGroup == 1){
                    console.log(uID);
                db.collection("Users").doc("students").collection("Students").doc(docname).set({
                    email: this.email,
                    password: this.password,
                    acaInst: 'sce',
                    userID: uID
                    
                });
                console.log(uID);
                
                }
                else if(this.radioGroup == 0){
                db.collection("Users").doc("owners").collection("Owners").doc(docname).set({
                    email: this.email,
                    password: this.password,
                    userID: uID
                    
                });
                
                }
                this.$router.replace({ name: "HelloWorld"});
                // result.catch(function(error)
                // {
                //     var errorCode = error.code;
                //     var errorMessage = error.message;
            
                //     console.log(errorCode);
                //     console.log(errorMessage);
            
                //     window.alert("Message: " + errorMessage);
            
                // });
                }
                else
                {
                window.alert("Password do not match with the Confirm Password.")
                }
            }
            else
            {
                window.alert("Please fill out all fields.");
            }
        }
    }
}
</script>
<style scoped>
@font-face {
  font-family: "Poppins-Regular";
  src: url("../../design_files/fonts/poppins/Poppins-Regular.ttf"); }
@font-face {
  font-family: "Poppins-SemiBold";
  src: url("../../design_files/fonts/poppins/Poppins-SemiBold.ttf"); }
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box; }

#background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

#notUser {
  position: relative;
  bottom: 15px;

}

#haveUser {
  position: relative;
  bottom: 90px;
}

#resetPasswordBack {
  height: 400px;
}



#logoResetpassword {
  position: relative;
  top: 30px;
}

#resetFont {
  direction: rtl;
  font-family: 'Segoe UI';
}

#radioType {

  text-align: center;
  font-size: 17px;
}



body {
  font-family: "Poppins-Regular";
  color: #333;
  font-size: 13px;
  margin: 0; }

input, textarea, select, button {
  font-family: "Poppins-Regular";
  color: #333;
  font-size: 13px; }
  


p, h1, h2, h3, h4, h5, h6, ul {
  margin: 0; }

img {
  max-width: 100%; }

ul {
  padding-left: 0;
  margin-bottom: 0; }

a:hover {
  text-decoration: none;
 }

:focus {
  outline: none; }

.wrapper {
  min-height: 100vh;
  background-size: auto;
  background-repeat: no-repeat;
  display: flex;
  align-items: center; }

.inner {
  padding: 0px;
  opacity: 0.95;
  background: #f5f5f5;
  max-width: 800px;
  max-height: 500px;
  margin: auto;
  display: flex;
  border-radius: 80px; }
  .inner .image-holder {
    position: relative;
    left: 40px;
    top: 80px;
    width: 50%; }
  .inner form {
    width: 50%;
    padding-top: 36px;
    padding-left: 45px;
    padding-right: 45px; }
  .inner h3 {
    text-transform: uppercase;
    font-size: 25px;
    font-family: "Poppins-SemiBold";
    text-align: center;
    margin-bottom: 28px; }

.form-group {
  display: flex; }
  .form-group input {
    width: 50%; }
    .form-group input:first-child {
      margin-right: 25px; }

.form-wrapper {
  position: relative; }
  .form-wrapper i {
    position: absolute;
    bottom: 9px;
    left: 10px; }

.form-control {
  border: 1px solid #333;
  border-top: none;
  border-right: none;
  border-left: none;
  display: block;
  width: 100%;
  height: 30px;
  padding: 0;
  margin-bottom: 25px;
  position: relative;
  text-align: right; }
  .form-control::-webkit-input-placeholder {
    font-size: 15px;
    color: #333;
    font-family: "Poppins-Regular";
    text-align: right; }
  .form-control::-moz-placeholder {
    font-size: 13px;
    color: #333;
    font-family: "Poppins-Regular"; }
  .form-control:-ms-input-placeholder {
    font-size: 13px;
    color: #333;
    font-family: "Poppins-Regular"; }
  .form-control:-moz-placeholder {
    font-size: 13px;
    color: #333;
    font-family: "Poppins-Regular"; }

select {
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  padding-left: 20px; }
  select option[value=""][disabled] {
    display: none; }

button {
  border: none;
  width: 164px;
  height: 51px;
  margin: auto;
  margin-top: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #03a9f4;
  font-size: 15px;
  color: #fff;
  vertical-align: middle;
  border-radius: 8px;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s; }
  button i {
    margin-left: 10px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0); }
  button:hover i, button:focus i, button:active i {
    -webkit-animation-name: hvr-icon-wobble-horizontal;
    animation-name: hvr-icon-wobble-horizontal;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1; }

@-webkit-keyframes hvr-icon-wobble-horizontal {
  16.65% {
    -webkit-transform: translateX(6px);
    transform: translateX(6px); }
  33.3% {
    -webkit-transform: translateX(-5px);
    transform: translateX(-5px); }
  49.95% {
    -webkit-transform: translateX(4px);
    transform: translateX(4px); }
  66.6% {
    -webkit-transform: translateX(-2px);
    transform: translateX(-2px); }
  83.25% {
    -webkit-transform: translateX(1px);
    transform: translateX(1px); }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0); } }
@keyframes hvr-icon-wobble-horizontal {
  16.65% {
    -webkit-transform: translateX(6px);
    transform: translateX(6px); }
  33.3% {
    -webkit-transform: translateX(-5px);
    transform: translateX(-5px); }
  49.95% {
    -webkit-transform: translateX(4px);
    transform: translateX(4px); }
  66.6% {
    -webkit-transform: translateX(-2px);
    transform: translateX(-2px); }
  83.25% {
    -webkit-transform: translateX(1px);
    transform: translateX(1px); }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0); } }
@media (max-width: 1199px) {
  .wrapper {
    background-position: right center; } }
@media (max-width: 991px) {
  .inner form {
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px; } }
@media (max-width: 767px) {
  .inner {
    display: block; }
    .inner .image-holder {

      width: 100%; }
    .inner form {
      width: 100%;
      padding: 40px 0 30px; }

  button {
    margin-top: 60px; } }

/*# sourceMappingURL=style.css.map */
</style>