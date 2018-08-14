<template>
	<div class="users-container">
		<nav class="user-options">
			<router-link
				:to="{name: 'AddUser'}" class="add-user">
				+
			</router-link>
			<div class="user-stats">
				<span class="users-count">Total users: {{ lengthUser }}</span>
				<button
					type="button" class="toggle btn"
					@click="showUsers = !showUsers" v-tooltip="infoMsgShow"
				>
					{{ getShowUsers }} users
				</button>
				<button
					type="button" class="uppercase btn"
					@click="upperCase = !upperCase">Show users in {{ getUpperCase }}
				</button>
			</div>
		</nav>
		<span class="data-err" v-if="err">
			Can not load profiles
		</span>
		<Loader v-else-if="!res" />
		<div :class="{userActive: showUsers}" class="users-hidden" v-else>
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
			<button
				type="button" :disabled="pageNumber === 0"
				@click="prevPage" class="user-btn">
				Previous
			</button>
			<ul class="pages">
				<li v-for="(page, index) in totalPages" :key="page">
					<button
						class="user-btn page btnActive" v-if="index === pageNumber"
						type="button"
						@click="pageNumber = index">{{ page }}</button>
					<button
						class="user-btn page" v-else
						type="button"
						@click="pageNumber = index">{{ page }}</button>
				</li>
			</ul>
			<button
				type="button" :disabled="pageNumber >= currentCount - 1"
				@click="nextPage" class="user-btn">
				Next
			</button>
		</div>
	</div>
</template>
<script>
import axios from '@/axios'
import Loader from '@/components/Loader'
import NProgress from 'nprogress/nprogress'

export default {
	name: 'UserList',
	components: { Loader },
	data() {
		return {
			infoMsgShow: 'open/close user list',
			upperCase: false,
			message: 'Copy these text',
			users: [],
			res: false,
			err: false,
			showUsers: true,
			// for pagination
			pageNumber: 0,
			totalPages: 0,
			btnState: false,
			size: 10
		}
	},
	computed: {
		lengthUser() {
			return this.users.length
		},
		getShowUsers() {
			return this.showUsers ? 'Hide' : 'Show'
		},
		getUpperCase() {
			return this.upperCase ? 'lowercase' : 'uppercase'
		},
		// for pagination
		currentCount() {
			return this.pageCount()
		},
		paginateData() {
			const start = this.pageNumber * this.size,
				end = start + this.size

			return this.users.slice(start, end)
		}
	},
	mounted() {
		this.getUsers()
	},
	methods: {
		getUsers() {
			this.res = false
			this.err = false
			NProgress.start()
			axios
				.get('/profiles')
				.then(response => {
					this.users = response.data
					this.res = true
					this.totalPages = this.pageCount()
					NProgress.done()
				})
				.catch(() => {
					this.err = true
					NProgress.done()
				})
		},
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
				.then(() => this.getUsers())
				.catch(e => console.log(e, 'User not deleted!'))
		},
		// for pagination
		nextPage() {
			this.pageNumber++
		},
		pageCount() {
			let len = this.users.length,
				size = this.size

			return Math.ceil(len / size)
		},
		prevPage() {
			this.pageNumber--
		}
	}
}
</script>

<style lang='scss'>
.user-options {
	display: flex;
	align-items: center;
	min-height: 100px;
	background-color: #42b983;
	flex-direction: row;
	justify-content: space-between;
	color: white;
	padding: 0 40px;
}

.user-stats {
	min-width: 400px;
	min-height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 5px 10px 5px 10px;
}

.users {
	width: 100%;
	padding: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

.users-hidden {
	display: none;
}

.userActive {
	display: flex;
	align-items: center;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 10px;
}

.user {
	display: flex;
	flex-direction: column;
	margin: 7px;
	padding: 4px;
	cursor: pointer;
	position: relative;

	&:hover {
		box-shadow: 0 0 9px 1px lightgrey;

		.btn-del {
			position: absolute;
			border-radius: 49%;
			width: 30px;
			height: 30px;
			font-size: 16px;
			right: -12px;
			top: -12px;
			display: block;
			cursor: pointer;
			color: black;
			background-color: white;

			&:hover {
				color: white;
				background-color: #42b983;
			}
		}
	}
}

.btn-del {
	display: none;
}

.user-info {
	display: flex;
	flex-direction: column;
	padding: 8px 0;
	width: 120px;
	font-size: 14px;
}

.copy-btn {
	border: 1px solid #e3e3e3;
	color: black;
	font-size: 0.9em;
	text-decoration: none;
	margin: 0 auto;
	cursor: pointer;
	border-radius: 2em;
	padding: 5px 10px;

	&:hover {
		border: 1px solid black;
	}
}

.user-container {
	display: flex;
	flex-direction: row;
	padding: 5px;
}

.user-text {
	text-overflow: ellipsis;
	overflow: hidden;
	padding: 0 0 3px 0;
	white-space: nowrap;
}

.btn {
	border-radius: 2em;
	background-color: white;
	border-color: transparent;
	cursor: pointer;
	padding: 5px 10px;
	min-width: 85px;
}

.uppercase {
	min-width: 160px;
}

.add-user {
	font-size: 2em;
	border-radius: 50%;
	width: 50px;
	height: 46px;
	text-decoration: none;
	color: black;
	background-color: white;
	cursor: pointer;

	&:hover {
		color: #42b983;
	}
}

/* for pagination */

.page {
	min-width: 30px;
}

.pages {
	padding: 0 5px 0 5px;
	display: flex;
	margin: 0;
}

.btnActive {
	background-color: #42b983;
	color: white;
}
</style>
