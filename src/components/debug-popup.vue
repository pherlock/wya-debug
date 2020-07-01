<template>
	<div class="wya-debug_popup">
		<slot name="tool-bar" />
		<slot name="container" />
	</div>
</template>
<script>
export default {
	name: "wya-debug-popup",
	components: {},
	props: {
	},
	data() {
		return {

		};
	},
	computed: {

	},
	mounted() {

	},
	methods: {

	}
};
</script>
<style lang='scss'>
.wya-debug_popup{
	pointer-events: all;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 75vh;
	min-height: 350px;
	background:#f8f9fa;
}
</style>
