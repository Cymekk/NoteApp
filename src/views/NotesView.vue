<template>
	<div class="wrapper">
		<button @click="addNotePopup = true">Add note</button>

		<div class="notes-container">
			<NoteComponent v-for="note in storeNotes.notes" :key="note.id" :note="note" />
		</div>

		<div v-if="!storeNotes.notesLoaded" class="indeterminate-progress-bar">
			<div class="indeterminate-progress-bar__progress"></div>
		</div>

		<p v-if="!storeNotes.notes.length" class="no-notes">No notes added. Please add new note</p>

		<NotePopupComponent
			v-if="addNotePopup"
			:title="title"
			v-model:NoteTitle="noteDetails.title"
			v-model:content="noteDetails.content"
		>
			<template #inputs>
				<label>Title</label>
				<input placeholder="Add note title" v-model="noteDetails.title" />
				<label>Description</label>
				<textarea placeholder="Add note content" v-model="noteDetails.content"></textarea>
			</template>
			<template #buttons>
				<button class="cancel" @click="closePopup">Cancel</button>
				<button @click="addNote" :disabled="!noteDetails.title || !noteDetails.content" class="save">Save</button>
			</template>
		</NotePopupComponent>
	</div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useStoreNotes } from '../store/storeNotes'
import NoteComponent from '../components/NoteComponent.vue'
import NotePopupComponent from '../components/NotePopupComponent.vue'

const storeNotes = useStoreNotes()
const addNotePopup = ref(false)
const noteDetails = reactive({
	title: '',
	content: '',
})

const title = 'Add Note'

onMounted(() => {
	storeNotes.getNotes()
})

const addNote = () => {
	storeNotes.addNote(noteDetails)
	closePopup()
}

const closePopup = () => {
	addNotePopup.value = false
	noteDetails.title = ''
	noteDetails.content = ''
}
</script>

<style lang="scss" scoped>
button {
	display: block;
	margin: 0 auto;
	padding: 1em 2em;
	background: none;
	border: none;
	background-color: var(--primary-color);
	color: var(--white-color);
	margin-bottom: 1em;
}

.cancel {
	color: #000;
}
.notes-container {
	max-width: 600px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
}

.no-notes {
	margin-top: 2em;
	display: block;
	text-align: center;
	font-size: 1.1rem;
}

.indeterminate-progress-bar {
	margin: 2em auto 0 auto;
	max-width: 600px;
	background-color: #d1d5db;
	border-radius: 9999px;
	height: 0.5rem;
	position: relative;
	overflow: hidden;
}

.indeterminate-progress-bar__progress {
	background-color: #3b82f6;
	border-radius: 9999px;
	position: absolute;
	bottom: 0;
	top: 0;
	width: 50%;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	animation-name: indeterminate-progress-bar;
}

@keyframes indeterminate-progress-bar {
	from {
		left: -50%;
	}
	to {
		left: 100%;
	}
}
</style>
