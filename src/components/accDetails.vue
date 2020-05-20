<template>
    <div class="wrapper" id="background" style="background-image: url('../../design_files/images/registerback.png') ;">
            
            <div class="inner">
                <div class="image-holder">
                    <img src="../../design_files/images/registration-form-1.png">
                </div>

                <form action="">
                    <h3>הגדרות חשבון</h3>
                    <div class="form-group">
                        <input id="firstName" type="text" placeholder="שם פרטי" class="form-control">
                        <input id="secondName" type="text" placeholder="שם משפחה" class="form-control">

                    </div>
                    <div class="form-wrapper">
                        <select name="" id="city" class="form-control">
                            <option value="" disabled selected>אזור</option>
                            <option value="alef">א</option>
                            <option value="bet">ב</option>
                            <option value="gimel">ג</option>
                            <option value="dalet">ד</option>
                            <option value="hei">ה</option>
                            <option value="vav">ו</option>
                            <option value="het">ח</option>
                            <option value="tet">ט</option>
                            <option value="yud">י</option>
                            <option value="yudalf">יא</option>
                            <option value="yudbet">יב</option>
                            <option value="yudgimel">יג</option>
                        </select>
                        <i class="zmdi zmdi-caret-down" style="font-size: 17px;"></i>
                    </div>
                    <div class="form-wrapper">
                        <input id="phone" type="number" placeholder="מס' טלפון" class="form-control">
                        <i class="zmdi zmdi-tablet-mac"></i> 
                    </div>

                    <select name="" id="gender" class="form-control">
                        <option value="" disabled selected>מין</option>
                        <option value="male">זכר</option>
                        <option value="female">נקבה</option>
                    </select>
                    <i class="zmdi zmdi-caret-down" style="font-size: 17px;"></i>

                     <div class="form-wrapper">
                        <input id="address" type="text" placeholder="כתובת" class="form-control">
                        <i class="zmdi zmdi-account-box-mail"></i> 
                    </div>

                    <div class="form-group container-login100-form-btn">
                        <v-btn @click="btnclick2()" id="btn-update">
                            עדכן פרטים
                            <i class="zmdi zmdi-arrow-right"></i>
                        </v-btn>
                    </div>
                </form>    

            </div>

        </div>     
</template>
<script>
import * as firebase from "firebase/app"
import "firebase/auth"
import $ from 'jquery'
export default {
    data: () => 
    {

    },
    methods:
    {
        btnclick2()
        {
            var phone = $("#phone").val();
            var address = $("#address").val(); 
            var fName = $("#firstName").val();
            var sName = $("#secondName").val();
            var city = $("#city").val();
            var gender = $("#gender").val();

            var rootRef = firebase.database().ref().child("Users");
            var userID= firebase.auth().currentUser.uid;
            var usersRef = rootRef.child(userID);

            if(fName!="" && sName!="" && phone!="" && address!="" && city!="" && gender!="")
            {
                var userData=
                {
                "phone": phone,
                "address": address,
                "firstName": fName,
                "secondName": sName,
                "city": city,
                "gender": gender,
                };

                usersRef.set(userData, function(error)
                {
                if(error)
                {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(errorCode);
                    console.log(errorMessage);

                    window.alert("Message: " + errorMessage);

                }
                else
                {
                    window.location.href= "MainPage.html";

                }

                });
            }
            else
            {
                window.alert(".אנא מלא את כל השדות")

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