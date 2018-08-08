import Vue from 'vue'
import Router from 'vue-router'
import UserForm from '../components/UserForm'
import UserList from '../components/UserList'

Vue.use(Router)

const index = new Router({
  routes: [
    {
      path: '/',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/:id',
      name: 'UserForm',
      component: UserForm
    }
  ]
})

export default index
