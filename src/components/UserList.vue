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
		<ul class="users" v-bind:class="{userActive: showUsers}">
			<li class="user" v-for="user in users" :key="user.id">
				<div class="user-container">
					<div class="user-info">
						<span class="user-name user-text">
							{{upperCase ? user.name.toUpperCase() : user.name}}
						</span>
						<span class="user-surname user-text">
							{{upperCase ? user.surname.toUpperCase() : user.surname}}
						</span>
						<span class="user-patronymic user-text">
							{{upperCase ? user.patronymic.toUpperCase() : user.patronymic}}
						</span>
						<router-link :to="{name: 'UserForm', params: { id: user.id, userData: user }}">click</router-link>
					</div>
					<img :src="user.img || defaultImg" alt="image profile" class="user-img">
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
	</div>
</template>

<script>
	import defaultImg from '@/assets/defImg.png';

  export default {
    name: "UserList",
	  data() {
      return {
        defaultImg: defaultImg,
	      showUsers: true,
	      infoMsgShow: 'open/close user list',
	      upperCase: false,
	      message: 'Copy these text',
        users: [
	        {
	          id: 1,
		        name: 'Daniil',
		        surname: 'Tchernyavsky',
            patronymic: 'Ivanovich',
		        img: ''
	        },
          {
            id: 2,
            name: 'Mark',
            surname: 'Strahov',
            patronymic: 'Mihailovich',
            img: ''
          },
          {
            id: 3,
            name: 'Denis',
            surname: 'Adnerson',
            patronymic: 'Kekovich',
            img: ''
          },
          {
            id: 4,
            name: 'Darya',
            surname: 'Karpenko',
            patronymic: 'Ivanovna',
            img: ''
          },
          {
            id: 5,
            name: 'Max',
            surname: 'Petukhov',
            patronymic: 'Ivanovich',
            img: ''
          }
        ]
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
	}
	
	.user-container {
		display: flex;
		flex-direction: row;
	}
	
	.user-text {
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
