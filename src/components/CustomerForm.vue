<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Input customerID</label>
      <input class="form__input" type="decimal" v-model.trim="customerID"/>
    </div>
    <div class="form-group">
      <label class="form-label">Input email</label>
      <input class="form__input" type="string" v-model.trim="email"/>
    </div>
    <div class="form-group">
      <label class="form-label">Input password </label>
      <input class="form__input" type="string" v-model.trim="password">
    </div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ CustomerBtnTitle }}</button>
    </p>
    <p>
      <a href="#/customerActions" class="btn btn-primary btn1" role="button">CustomerInformation</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Booking!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">booking...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, between } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['bookingBtnTitle', 'booking'],
  data () {
    return {
      messagetitle: 'Book',
      customerID: this.booking.customerID,
      paymenttype: this.booking.paymenttype,
      date: this.booking.date,
      amount: this.booking.amount,
      roomNum: this.booking.roomNum,
      submitStatus: null
    }
  },
  validations: {
    /* message: {
        required,
        minLength: minLength(5)
      }, */
    amount: {
      required,
      between: between(1, 3)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var booking = {
            customerID: this.customerID,
            paymenttype: this.paymenttype,
            date: this.date,
            amount: this.amount,
            roomNum: this.roomNum
          }
          this.booking = booking
          console.log('Submitting in BookingForm : ' +
              JSON.stringify(this.booking, null, 5))
          this.$emit('booking-is-created-updated', this.booking)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .book-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
