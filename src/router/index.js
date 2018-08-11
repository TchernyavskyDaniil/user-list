import Vue from 'vue'
import Router from 'vue-router'
import UserForm from '@/components/UserForm'
import UserList from '@/components/UserList'
import AddUser from '@/components/AddUser'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'UserList',
			component: UserList
		},
		{
			path: '/user/:id',
			name: 'UserForm',
			component: UserForm
		},
		{
			path: '/addUser',
			name: 'AddUser',
			component: AddUser
		}
	]
})

export default router
