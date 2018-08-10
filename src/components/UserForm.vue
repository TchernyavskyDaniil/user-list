<template>
	<div v-if='err' class='data-err'>
		<span>Can not load data!</span>
		<router-link :to='{name: "UserList"}' class='user-profile err'>Back to main page</router-link>
	</div>
	<form class='profile' v-else-if='res'>
		<div class='profile-info'>
			<div class='main-info'>
				<label class="label-user">name: <input class="input-user" type="text" :value="userData.firstName" ref="firstName"></label>
				<label class="label-user">last name: <input class="input-user" type="text" :value="userData.lastName" ref="lastName"></label>
				<label class="label-user">company: <input class="input-user" type="text" :value="userData.company" ref="company"></label>
				<label class="label-user">e-mail: <input class="input-user" type="text" :value="userData.email" ref="email"></label>
			</div>
			<img :src='userData.picture' alt='user image' class='user-img'>
		</div>
		<label class="about-user">
			<textarea class="about-user-inpt" :value="userData.about" ref="about">{{userData.about}}</textarea>
		</label>
		<div class="actions-profile">
			<router-link :to='{name: "UserList"}' class='user-profile'>Back to main page</router-link>
			<button type="button" v-on:click="getNewOptions" class="user-profile update">Update user info</button>
		</div>
	</form>
	<Loader v-else />
</template>

<script>
import { apiUrl } from '@/uitls'
import Loader from '@/components/Loader'
import { instance as axios } from '@/axios'
import NProgress from 'nprogress/nprogress'

export default {
	name: 'UserForm',
	components: { Loader },
	data() {
		return {
			userData: [],
			currentName: '',
			res: false,
			err: false
		}
	},
	methods: {
		getNewOptions() {
			Object.keys(this.userData).forEach(key => {
				if (this.$refs[key]) {
					this.userData[key] = this.$refs[key].value
				}
			})

			console.log('New data saved!')

			this.postData()
		},
		postData() {
			axios
				.patch(`${apiUrl}/${this.$route.params.id}`, this.userData)
				.then(() => {
					console.log('Data is updated!')
					this.getUser()
				})
				.catch(e => console.log(e))
		},
		getUser() {
			NProgress.start()
			this.res = false
			this.err = false
			axios
				.get(`${apiUrl}/${this.$route.params.id}`)
				.then(response => {
					this.userData = response.data
					this.res = true
					console.log('Data for user is here!')
					NProgress.done()
				})
				.catch(() => {
					this.err = true
					console.log('Oops, smth wrong!')
					NProgress.done()
				})
		}
	},
	mounted() {
		this.getUser()
	}
}
</script>

<style lang='scss'>
.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 500px;
	margin: 0 auto;
}

.profile-info {
	display: flex;
	flex-direction: row;
	min-height: 100px;
	justify-content: space-around;
	min-width: 500px;
}

.main-info {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 8px 0;
	min-width: 300px;
}

.data-err {
	display: flex;
	flex-direction: column;
	margin: 100px;
	font-size: 2em;
}

.err {
	max-width: 200px;
	margin: 0 auto;
	font-size: 20px;
	margin-top: 10px;
}

.actions-profile {
	display: flex;
	flex-direction: row;
	min-width: 400px;
	justify-content: space-evenly;
}

.input-user {
	border: none;
	border-bottom: 1px solid #42b983;
	display: inline-block;
	padding: 3px;
	overflow: hidden;
	min-width: 180px;
	text-overflow: ellipsis;
}

.label-user {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.about-user {
	min-height: 200px;
	width: 100%;
}

.about-user-inpt {
	width: 100%;
	min-height: 200px;
	border-radius: 10px;
	border-color: lightgray;
	padding: 10px;
}
</style>
