<template>
	<NotePopupComponent :title="title" v-model:noteTitle="noteDetails.title" v-model:content="noteDetails.content">
		<template #inputs>
			<label>Title</label>
			<input placeholder="Add note title" v-model="noteDetails.title" />
			<label>Description</label>
			<textarea placeholder="Add note content" v-model="noteDetails.content"></textarea>
		</template>
		<template #buttons>
			<button @click="router.back()" class="cancel">Cancel</button>
			<button @click="updateNote" :disabled="!noteDetails.title || !noteDetails.content" class="save">Save</button>
		</template>
	</NotePopupComponent>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStoreNotes } from '@/store/storeNotes'
import { ref, reactive } from 'vue'
import NotePopupComponent from '@/components/NotePopupComponent.vue'

const route = useRoute()
const router = useRouter()
const storeNotes = useStoreNotes()

const title = 'Edit Note'

const noteDetails = reactive({
	title: storeNotes.getNoteContent(route.params.id).title,
	content: storeNotes.getNoteContent(route.params.id).content,
})

const updateNote = () => {
	storeNotes.updateNote(route.params.id, noteDetails)
	router.back()
}
</script>
<style lang="scss">
.edit-area {
	background-color: royalblue;

	.buttons-box {
		display: flex;
		justify-content: flex-end;
		width: 100%;

		.cancel {
			background-color: rgb(49, 199, 49);
		}

		.save {
			margin-left: 1em;
			background-color: rgb(31, 57, 204);
		}
	}
}
</style>
