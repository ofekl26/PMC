<template>
  <v-card flat>
    <div style="background-image: url('https://imgur.com/kdVhnAJ.jpg') ;">
      <div style="width:50%; margin:0 auto;">
        <v-card-title max-width="30">
          <v-spacer></v-spacer>
        </v-card-title>
      </div>

      <div style="width:80%; margin:0 auto; padding-bottom:50px;">
        <v-data-table
          id="main-table"
          :headers="headers"
          :items="Units"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="name"
          show-expand
          class="elevation-1"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
          max-width="200px"
          calculate-widths
          :items-per-page="5"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-row align="center">
                <v-col cols="1">
                  <v-toolbar-title style="font-size:22px">Your Units</v-toolbar-title>
                </v-col>
                <v-col align-self="center" cols="2">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col align-self="center" cols="1" style="margin-top:21px">
                  <v-text-field v-model="price" type="number" label="Up To" placeholder="ILS"></v-text-field>
                </v-col>
              </v-row>
            </v-toolbar>
          </template>
          <template v-slot:item.image="{ item }">
            <v-img
              :src="item.image"
              style="width: 180px; height: 120px; background-color: rgba(300, 300, 300, 20%);"
              cover
              id="row-img"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" id="death">
              <v-row>
                <v-col cols="0">
                  <v-img
                    :src="item.image"
                    style="margin-top:10px; margin-bottom:10px; margin-left:80px; width: 300px; height: 200px; background-color: rgba(300, 300, 300, 20%);"
                    cover
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>

                <v-col cols="3" style="padding:20px">
                  <v-row align="center" justify="start" style="font-size:16px">{{ item.freeText }}</v-row>
                </v-col>
                <v-col cols="1" style="padding:20px">
                  <v-row align="center" style="font-size:16px">
                      <span v-html="item.attractions"/>
                  </v-row>
                </v-col>

                <v-col cols="0" align-self="center">
                  <v-row justify="end" style="padding:40px">
                    <!-- <v-btn color="primary" @click="bookUnit(item.id)">Book The Unit</v-btn> -->
                  </v-row>
                </v-col>
              </v-row>
            </td>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-card>
</template>

<script>
import db from "../main.js";
import firebase from "firebase";
import "firebase/auth";
export default {
  name: "OwnerStatistics",
  data() {
    return {
      search: "",
      price: "",
      loading: true,
      expanded: [],
      singleExpand: false,

      headers: [
        { text: "", value: "data-table-expand" },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "image",
          width: "50px"
        },
        {
          text: "Address",
          sortable: true,
          value: "name",
          filter: value => {
            if (!this.search) return true;
            console.log(this.search, value);
            console.log(value.toLowerCase().includes(this.search));
            return value.toLowerCase().includes(this.search);
          }
        },
        {
          text: "Times Booked",
          sortable: true,
          value: "bookedAmount"
        },
        {
          text: "Price",
          value: "price",
          filter: value => {
            if (!this.price) return true;
            return value <= parseInt(this.price);
          }
        }
      ],
      Units: []
    };
  },
  created() {
    db.collection("Units")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data();
          this.unitdoc = doc.id;
          console.log(firebase.auth().currentUser.uid);
          if (data.ownerID == firebase.auth().currentUser.uid)
            this.curses(data);
        });
      });
    this.loading = false;
  },
  methods: {
    findRented(currID) {
      return new Promise(resolve => {
        var res = false;
        db.collection("Users")
          .doc("students")
          .collection("Students")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              var data = doc.data();

              if (data.bookedUnit == currID) {
                res = true;
              }
            });
            resolve(res);
          });
      });
    },

    async curses(data) {
      let flag = await this.findRented(data.unitID);
      this.Units.push({
        id: data.unitID,
        name: data.address,
        price: data.price,
        freeText: data.details,
        bookedAmount: data.booked_count,
        attractions: data.attDet,
        image: require("../assets/unit_example.jpg")
      });
      if (flag) {
        this.Units[this.Units.length - 1].name += " - RENTED";
      }
    },
    bookUnit(unit_id) {
      try {
        /*this.$router.replace({name: "", params: {"u":unit_id}});*/
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.v-data-table th {
  font-size: 18px !important;
}

.v-data-table td {
  font-size: 20px !important;
}
#death
  tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: 0;
}
</style>
