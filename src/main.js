import Vue from 'vue'
import App from './App'
import router from './router'
import './tooltip.css'
import VueClipboard from 'vue-clipboard2'
import VTooltip from 'v-tooltip'

Vue.use(VueClipboard)
Vue.use(VTooltip)

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
