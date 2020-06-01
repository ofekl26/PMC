<template>
    <div   class="wrapper" id="background" style="background-image: url('https://imgur.com/kdVhnAJ.jpg') ;">
           
            <div class="inner" id="addUnit">
                <div class="image-holder">
                    <img src="../../design_files/images/registration-form-1.png">
                </div>

                <form action="">
                  <div>
                    <h3>הוספת דירה</h3>
                    <div class="form-wrapper">
                        <input id="address" type="address" v-model="address" placeholder="כתובת" class="form-control">
        
                        <!--from material-design-iconic-font.css-->
                            <i class="zmdi zmdi-home"></i> 
                    </div>
                    <div class="form-wrapper">
                        <input id="price" type="number" v-model="price" placeholder="מחיר בשקלים" class="form-control">
                        
                        <!--from material-design-iconic-font.css-->
                            <i class="zmdi zmdi-money"></i> 
                    </div>
                    <div class="form-wrapper">
                            <textarea  placeholder="...פרטים נוספים: סוג נכס\גודל דירה\מס' חדרים" rows="4" maxlength="300" id="details" v-model="details" type="details" class="form-control"></textarea>   
                        <!--from material-design-iconic-font.css-->
                            <i class="zmdi zmdi-info"></i> 
                    </div>

                    <div class="form-wrapper" id="file">
                        <input type='file' id="choosefile"  class="form-control"/>
                        <i class="zmdi zmdi-image"></i> 
                    </div>
                    <v-container fluid dir="ltr">
                      <v-checkbox v-model="checkbox1"  :label="`פיצה`">
                        </v-checkbox>
                        <v-text-field v-model="pizzaPer" v-if='checkbox1' label="אחוזי הנחה"></v-text-field>
                        <div v-if='checkbox1' class="form-wrapper" id="file1">
                        <input type='file' id="choosefile"  class="form-control"/>
                        <i class="zmdi zmdi-image"></i> 
                    </div>
                      <v-checkbox v-model="checkbox2" :label="`קולנוע`"></v-checkbox>
                      <v-text-field v-model="cinePer" v-if='checkbox2' label="אחוזי הנחה"></v-text-field>
                      <div v-if='checkbox2' class="form-wrapper" id="file2">
                        <input type='file' id="choosefile"  class="form-control"/>
                        <i class="zmdi zmdi-image"></i> 
                    </div>
                      <v-checkbox v-model="checkbox3" :label="`לונה פארק`"></v-checkbox>
                      <v-text-field v-model="parkPer" v-if='checkbox3' label="אחוזי הנחה"></v-text-field>
                      <div v-if='checkbox3' class="form-wrapper" id="file3">
                        <input type='file' id="choosefile"  class="form-control"/>
                        <i class="zmdi zmdi-image"></i> 
                    </div>
                      <v-checkbox v-model="checkbox4" :label="`טיילת`"></v-checkbox>
                      <v-text-field v-model="marinaPer" v-if='checkbox4' label="אחוזי הנחה"></v-text-field>
                      <div v-if='checkbox4' class="form-wrapper" id="file4">
                        <input type='file' id="choosefile"  class="form-control"/>
                        <i class="zmdi zmdi-image"></i> 
                    </div>
                    <v-checkbox v-model="checkbox5" :label="`אחר`"></v-checkbox>
                    <div v-for="n in arr.length-1" :key="n-1">
                    
                    <v-text-field v-if='checkbox5' v-model="arr[n].name" label="אטרקציה"></v-text-field>
                    <v-text-field v-if='checkbox5' v-model="arr[n].percentage" label="אחוזי הנחה"></v-text-field>
                      <div v-if='checkbox5' class="form-wrapper" id="arr[n].file">
                        <input type='file' id="choosefile"  class="form-control"/>
                        <i class="zmdi zmdi-image"></i> 
                    </div>
                    <v-icon color="blue" v-if='checkbox5' @click="append">mdi-plus</v-icon>
                    <v-icon v-if='checkbox5 && n != 1' slot="prepend" color="red" @click="prepend">mdi-minus</v-icon>
                    </div>
                      <div class="form-group container-login100-form-btn">
                          <v-btn @click="btnclick()">
                              הוסף
                              <i class="zmdi zmdi-arrow-right"></i>
                          </v-btn>
                      </div>
                    </v-container>
                   
                    <!-- <div class="w-full text-center"  style="margin-top: 40%; top: 100px; font-size: 15px;">
                        <a  href="MainPage.html" id="haveUser" class="text-dark">
                            דף הבית
                        </a>
                    </div> -->
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
  data: ()=>{
    return{
    price: "",
    details:"",
    address:"",
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    attDet: "",
    pizzaPer: "",
    cinePer: "",
    parkPer: "",
    marinaPer: "",
    arr: [{},{}]
    }
  },
    methods: {
      append(){
        
        this.arr.push({});
      },
      prepend(){
         this.arr.pop();
      },
      
        btnclick(){
            // add unit button actions
            // Create a storage ref
            const ref = firebase.storage().ref()
            
            //const file =document.querySelector("#choosefile").files[0];

            // Get current username
            var user = firebase.auth().currentUser.uid;

            
            var addr = document.getElementById("address");
            var p = document.getElementById("price");
            var d = document.getElementById("details");
            

            //console.log(file);
            // Check if file isn`t empty
            // if(!!file)
            // {
            //     const name ='Users/' + user.uid + '/apartmentPicture/' + file.name ;
            // const metadata= {
            //     contentType:file.type
            // };

            // const task= ref.child(name).put(file1,metadata)
            // task
            // .then(snapshot => snapshot.ref.getDownloadURL())
            // .then(url =>{
            //     console.log(url)
            //     alert("התמונה הועלתה בהצלחה!")
            // });
                
            // }
            console.log(this.address);
            if(this.checkbox1)
            {
            //   if(!!file1)
            // {
            //     const name ='Units/' + user.uid + '/attractionPictures/' + file1.name ;
            // const metadata= {
            //     contentType:file1.type
            // };

            // const task= ref.child(name).put(file,metadata)
            // task
            // .then(snapshot => snapshot.ref.getDownloadURL())
            // .then(url =>{
            //     console.log(url)
            //     alert("התמונה הועלתה בהצלחה!")
            // });
                
            // }
              if(!isNaN(this.pizzaPer) && this.pizzaPer != "")
              {
                this.attDet += "פיצה  - " +this.pizzaPer+"% הנחה"+"<br>"
              }
              else{
                alert('נא לכתוב אחוזי הנחה תקינים')
                return 0;
              }
            }
            if(this.checkbox2)
            {
            //   if(!!file2)
            // {
            //     const name ='Units/' + user.uid + '/attractionPictures/' + file2.name ;
            // const metadata= {
            //     contentType:file2.type
            // };

            // const task= ref.child(name).put(file2,metadata)
            // task
            // .then(snapshot => snapshot.ref.getDownloadURL())
            // .then(url =>{
            //     console.log(url)
            //     alert("התמונה הועלתה בהצלחה!")
            // });
                
            //}
              if(!isNaN(this.cinePer) && this.cinePer != "")
              {
                this.attDet += "קולנוע  - " +this.cinePer+"% הנחה"+"<br>"
              }
              else{
                alert('נא לכתוב אחוזי הנחה תקינים')
                return 0;
              }
            }
            if(this.checkbox3)
            {
            //   if(!!file3)
            // {
            //     const name ='Units/' + user.uid + '/attractionPictures/' + file3.name ;
            // const metadata= {
            //     contentType:file3.type
            // };

            // const task= ref.child(name).put(file3,metadata)
            // task
            // .then(snapshot => snapshot.ref.getDownloadURL())
            // .then(url =>{
            //     console.log(url)
            //     alert("התמונה הועלתה בהצלחה!")
            // });
                
            //}
              if(!isNaN(this.parkPer) && this.parkPer != "")
              {
                this.attDet += "לונה פארק  - " +this.parkPer+"% הנחה"+"<br>"
              }
              else{
                alert('נא לכתוב אחוזי הנחה תקינים')
                return 0;
              }
            }
            if(this.checkbox4)
            {
            //   if(!!file4)
            // {
            //     const name ='Units/' + user.uid + '/attractionPictures/' + file4.name ;
            // const metadata= {
            //     contentType:file4.type
            // };

            // const task= ref.child(name).put(file4,metadata)
            // task
            // .then(snapshot => snapshot.ref.getDownloadURL())
            // .then(url =>{
            //     console.log(url)
            //     alert("התמונה הועלתה בהצלחה!")
            // });
                
            //}
              if(!isNaN(this.marinaPer) && this.marinaPer != "")
              {
                this.attDet += "טיילת - " +this.marinaPer+"% הנחה"+"<br>"
              }
              else{
                alert('נא לכתוב אחוזי הנחה תקינים')
                return 0;
              }
            }
            for(let i =0; i<this.arr.length; i++)
            {
              if(this.arr[i].name = "")
              {alert("נא לכתוב שם אטרקציה תואם")
              return 0;}

              if(this.arr[i].percentage == "" && isNaN(this.arr[i].percentage)){
                alert('נא לכתוב אחוזי הנחה תקינים')
                return 0;
              }

            //   if(!!this.arr[i].file){
            //     const name ='Units/' + user.uid + '/attractionPictures/' + file2.name ;
            // const metadata= {
            //     contentType:file2.type
            // };

            // const task= ref.child(name).put(file,metadata)
            // task
            // .then(snapshot => snapshot.ref.getDownloadURL())
            // .then(url =>{
            //     console.log(url)
            //     alert("התמונה הועלתה בהצלחה!")
            // });
            else{
            this.attDet += this.arr[i].name + " - " + this.arr[i].percentage + "% הנחה"+"<br>"
            }
            }

            if(this.address != "" && this.price != "" && this.details != ""){
                var dr = db.collection("Units").doc()
                var dr_id = dr.id
                console.log(this.address);
                console.log("IDDDD"+dr_id);
                console.log(this.attDet);
                db.collection("Units").doc(dr_id).set({
                address: this.address,
                price: this.price,
                details: this.details,
                ownerID: user,
                booked_count: 0,
                unitID: dr_id,
                attDet: this.attDet
                });
                this.$router.replace('/')
            }

            else
            {
                window.alert("אנא מלא את כל השדות!");
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
  max-height: 800px;
  margin: auto;
  display: flex;
  border-radius: 80px;
  position: relative; 
  top: -50px}
  .inner .image-holder {
    position: relative;
    left: 40px;
    top: 160px;
    width: 50%; }
  .inner form {
    width: 50%;
    padding-top: 36px;
    padding-left: 45px;
    padding-right: 45px;
    overflow: auto; }
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
  /* border: none;
  width: 164px;
  height: 51px; */
  margin: auto;
  margin-top: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
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