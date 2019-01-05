<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <table align="center">
      <div id="app1">
        <v-client-table :columns="columns" :data="rooms" :options="options">
        </v-client-table>
      </div>
    <tr>
      <td>
        <p class="lead"><b><i>The photos of rooms are as following. </i></b>
        <p class="lead"><b><i>For more details </i></b>
        <p>Just click <a href ="#/rooms">here</a> to the room list page</p>
      </td>
    </tr>
      <tr>
        <img src="../assets/004.jpg" width = "700" height = "500" alt="description here"/>
        <img src="../assets/005.jpg" width = "700" height = "500" alt="description here"/>
      </tr>

    </table>
  </div>
</template>
<script>
import RoomService from '@/services/RoomService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Rooms',
  data () {
    return {
      messagetitle: ' Rooms List ',
      bookings: [],
      props: ['rooms'],
      errors: [],
      columns: ['roomNum', 'type', 'price'],
      options: {
        perPage: 10,
        filterable: ['price', 'type', 'roomNum'],
        headings: {
          roomNum: 'roomNum',
          type: 'type',
          price: 'price'
        }
      }
    }
  },
  // Fetches Bookings when the component is created.
  created () {
    this.loadRooms()
  },
  methods: {
    loadRooms: function () {
      RoomService.fetchRooms()
        .then(response => {
          // JSON responses are automatically parsed.
          this.rooms = response.data
          console.log(this.rooms)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
