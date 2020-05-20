import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios';
import router from './router/index'

Vue.use(ElementUI)

axios.defaults.baseURL = "http://127.0.0.1:8777";

Vue.prototype.axios = axios;

new Vue({
	el: '#app',
	router: router, //可以简写router
	render: h => h(App)
})
