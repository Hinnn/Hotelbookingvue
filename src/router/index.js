import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Bookings from '@/components/Bookings'
import Book from '@/components/Book'
import Room from '@/components/Room'
import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import Logout from '@/components/Logout'
import SignUp from '@/components/SignUp'
import GoogleMap from '@/components/GoogleMap'
import Edit from '@/components/Edit'
import Rooms from '@/components/Rooms'
import adminLogin from '@/components/adminLogin'
import customerLogin from '@/components/customerLogin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: Bookings
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    },
    {
      path: '/rooms',
      name: 'Rooms',
      component: Rooms
    },
    {
      path: '/map',
      name: 'Map',
      component: GoogleMap
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/customerLogin',
      name: 'customerLogin',
      component: customerLogin
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
