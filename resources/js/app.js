/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform' //this is for back end validation using vform
import moment from 'moment'   //this is for readable date
import VueProgressBar from 'vue-progressbar'
import { saveAs } from 'file-saver'

window.Fire = new Vue();
window.FileSaver = saveAs;

/**sweet alert2 start */
import Swal from 'sweetalert2'
window.swal = Swal;
const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.toast = Toast;
/** sweet alert2 end */

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)


import VueRouter from 'vue-router'
Vue.use(VueRouter)
let routes = [
    { 
        path: '/dashboard', 
        component: require('./components/Dashboard.vue').default 
    },

    { 
        path: '/profile', 
        component: require('./components/Profile.vue').default
    },

    { 
        path: '/users', 
        component: require('./components/Users.vue').default
    },
    
  ]

  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })



  const options = {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    thickness: '3px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }  
  Vue.use(VueProgressBar, options)
//end progress bar


  Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
  });

  Vue.filter('createdDate',function(myDate){
      return moment(myDate).format('MMMM Do YYYY');
  })
  

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});

