<template>
	<navbar class="navbar">
		<div class="logo">
			<i class="fa-regular fa-note-sticky"></i>
			<h1>NoteApp</h1>
		</div>

		<button v-if="storeAuth.user.id" @click="storeAuth.logoutUser">Logout {{ storeAuth.user.email }}</button>
	</navbar>
</template>
<script setup>
import { useStoreAuth } from '@/store/storeAuth'

const storeAuth = useStoreAuth()
</script>
<style lang="scss">
.navbar {
	display: block;
	background-color: rgb(0, 97, 29);
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1em;

	.logo {
		display: flex;
		align-items: center;
		i {
			color: #fff;
			font-size: 2rem;
		}

		h1 {
			color: #fff;
			font-size: 1.2rem;
			margin-left: 0.25em;
		}
	}

	button{
		background: none;
		border: none;
		color: #fff;
		padding: 0.5em;
		border: 1px solid #fff;
		border-radius: 5px;
		cursor: pointer;
	}
}

.mobile-nav {
	background-color: tomato;
	position: absolute;
	padding: 5px;
	width: 100%;

	a {
		font-size: 1rem;
		text-decoration: none;
		color: #fff;
	}
}
</style>
