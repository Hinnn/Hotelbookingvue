import Api from '@/services/api'

export default {
  fetchCustomers () {
    return Api().get('/admin')
  },
  Login (admin) {
    return Api().post('/admin/login', admin,
      { header: {'Content-type': 'application/json'} })
  },
  Logout (admin) {
    // return Api().post('/customers/logout', customer,
    // { header: {'Content-type': 'application/json'} })
  },
  fetchCustomer (adminID) {
    return Api().get(`/admin/${adminID}`)
  }
}
