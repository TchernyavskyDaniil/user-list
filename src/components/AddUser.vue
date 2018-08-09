<template>
	<div class="add-user-container">
		<label class="add-user-label">
			<span class="user-add">
				Age <input class="input-user" type="text" value="Write here something!" ref="age">
			</span>
			<span class="user-add">
				Name <input class="input-user" type="text" value="Write here something!" ref="firstName">
			</span>
			<span class="user-add">
				Surname <input class="input-user" type="text" value="Write here something!" ref="lastName">
			</span>
			<span class="user-add">
				E-mail <input class="input-user" type="text" value="Write here something!" ref="email">
			</span>
			<span class="user-add">
				Company <input class="input-user" type="text" value="Write here something!" ref="company">
			</span>
			<span class="user-add">
				About you <input class="input-user" type="text" value="Write here something!" ref="about">
			</span>
			<span class="user-add">
				Address <input class="input-user" type="text" value="Write here something!" ref="address">
			</span>
			<span class="user-add">
				Phone <input class="input-user" type="text" value="Write here something!" ref="phone">
			</span>
		</label>
		<button type="button" class="user-profile add" v-on:click="addData">Add</button>
	</div>
</template>

<script>
import { apiUrl, vueImg } from '@/uitls'
import axios from 'axios'
import NProgress from 'nprogress/nprogress'

export default {
  name: 'AddUser',
  data() {
    return {
      userData: {},
      id: 0
    }
  },
  methods: {
    addData() {
      Object.keys(this.$refs).forEach(key => {
        this.userData[key] = this.$refs[key].value
      })

      this.userData.picture = vueImg

      this.postData()
    },
    postData() {
      NProgress.start()
      axios.post(apiUrl, this.userData).then(() => {
        NProgress.done()
        console.log('User added!')
        this.$router.push({ name: 'UserList' })
      })
    }
  },
  mounted() {
    this.id = this.$route.params.userLen
  }
}
</script>

<style lang="scss">
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

.add {
  min-width: 80px;
  margin: 20px;
}
</style>
