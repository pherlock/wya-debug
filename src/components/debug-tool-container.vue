<template>
	<div class="wya-debug_tool-container" @click="handleclick">
		<component :is="`wya-debug-console`" v-show="currentTool === 'console'" />
		<component :is="`wya-debug-network`" v-show="currentTool === 'network'" />
		<component :is="`wya-debug-resources`" v-show="currentTool === 'resources'" />
		<component :is="`wya-debug-sources`" v-show="currentTool === 'sources'" />
		<component :is="`wya-debug-info`" v-show="currentTool === 'info'" />
	</div>
</template>
<script>
import modules from "./modules";
import Bus from './bus';

export default {
	name: "wya-debug-tool-container",
	components: {},
	mixins: [modules],
	props: {

	},
	data() {
		return {
			currentTool: 'console'
		};
	},
	computed: {

	},
	created() {
		Bus.$on('changeTool', (res) => {
			this.currentTool = res;
		});
	},
	mounted() {

	},
	methods: {
		handleclick() {
		}
	}
};
</script>
<style lang='scss'>
.wya-debug_tool-container{
	width: 100%;
	height: 100%;
	background:#f8f9fa;
	position: relative
}
</style>
