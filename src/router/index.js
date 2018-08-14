import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'UserList',
			component: () => import('@/components/UserList')
		},
		{
			path: '/user/:id',
			name: 'UserForm',
			component: () => import('@/components/UserForm'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/addUser',
			name: 'AddUser',
			component: () => import('@/components/AddUser'),
			meta: {
				requiresAuth: true
			}
		}
	]
})

// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(record => record.meta.requiresAuth)) {
// 		// этот путь требует авторизации, проверяем залогинен ли
// 		// пользователь, и если нет, перенаправляем на страницу логина
// 		if (!auth.loggedIn()) {
// 			next({
// 				path: '/login',
// 				query: { redirect: to.fullPath }
// 			})
// 		} else {
// 			next()
// 		}
// 	} else {
// 		next() // всегда так или иначе нужно вызвать next()!
// 	}
// })

export default router
