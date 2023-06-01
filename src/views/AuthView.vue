<template>
	<div class="auth">
		<div class="login-and-register">
			<button @click.prevent="register = false" :class="{ active: !register }">Login</button>
			<button @click.prevent="register = true" :class="{ active: register }">Register</button>
		</div>

		<div class="login-register-box">
			<h2>{{ title }}</h2>
			<input type="email" v-model="credentials.email" placeholder="Type your email" />
			<input type="password" v-model="credentials.password" placeholder="Type your password" />
			<button :disabled="!credentials.email || !credentials.password" @click="loginOrRegister">
				{{ title }}
			</button>

			<p v-if="storeAuth.errorMessage" class="error">{{ storeAuth.errorMessage }}</p>
		</div>
	</div>
</template>
<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStoreAuth } from '@/store/storeAuth'

const storeAuth = useStoreAuth()

const register = ref(false)
const title = computed(() => {
	return register.value ? 'Register' : 'Login'
})

const credentials = reactive({
	email: '',
	password: '',
})

const loginOrRegister = () => {
	if (!credentials.email || !credentials.password) {
		alert('Please enter e-mail and password')
	} else {
		if (register.value) {
			storeAuth.registerUser(credentials)
		} else {
			storeAuth.loginUser(credentials)
		}
	}
}

onMounted(() => {
	document.addEventListener('keyup', e => {
		if (e.key === 'Enter') {
			loginOrRegister()
		}
	})
})
</script>

<style lang="scss">
.auth {
	margin-top: 2em;

	.login-and-register {
		display: flex;
		flex-direction: row;
		justify-content: center;
		max-width: 1024px;
		margin: 0 auto;
		border-bottom: 1px solid rgb(177, 177, 177);

		button {
			border: none;
			background: none;
			padding: 1em;
			padding-bottom: 0.5em;
			font-size: 1rem;
			cursor: pointer;
			font-weight: bold;
			border-radius: 0;
		}

		.active {
			border-bottom: 1px solid #000;
		}
	}

	.login-register-box {
		max-width: 400px;
		margin: 4em auto 0 auto;
		padding: 2em;
		border-radius: 10px;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: column;
		align-items: center;

		h2 {
			font-size: 1.2rem;
		}

		input {
			width: 60%;
			padding: 0.5em;
			margin-top: 2em;
			border: none;
			background: none;
			border-bottom: 1px solid #000;

			&:focus {
				outline: none;
			}
		}

		button {
			margin-top: 2em;
			padding: 1em 2em;
			background: none;
			border: none;
			background-color: rgb(49, 199, 49);
			border-radius: 5px;
			font-weight: bold;
			cursor: pointer;

			&:disabled {
				cursor: default;
				background-color: lightgray;
			}
		}

		.error {
			margin-top: 1em;
			font-size: 1rem;
			color: red;
			font-weight: bold;
			text-align: center;
		}
	}
}
</style>
