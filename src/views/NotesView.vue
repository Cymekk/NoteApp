<template>
	<div class="wrapper">
		<div class="note-area">
			<textarea placeholder="Type something..." v-model="content"> </textarea>
			<button @click="addNote" :disabled="!content">Add note</button>
		</div>

		<div class="notes-container">
			<NoteComponent v-for="note in storeNotes.notes" :key="note.id" :note="note" />
		</div>

		<div v-if="!storeNotes.notesLoaded" class="indeterminate-progress-bar">
			<div class="indeterminate-progress-bar__progress"></div>
		</div>

		<p v-if="!storeNotes.notes.length" class="no-notes">No notes added. Please add new note</p>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useStoreNotes } from '../store/storeNotes'
import NoteComponent from '../components/NoteComponent.vue'

const content = ref('')
const storeNotes = useStoreNotes()

const addNote = () => {
	storeNotes.addNote(content.value)
	content.value = ''
}

onMounted(() => {
	storeNotes.getNotes()
})
</script>

<style lang="scss">
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
