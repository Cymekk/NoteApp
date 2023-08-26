<template>
	<div class="note">
		<div class="title-bar">
			<div class="title">{{ props.note.title }}</div>

			<div class="buttons-box">
				<router-link :to="`/edit/${props.note.id}`"><button class="edit"></button></router-link>
				<button @click="modals.deleteNote = true" class="remove"></button>
			</div>
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

const formatted = useDateFormat(props.note.date, 'YYYY-MM-DD')

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
	border-radius: 10px;
	background-color: var(--secondary-color);
	font-size: 1rem;
	text-align: justify;
	overflow: hidden;

	.title-bar {
		padding: 0.5em 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #000;
		margin-bottom: 1em;
		background-color: var(--primary-color);
		.title {
			width: 50%;
			text-align: center;
			font-size: 1.2rem;
			color: var(--white-color);
		}
		.buttons-box {
			width: 40%;
			text-align: right;

			button {
				width: 20px;
				height: 20px;
				background: none;
				border: none;
				background-repeat: no-repeat;
				background-position: center;
				cursor: pointer;
				padding: 5px;

			}

			.edit {
				background-image: url('../assets/edit-3.svg');
			}

			.remove {
				background-image: url('../assets/x\ \(1\).svg');
			}
		}
	}

	.text {
		padding: 0.5em;
	}

	.date {
		padding: 0.5em;
		display: block;
		text-align: right;
		margin-top: 1em;
		font-size: 0.8rem;
		color: #505050;
	}
}
</style>
