<template>
	<div class="wrapper">
		<div class="note-area edit-area">
			<textarea v-model="noteContent"></textarea>
			<div class="buttons-box">
				<button @click="router.back()" class="cancel">Cancel</button>
				<button @click="updateNote" class="save">Save</button>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStoreNotes } from '@/store/storeNotes'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const storeNotes = useStoreNotes()
const noteContent = ref('')

noteContent.value = storeNotes.getNoteContent(route.params.id)

const updateNote = () => {
	storeNotes.updateNote(route.params.id, noteContent.value)
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
