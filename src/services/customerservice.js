import Api from '@/services/api'

export default {
  fetchCustomers () {
    return Api().get('/customers')
  },
  SignUp (customer) {
    return Api().post('/customers/signUp', customer,
      { headers: {'Content-type': 'application/json'} })
  },
  Login (customer) {
    return Api().post('/customers/login', customer,
      { header: {'Content-type': 'application/json'} })
  },
  Logout (customer) {
    // return Api().post('/customers/logout', customer,
    // { header: {'Content-type': 'application/json'} })
  },
  fetchCustomer (customerID) {
    return Api().get(`/customers/${customerID}`)
  }
}
