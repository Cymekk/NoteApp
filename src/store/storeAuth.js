import { defineStore } from 'pinia'
import { auth } from '../firebase/index'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useStoreNotes } from './storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
	state: () => {
		return {
			user: {},
			errorMessage: '',
		}
	},

	actions: {
		init() {
			const storeNotes = useStoreNotes()
			onAuthStateChanged(auth, user => {
				if (user) {
					this.user.id = user.uid
					this.user.email = user.email
					this.router.push('/')
					storeNotes.init()
				} else {
					this.user = {}
					this.router.replace('/auth')
					storeNotes.clearNotes()
				}
			})
		},
		registerUser(credentials) {
			createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
				.then(userCredential => {
					const user = userCredential.user
					this.errorMessage = ''
				})
				.catch(error => {
					this.errorMessage = 'Invalid email or password(password minimum length is 6 characters)'
				})
		},

		loginUser(credentials) {
			signInWithEmailAndPassword(auth, credentials.email, credentials.password)
				.then(userCredential => {
					const user = userCredential.user
					this.errorMessage = ''
				})
				.catch(error => {
					this.errorMessage = 'Invalid email or password'
				})
		},

		logoutUser() {
			signOut(auth)
				.then(() => {})
				.catch(error => {})
		},
	},

	getters: {},
})
