<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <table align="center">
      <tr>
        <td>
          <p><b><i> Have known the room details? Click <a href ="#/customerLogin">here</a> to login and book your room !</i></b></p>
          <p><b><i> Not the registered customer? Click <a href ="#/SignUp">here</a> to register!</i></b></p>
          <p><b><i> If you have logged in, click <a href ="#/book">here</a> to go to book your room !</i></b></p>
        </td>
      </tr>
    </table>
    <div id="app1">
      <v-client-table :columns="columns" :data="rooms" :options="options">
        <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upvote(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteRoom(props.row.roomNum)"></a>
      </v-client-table>
    </div>
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
      rooms: [],
      props: ['roomNum'],
      errors: [],
      columns: ['roomNum', 'type', 'price', 'upvotes', 'upvote'],
      options: {
        perPage: 10,
        filterable: ['roomNum', 'type', 'price'],
        sortable: ['upvotes'],
        headings: {
          roomNum: 'roomNum',
          type: 'Type',
          price: 'price',
          upvotes: 'Upvotes'
        }
      }
    }
  },
  // Fetches Donations when the component is created.
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
    },
    upvote: function (id) {
      RoomService.upvoteRoom(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadRooms()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    // Fetches Bookings when the component is created
    deleteRoom: function (roomNum) {
      this.$swal({
        title: 'Are you totally sure:',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          RoomService.deleteRoom(roomNum)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadRooms()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Room ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('EREOR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log(' SWAL Else Result: ' + result.value)
          this.$swal('Cancelled', 'This room Still Exist!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
