import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import message from '../components/message.vue'
import index from '../components/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [{
		name: "index",
		path: '/',
		component: index
	}, {
		name: "login",
		path: '/login',
		component: login
	}, {
		name: "message",
		path: '/message',
		component: message
	}]
})

export default router;
