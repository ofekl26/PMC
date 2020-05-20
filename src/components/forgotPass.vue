<template>
    <div class="wrapper" id="background" style="background-image: url('../../design_files/images/registerback.png') ;">
            
            <div class="inner" id="resetPasswordBack">
                <div class="image-holder" id="logoResetpassword">
                    <img src="../../design_files/images/registration-form-1.png">
                </div>

                <form action="" >
                    <h3>?שכחת סיסמה</h3>
                    <div class="form-group" id="resetFont" style="text-align: justify;">
                       <p>
                          אנא הכנס את כתובת הדוא"ל שלך למטה ואנו נשלח לך מידע לשחזור חשבונך.
                       </p>
                  
                    </div>
                    <div class="form-wrapper">
                        <input id="email" type="email" placeholder="דואר אלקטרוני" class="form-control">
        
                        <!--from material-design-iconic-font.css-->
                            <i class="zmdi zmdi-email"></i> 
                    </div>
                    <div class="form-group container-login100-form-btn">
                        <v-btn @click="btnclick" id="btn-resetPassword" type="button">
                            אפס את הסיסמה
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
    created(){
        firebase.auth().onAuthStateChanged(function(user) 
                {
                if (user) 
                {
                    // User is signed in.
                    this.$router.replace({name: 'HelloWorld'})
                }
    
    
        });
    }
    ,methods: {
        btnclick(){
            var auth = firebase.auth();
    var email = $("#email").val();

    if(email != "")
    {
      auth.sendPasswordResetEmail(email).then(function()
      {
        window.alert(".נשלחה כעת הודעה למייל שלך");

      })
      .catch(function(error)
      {  
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message: " + errorMessage);
      });
    }
    else
    {
      window.alert("אנא כתוב תחילה את כתובת המייל שלך")
    } 
  
        }
    }
}
</script>