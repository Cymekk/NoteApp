<template>
	<div class="modal">
		<div class="modal-body" ref="target">
			<h2>Are you sure you want to delete this note?</h2>
			<div class="buttons-box">
				<button @click="closeModal" class="button cancel">Cancel</button>
				<button @click="storeNotes.removeNote(props.noteId)" class="button delete">Remove</button>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreNotes } from '@/store/storeNotes'

const storeNotes = useStoreNotes()

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true,
	},

	noteId: {
		type: Number,
		required: true,
	},
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
	emit('update:modelValue', false)
}

const target = ref(null)
onClickOutside(target, closeModal)
</script>
<style lang="scss" scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.65);
	width: 100%;
	min-height: 100svh;

	&-body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 500px;
		min-height: 30svh;
		background-color: #ddd;
		border-radius: 10px;
		padding: 1em;

		h2 {
			font-size: 1.2rem;
			text-align: center;
		}

		.buttons-box {
			margin-top: 2em;
			display: flex;
			justify-content: center;

			.button {
				padding: 1em 2em;
				background: none;
				border: none;
				border-radius: 5px;
				font-weight: bold;
				cursor: pointer;
				transition: background-color 0.3s, color 0.3s;
			}
			.cancel {
				margin-right: 1em;
				background-color: #ffffff;
				&:hover {
					background-color: grey;
					color: #fff;
				}
			}

			.delete {
				background-color: rgb(255, 69, 69);

				&:hover {
					background-color: red;
					color: #fff;
				}
			}
		}
	}
}
</style>
