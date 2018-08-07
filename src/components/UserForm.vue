<template>
	<form class="user-info">
		<span>{{userData.name}}</span>
		<span>{{userData.surname}}</span>
		<span>{{userData.patronymic}}</span>
		<img :src="userData.img || defImg" alt="">
		<router-link :to="{name: 'UserList'}">Back to main page</router-link>
	</form>
</template>

<script>
  import defaultImg from '@/assets/defImg.png';

  export default {
    name: "UserForm",
	  data() {
      return {
        userData: [],
	      defImg: defaultImg
      }
	  },
	  mounted() {
      this.userData = this.$route.params.userData
	  }
  }
</script>

<style scoped>

</style>
