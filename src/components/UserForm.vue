<template>
	<form class="profile" v-if="res">
		<div class="profile-info">
			<div class="main-info">
				<span>name: {{userData.firstName}}</span>
				<span>last name: {{userData.lastName}}</span>
				<span>company: {{userData.company}}</span>
				<span>e-mail: {{userData.email}}</span>
			</div>
			<img :src="userData.picture" alt="user image" class="user-img">
		</div>
		<p class="about-me">
			{{userData.about}}
		</p>
		<router-link :to="{name: 'UserList'}" class="user-profile">Back to main page</router-link>
	</form>
	<Loader v-else />
</template>

<script>
  import { apiUrl } from '../uitls';
  import Loader from './Loader'
  import axios from 'axios';

  export default {
    name: "UserForm",
    components: {Loader},
    data() {
      return {
        userData: [],
	      res: false
      }
	  },
	  methods: {
      postData() {
        console.log('in future!')
      }
	  },
	  mounted() {
      axios
        .get(`${apiUrl}/${this.$route.params.id}`)
        .then(response => {
          this.userData = response.data;
          this.res = true;
          console.log('Data for user is here!')
        })
	  }
  }
</script>

<style lang="scss">
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
	}
	
	.main-info {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 8px 0;
	}
</style>
