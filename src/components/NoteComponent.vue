<template>
	<div class="note">
		<div class="buttons-box">
			<router-link :to="`/edit/${props.note.id}`"><button class="edit"></button></router-link>
			<button @click="modals.deleteNote = true" class="remove"></button>
		</div>

		<div class="text">{{ props.note.content }}</div>

		<span class="date">{{ formatted }}</span>
		<RemoveNoteModal v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="props.note.id" />
	</div>
</template>
<script setup>
import { defineProps, reactive } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { useStoreNotes } from '@/store/storeNotes'
import RemoveNoteModal from './RemoveNoteModal.vue'

const props = defineProps({
	note: {
		type: Object,
		required: true,
	},
})

const storeNotes = useStoreNotes()

const formatted = useDateFormat(storeNotes.notes.date, 'YYYY-MM-DD')

const modals = reactive({
	deleteNote: false,
})
</script>
<style lang="scss" scoped>
.note {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 45%;
	margin: 1em 0;
	padding: 1em;
	border-radius: 10px;
	background-color: #cecece;
	font-size: 1rem;
	text-align: justify;
	box-shadow: 0px 0px 10px rgb(0, 0, 0);

	.buttons-box {
		text-align: right;
		margin-bottom: 1em;

		button {
			width: 20px;
			height: 20px;
			background: none;
			border: none;
			background-repeat: no-repeat;
			background-position: center;
			cursor: pointer;

			&:last-child {
				margin-left: 1em;
			}
		}

		.edit {
			background-image: url('../assets/edit-3.svg');
		}

		.remove {
			background-image: url('../assets/x\ \(1\).svg');
		}
	}

	.text {
		overflow: hidden;
	}

	.date {
		display: block;
		text-align: right;
		margin-top: 1em;
		font-size: 0.8rem;
		color: #505050;
	}
}
</style>
