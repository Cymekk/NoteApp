<template>
	<div class="popup">
		<div class="popup-body">
			<h2 class="title">{{ props.title }}</h2>
			<slot name="inputs"></slot>

			<div class="buttons-box">
				<slot name="buttons"></slot>
			</div>
		</div>
	</div>
</template>
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
	title: {
		type: String,
	},
})
</script>
<style lang="scss">
.popup {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100svh;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;

	&-body {
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--background-color);
		width: 80%;
		min-height: 30svh;
		margin: 0 auto;
		border-radius: 10px;

		.title {
			text-align: center;
			font-size: 1.2rem;
		}

		label {
			margin-top: 1em;
			font-weight: bold;
			font-size: 1rem;
			max-width: 80%;
			min-width: 80%;
		}

		input,
		textarea {
			margin-top: 1em;
			padding: 5px 0;
			max-width: 80%;
			min-width: 80%;
			background: none;
			border: none;
			outline: none;
			border-bottom: 1px solid #000;
		}

		.buttons-box {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			margin-top: 2em;

			button {
				padding: 1em;
				border: none;
				transition: background-color 0.3s, color 0.3s;
			}

			.cancel {
				background-color: var(--white-color);

				&:hover {
					background-color: var(--lightgrey-color);
					color: var(--white-color);
				}
			}

			.save {
				background-color: var(--secondary-color);
				color: var(--black-color);

				&:hover {
					background-color: var(--primary-color);
					color: var(--white-color);
				}

				&:disabled {
					opacity: 0.5;
					pointer-events: none;
				}
			}
		}
	}
}

@media (min-width: 772px) {
	.popup-body {
		max-width: 600px;
	}
}
</style>
