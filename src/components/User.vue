<template>
	<ul class="users">
		<li
			class="user" v-for="user in paginateData"
			:key="user.id">
			<button
				type="button" class="btn-del"
				@click="delUser(user.id)">X</button>
			<div class="user-container">
				<div class="user-info">
					<span class="user-name user-text">
						{{ upperCase ? user.firstName.toUpperCase() : user.firstName }}
					</span>
					<span class="user-surname user-text">
						{{ upperCase ? user.lastName.toUpperCase() : user.lastName }}
					</span>
					<span class="user-company user-text">
						{{ upperCase ? user.company.toUpperCase() : user.company }}
					</span>
					<router-link
						:to="{name: 'UserForm', params: { id: user.id }}"
						class="user-btn">Edit profile</router-link>
				</div>
				<img
					:src="user.picture" alt="image profile"
					class="user-img">
			</div>
			<button
				type="button"
				class="copy-btn" title="copy current fullname"
				v-clipboard:copy="copyUser(user)"
				v-clipboard:success="getReply"
				v-clipboard:error="getError"
			>
				Copy full name
			</button>
		</li>
	</ul>
</template>

<script>
import axios from '@/axios'

export default {
	name: 'User',
	props: {
		paginateData: {
			type: Array,
			required: true
		},
		upperCase: {
			type: Boolean,
			required: true
		},
		users: {
			type: Array,
			required: true
		}
	},
	data() {
		return {}
	},
	methods: {
		copyUser(user) {
			return `${user.firstName} ${user.lastName} ${user.company}`
		},
		getReply(e) {
			alert('You just copied: ' + e.text)
		},
		getError() {
			alert('Failed to copy text')
		},
		delUser(id) {
			axios
				.delete(`/profiles/${id}`)
				.then(() => (this.users[id] = null))
				.catch(e => console.log(e, 'User not deleted!'))
		}
	}
}
</script>

<style>
</style>
