<template>
	<span class="data-err" v-if="err">
		Can not create new user
	</span>
	<form class="add-user-container" v-else>
		<label class="add-user-label">
			<span class="user-add">
				Age
				<input class="input-user" type="text" v-model="userData.age">
			</span>
			<span class="user-add">
				Name
				<input class="input-user" type="text" v-model="userData.firstName">
			</span>
			<span class="user-add">
				Surname
				<input class="input-user" type="text" v-model="userData.lastName">
			</span>
			<span class="user-add">
				E-mail
				<input class="input-user" type="text" v-model="userData.email">
			</span>
			<span class="user-add">
				Company
				<input class="input-user" type="text" v-model="userData.company">
			</span>
			<span class="user-add">
				About you
				<input class="input-user" type="text" v-model="userData.about">
			</span>
			<span class="user-add">
				Address
				<input class="input-user" type="text" v-model="userData.address">
			</span>
			<span class="user-add">
				Phone
				<input class="input-user" type="text" v-model="userData.phone">
			</span>
		</label>
		<div class="actions-add">
			<button type="button" class="user-profile add" @click="addData">Add</button>
			<router-link class="user-profile back" :to="{name: 'UserList'}">Back</router-link>
		</div>
	</form>
</template>

<script>
import { apiUrl, vueImg } from '@/uitls'
import axios from '@/axios'
import NProgress from 'nprogress/nprogress'

export default {
	name: 'AddUser',
	data() {
		return {
			userData: {},
			id: 0,
			err: false
		}
	},
	mounted() {
		NProgress.start()
		this.id = this.$route.params.userLen
		NProgress.done()
	},
	methods: {
		addData() {
			this.userData.picture = vueImg

			this.postData()
		},
		postData() {
			NProgress.start()
			axios
				.post(apiUrl, this.userData)
				.then(() => {
					NProgress.done()
					this.$router.push({ name: 'UserList' })
				})
				.catch(() => (this.err = true))
		}
	}
}
</script>

<style lang='scss'>
.add-user-container {
	margin: 20px;
}

.add-user-label {
	display: flex;
	flex-direction: column;
	min-height: 250px;
	justify-content: space-around;
	width: 350px;
	margin: 0 auto;
}

.user-add {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.actions-add {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 40%;
	margin: 0 auto;
	justify-content: space-evenly;
	margin-top: 10px;
}
</style>
