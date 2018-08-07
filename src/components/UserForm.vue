<template>
	<form class="profile" v-if="res">
		<div class="profile-info">
			<span>name: {{userData.firstName}}</span>
			<span>last name: {{userData.lastName}}</span>
			<span>company: {{userData.company}}</span>
		</div>
		<img :src="userData.picture" alt="">
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
	}
	
	.profile-info {
		display: flex;
		flex-direction: column;
		min-height: 100px;
		justify-content: space-around;
	}
</style>
