<template>
	<NavbarComponent />
	<router-view />
</template>

<script setup>
import NavbarComponent from './components/NavbarComponent.vue'
import { useStoreAuth } from './store/storeAuth'
import { onMounted } from 'vue'

const storeAuth = useStoreAuth()

onMounted(() => {
	storeAuth.init()
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

*,
*::after,
*::before {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body {
	font-size: 62.5%;
	font-family: 'Roboto', sans-serif;
	background-color: #d6d6d6;
}

.wrapper {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2em;
}

.note-area {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	max-width: 600px;
	margin: 0 auto;
	padding: 1em;
	background-color: rgb(1, 94, 1);
	border-radius: 10px;

	textarea {
		padding: 5px;
		width: 100%;
		height: 100px;
		max-width: 100%;
		border-radius: 10px;
	}

	button {
		padding: 1em;
		margin-top: 1em;
		width: 25%;
		background-color: rgb(21, 167, 21);
		border: none;
		border-radius: 10px;
		color: #fff;
		font-weight: bold;
		cursor: pointer;

		&:disabled {
			opacity: 0.5;
			cursor: default;
		}
	}
}
</style>
