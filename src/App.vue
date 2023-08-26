<template>
	<NavbarComponent />
	<router-view />
</template>

<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
import { useStoreAuth } from './store/storeAuth'
import { onMounted } from 'vue'

const storeAuth = useStoreAuth()

onMounted(() => {
	storeAuth.init()
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
	--background-color: rgb(214, 214, 214);
	--primary-color: rgb(0, 97, 29);
	--secondary-color: rgb(110, 170, 94);
	--white-color: rgb(255, 255, 255);
	--black-color: rgb(0, 0, 0);
	--lightgrey-color: rgb(109, 109, 109);
	--redprimary-color: rgb(255, 69, 69);
	--redsecondary-color: rgb(255, 0, 0);
}

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
	background-color: var(--background-color);
}

.wrapper {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2em;
}

button {
	border-radius: 10px;
	cursor: pointer;
	font-weight: bold;
}
</style>
