import { defineStore } from 'pinia'
import { db } from '../firebase/index'
import { useStoreAuth } from './storeAuth'
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc, orderBy, addDoc } from 'firebase/firestore'

let notesCollectionRef
let notesCollectionQuery
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
	state: () => {
		return {
			notes: [
				// {
				// 	id: 'id1',
				// 	content:
				// 		'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, eius nostrum impedit quidem quisquam architecto',
				// },
				// {
				// 	id: 'id2',
				// 	content: 'This is a shor note',
				// },
			],

			notesLoaded: false,
		}
	},

	actions: {
		init() {
			const storeAuth = useStoreAuth()
			notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
			notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
			this.getNotes()
		},

		async getNotes() {
			const q = notesCollectionQuery

			getNotesSnapshot = onSnapshot(
				q,
				querySnapshot => {
					let notes = []
					querySnapshot.forEach(doc => {
						let note = {
							id: doc.id,
							content: doc.data().content,
							date: doc.data().date,
						}
						notes.push(note)
					})
					this.notes = notes
					this.notesLoaded = true
				},
				error => {
					console.log('error: ', error.message)
				}
			)
		},

		clearNotes() {
			this.notes = []
			if (getNotesSnapshot) getNotesSnapshot() // unsubcribe from an active listener
		},

		async addNote(newNoteContent) {
			let currentDate = new Date().getTime(),
				date = currentDate.toString()

			await addDoc(notesCollectionRef, {
				content: newNoteContent,
				date,
			})
		},

		async removeNote(idToDelete) {
			await deleteDoc(doc(notesCollectionRef, idToDelete))
		},

		async updateNote(id, content) {
			await updateDoc(doc(notesCollectionRef, id), {
				content,
			})
		},
	},

	getters: {
		getNoteContent: state => {
			return id => {
				return state.notes.filter(note => note.id === id)[0].content
			}
		},

		totalNotesCount: state => {
			return state.notes.length
		},

		totalCharactersCount: state => {
			let count = 0
			state.notes.forEach(note => {
				count += note.content.length
			})
			return count
		},
	},
})
