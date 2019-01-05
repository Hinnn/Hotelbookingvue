import Api from '@/services/api'

export default {
  fetchRooms () {
    return Api().get('/rooms')
  },
  upvoteRoom (id) {
    return Api().put(`/rooms/${id}/vote`)
  },
  deleteRoom (roomNum) {
    return Api().delete(`/rooms/${roomNum}`)
  },
  fetchBooking (roomNum) {
    return Api().get(`/rooms/${roomNum}`)
  }
}
