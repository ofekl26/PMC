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
        id="favoriteTable"
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
        dark
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-row align="center">
              <v-col cols="3">
                <v-toolbar-title style="font-size:22px">Your Favorites Units</v-toolbar-title>
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
                <v-text-field
                  v-model="price"
                  type="number"
                  label="Up To"
                  placeholder="ILS"
                  shaped
                ></v-text-field>
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

              <v-col cols="8" style="padding:20px">
                <v-row
                  align="center"
                  justify="start"
                  style="font-size:16px"
                >{{ item.freeText }}</v-row>
              </v-col>

              <v-col cols="0" align-self="center">
                <v-row justify="end" style="padding:40px">
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
export default {
  name:"favorites",
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
          value: "bookedAmount",
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
      Units: [],

    };
  },
  created() {
    console.log("test");
    db.collection("Units")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data();
          console.log("DOC: ", data);
          this.unitdoc = doc.id;
          console.log(this.unitdoc);
          this.Units.push({
            id: data.unitID,
            name: data.address,
            price: data.price,
            freeText: data.details,
            bookedAmount: data.booked_count,
            image: require("../assets/unit_example.jpg")
          });
        });
        this.loading = false;
      });
  },
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
