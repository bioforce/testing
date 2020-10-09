import Vue from 'vue'

window.axios = require('axios');

window.axios.defaults.withCredentials = true;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.component('app-list', require('./components/List.vue').default);

new Vue({
    data() {
        return {
        }
    },
    el: '#app'
});
