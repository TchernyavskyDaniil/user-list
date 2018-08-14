<template>
	<div :class="{userActive: showUsers}" class="users-hidden">
		<user :paginate-data="paginateData" :upper-case="upperCase" :users="users" />
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
</template>

<script>
import User from '@/components/User'

export default {
	name: 'Pagination',
	components: { User },
	props: {
		users: {
			type: Array,
			required: true
		},
		size: {
			type: Number,
			required: false,
			default: 10
		},
		upperCase: {
			type: Boolean,
			required: true
		},
		showUsers: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			pageNumber: 0,
			totalPages: 0,
			btnState: false
		}
	},
	computed: {
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
		this.totalPages = this.pageCount()
	},
	methods: {
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

<style lang="scss">
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
