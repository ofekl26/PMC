<template>
  <div>
    <div style="height:5em">Book a unit - cart page</div>
    <form @submit.prevent="pressed">
      <div v-if="gotparam" style="margin-left:10px">
        <div style="height:1em">unit details:</div>
        <div style="height:1em">
          address:
          <span v-html="addr"></span>
        </div>
        <div style="height:1em">
          price:
          <span v-html="price"></span>
        </div>
        <div style="height:3em">
          details:
          <span v-html="details"></span>
        </div>
        <div style="height:1em">
          please confirm that you want to book the unit by typing the address:
          <span v-html="addr"></span>
        </div>
        <v-text-field label="Address" v-model="card" style="width:20em" />
        <div v-if="showerror" style="color: red">please enter the unit's address</div>
        <v-btn color="primary" @click="pressed()">Book unit</v-btn>
        <div>
          Want to clear your cart?
          <v-btn color="red" @click="clearCart()">Clear</v-btn>
        </div>
      </div>
      <div v-if="!gotparam" style="color: red">empty cart</div>
      <div v-if="error" class="error">{{error.message}}</div>
    </form>
  </div>
</template>

<script>
import db from "../main";
import firebase from "firebase"
import "firebase/auth"
// import * as aws from 'aws-sdk';
// import { SES } from 'aws-sdk'
// import { AwsConfig } from '../../../awsConfig';
export default {
  Name: "Cart",
  data() {
    return {
      card: "",
      error: "",
      showerror: false,
      addr: "",
      HTMLcontent: "",
      empty_cart: false,
      gotparam: true,
      price: "",
      details: "",
      oID: "",
      unitdoc: "",
      unitdata: ""
    };
  },
  created() {
    var u1 = this.$route.params.u;
    if (u1) {
      db.collection("Units")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            var data = doc.data();
            console.log("DOC: ", data);
            if (data.unitID == u1) {
              this.unitdoc = doc.id;
              console.log(this.unitdoc);
              this.addr = data.address;
              this.price = data.price;
              this.details = data.details;
              this.oID = data.ownerID;
            }
          });
        });
    } else this.gotparam = false;
    this.empty_cart = true;
  },
  methods: {
    clearCart() {
      this.gotparam = false;
    },
    async pressed() {
      if (this.card == this.addr) {
        this.showerror = false;
        if (this.card != "") {
          db.collection("Users")
            .doc("owners")
            .collection("Owners")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                var data = doc.data();
                console.log("DOC: ", data.userID);
                var unitdocument = db.collection("Units").doc(this.unitdoc);
                // var getOptions = {
                //   source: "cache"
                // };
                unitdocument.get().then( doc =>  {
                    
                    this.unitdata = doc.data();
                    console.log(this.unitdata);
                    console.log(this.unitdata);
                    if (data.userID == this.unitdata.ownerID) {
                        console.log("aaaaa");
                        var ownermail = data.email;
                        var bc = this.unitdata.booked_count;
                        console.log(bc);
                        db.collection("Units").doc(this.unitdoc).set({
                            unitID: this.unitdata.unitID,
                            address: this.addr,
                            price: this.price,
                            ownerID: this.oID,
                            details: this.details,
                            booked_count: bc + 1
                        });
                        db.collection("Users").doc("students").collection("Students").get().then(querySnapshot1 => {
                                querySnapshot1.forEach(doc => {
                                    var datas = doc;
                                    var datastu = datas.data();
                                    console.log(this);
                                    if (
                                        (datastu.email = firebase.auth().currentUser.email) //= "ofeklug@gmail.com")
                                    ) {
                                        console.log(this);
                                        db.collection("Users").doc("students").collection("Students").doc(datas.id).set({
                                            email: datastu.email,
                                            password: datastu.password,
                                            acaInst: datastu.acaInst,
                                            userID: datastu.userID,
                                            bookedUnit: this.unitdata.unitID
                                        });
                                    }
                                    // var express = require('express');
                                    // var app     = express();
                                    // var aws     = require('aws-sdk');
                                    // app.get('/send', function (req, res) {
                                        // var ses_mail = "From: 'AWS Tutorial Series' <" + email + ">\n";
                                    // ses_mail = ses_mail + "To: " + email + "\n";
                                    // ses_mail = ses_mail + "Subject: AWS SES Attachment Example\n";
                                    // ses_mail = ses_mail + "MIME-Version: 1.0\n";
                                    // ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
                                    // ses_mail = ses_mail + "--NextPart\n";
                                    // ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
                                    // ses_mail = ses_mail + "This is the body of the email.\n\n";
                                    // ses_mail = ses_mail + "--NextPart\n";
                                    // ses_mail = ses_mail + "Content-Type: text/plain;\n";
                                    // ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"attachment.txt\"\n\n";
                                    // ses_mail = ses_mail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
                                    // ses_mail = ses_mail + "--NextPart--";
                                    alert("unit successfully booked\nmail sent to the unit owner");
                                    this.clearCart();
                                    this.$route.replace({name: "Home"});
                                },this);
                        },this);
                    }
                }, this);
              });
            });
        } 
        else alert("couldnt book unit");
      } 
      else this.showerror = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
    color: red;
  font-size: 18px;
}
input {
    width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}

button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>