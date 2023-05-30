import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyACQsr2q0O0nnGxJSOmusY3GdEwo-1Ty5o',
	authDomain: 'noteapp-d9faf.firebaseapp.com',
	projectId: 'noteapp-d9faf',
	storageBucket: 'noteapp-d9faf.appspot.com',
	messagingSenderId: '977446085147',
	appId: '1:977446085147:web:10651cc99aadda3be90ebe',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
