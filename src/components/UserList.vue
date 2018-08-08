<template>
	<div class='users-container'>
		<nav class='user-options'>
			<div class='user-stats'>
				<span class='users-count'>Total users: {{lengthUser}}</span>
				<button type='button'
				        class='toggle btn'
				        v-on:click='showUsers = !showUsers'
				        v-tooltip='infoMsgShow'
				>
				 {{getShowUsers}} users
				</button>
				<button type='button' class='uppercase btn' v-on:click='upperCase = !upperCase'>
					Show users in {{getUpperCase}}
				</button>
			</div>
		</nav>
		<span class='data-err' v-if='err'>Can not load profiles</span>
		<ul class='users' v-else-if='res' v-bind:class='{userActive: showUsers}'>
			<li class='user' v-for='user in users' :key='user.id'>
				<div class='user-container'>
					<div class='user-info'>
						<span class='user-name user-text'>
							{{upperCase ? user.firstName.toUpperCase() : user.firstName}}
						</span>
						<span class='user-surname user-text'>
							{{upperCase ? user.lastName.toUpperCase() : user.lastName}}
						</span>
						<span class='user-company user-text'>
							{{upperCase ? user.company.toUpperCase() : user.company}}
						</span>
						<router-link :to='{name: "UserForm", params: { id: user.id }}' class='user-profile'>Open profile</router-link>
					</div>
					<img :src='user.picture' alt='image profile' class='user-img'>
				</div>
				<button type='button'
				        class='copy-btn' title='copy current fullname'
				        v-clipboard:copy='copyUser(user)'
				        v-clipboard:success='getReply'
				        v-clipboard:error='getError'
				>
					Copy full name
				</button>
			</li>
		</ul>
		<Loader v-else />
	</div>
</template>

<script>
	import { apiUrl } from '@/uitls';
  import Loader from '@/components/Loader'
	import axios from 'axios';

  export default {
    name: 'UserList',
    components: {Loader},
    data() {
      return {
	      showUsers: true,
	      infoMsgShow: 'open/close user list',
	      upperCase: false,
	      message: 'Copy these text',
        users: [],
	      res: false,
	      err: false
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
	  computed: {
      lengthUser() {
        return this.users.length
      },
		  getShowUsers() {
        return this.showUsers ? 'Hide' : 'Show'
		  },
		  getUpperCase() {
        return this.upperCase ? 'lowercase' : 'uppercase'
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
	      .catch(() => {
	        this.err = true;
	        console.log('Oops, smth wrong!')
	      })
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
		justify-content: flex-end;
		color: white;
	}
	
	.user-stats {
		min-width: 400px;
		min-height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	
	.users {
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
	}
	
	.user-profile {
		border: 1px solid #42b983;
		color: #42b983;
		padding: 5px;
		border-radius: 2em;
		font-size: 0.9em;
		margin: 5px;
		text-decoration: none;
		
		&:hover {
			color: white;
			background-color: #42b983;
		}
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
</style>
