<template>
	<div class="wya-debug_console">
		<span v-for="(item, key) in dataSource.data" :key="key">
			{{ item }}123
		</span>
		<!-- {{ dataSource.data }} -->
	</div>
</template>
<script>
export default {
	components: {},
	props: {
		dataSource: Object
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
</style>
