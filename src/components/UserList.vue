<template>
	<div class="users-container">
		<nav class="user-options">
			<span class="users-count">Total users: {{users.length}}</span>
			<button type="button"
			        class="toggle"
			        v-on:click="showUsers = !showUsers"
			        v-tooltip="infoMsgShow"
			>
				{{showUsers ? 'Hide' : 'Show'}} users
			</button>
			<button type="button" class="uppercase" v-on:click="upperCase = !upperCase">
				Show users in {{upperCase ? 'lowercase' : 'uppercase'}}
			</button>
		</nav>
		<ul class="users" v-if="res" v-bind:class="{userActive: showUsers}">
			<li class="user" v-for="user in users" :key="user.id">
				<div class="user-container">
					<div class="user-info">
						<span class="user-name user-text">
							{{upperCase ? user.firstName.toUpperCase() : user.firstName}}
						</span>
						<span class="user-surname user-text">
							{{upperCase ? user.lastName.toUpperCase() : user.lastName}}
						</span>
						<span class="user-company user-text">
							{{upperCase ? user.company.toUpperCase() : user.company}}
						</span>
						<router-link :to="{name: 'UserForm', params: { id: user.id }}" class="user-profile">Open profile</router-link>
					</div>
					<img :src="user.picture" alt="image profile" class="user-img">
				</div>
				<button type="button"
				        class="copy-btn" title="copy current full name"
				        v-clipboard:copy="copyUser(user)"
				        v-clipboard:success="getReply"
				        v-clipboard:error="getError"
				>
					Copy full name
				</button>
			</li>
		</ul>
		<Loader v-else />
	</div>
</template>

<script>
	import { apiUrl } from '../uitls';
  import Loader from './Loader'
	import axios from 'axios';

  export default {
    name: "UserList",
    components: {Loader},
    data() {
      return {
	      showUsers: true,
	      infoMsgShow: 'open/close user list',
	      upperCase: false,
	      message: 'Copy these text',
        users: [],
	      res: false
      }
	  },
	  methods: {
      getReply(e) {
        alert('You just copied: ' + e.text)
      },
      getError() {
        alert('Failed to copy text')
      },
		  copyUser(user) {
        return `${user.name} ${user.surname} ${user.patronymic}`
		  }
	  },
	  mounted() {
      axios
	      .get(apiUrl)
	      .then(response => {
          this.users = response.data;
          this.res = true;
          console.log('Data for main page is here!')
	      })
	  }
  }
</script>

<style lang="scss">
	.user-options {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100px;
		justify-content: space-around;
	}
	
	.users {
		display: none;
	}
	
	.userActive {
		display: flex;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.user {
		display: flex;
		flex-direction: column;
		margin: 4px;
		padding: 4px;
		cursor: pointer;
		
		&:hover {
			box-shadow: 0 0 9px 1px lightgrey;
		}
	}
	
	.user-info {
		display: flex;
		flex-direction: column;
		padding: 8px 0;
		width: 120px;
		font-size: 14px;
	}
	
	.user-img {
		width: 120px;
		height: 120px;
	}
	
	.copy-btn {
		max-height: 25px;
		margin: 0 auto;
		cursor: pointer;
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
	}
	
	.user-profile {
		border: 1px solid #42b983;
		color: #42b983;
		padding: 4px;
		border-radius: 2em;
		font-size: 0.9em;
		margin: 5px;
		text-decoration: none;
		
		&:hover {
			color: white;
			background-color: #42b983;
		}
	}
</style>
