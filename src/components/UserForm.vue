<template>
	<div v-if="err" class="data-err">
		<span>Can not load data!</span>
		<router-link
			:to="{name: 'UserList'}"
			class="user-profile err">Back to main page</router-link>
	</div>
	<Loader v-else-if="!res" />
	<form class="profile" v-else>
		<div class="profile-info">
			<div class="main-info">
				<label class="label-user">
					name:
					<input class="input-user" type="text" v-model="userData.firstName">
				</label>
				<label class="label-user">
					last name:
					<input class="input-user" type="text" v-model="userData.lastName">
				</label>
				<label class="label-user">
					company:
					<input class="input-user" type="text" v-model="userData.company">
				</label>
				<label class="label-user">
					e-mail:
					<input class="input-user" type="text" v-model="userData.email">
				</label>
			</div>
			<img :src="userData.picture" alt="user image" class="user-img">
		</div>
		<label class="about-user">
			<textarea class="about-user-inpt" v-model="userData.about">Some here</textarea>
		</label>
		<div class="actions-profile">
			<router-link :to="{name: 'UserList'}" class="user-profile">Back to main page</router-link>
			<button type="button" @click="getNewOptions" class="user-profile update">Update user info</button>
		</div>
	</form>
	
</template>

<script>
import { apiUrl } from '@/uitls'
import Loader from '@/components/Loader'
import axios from '@/axios'
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
	computed: {
		userId() {
			return this.$route.params.id
		}
	},
	mounted() {
		this.getUser()
	},
	methods: {
		getNewOptions() {
			this.postData()
		},
		postData() {
			axios
				.patch(`${apiUrl}/${this.userId}`, this.userData)
				.then(() => {
					this.getUser()
				})
				.catch(() => (this.err = true))
		},
		getUser() {
			NProgress.start()
			this.res = false
			this.err = false
			axios
				.get(`${apiUrl}/${this.userId}`)
				.then(response => {
					this.userData = response.data
					this.res = true
					NProgress.done()
				})
				.catch(() => {
					this.err = true
					NProgress.done()
				})
		}
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
