<template>
	<div class="wya-debug_console-container">
		<wya-debug-tool @change="handleChangeType" />
		{{ type }}
		<wya-debug-console-list
			:console-list="type == 'all' ? consoleList : (consoleObj[type] || [])"
			:type="type"
		/>
	</div>
</template>
<script>
import Tool from "./tool.vue";
import List from "./list.vue";
import store from "../../../store";
import consoleMixin from "../mixins/console-mixins";

export default {
	components: {
		'wya-debug-tool': Tool,
		'wya-debug-console-list': List
	},
	mixins: [consoleMixin],
	data() {
		return {
			consoleList: [],
			type: 'all'
		};
	},
	computed: {
		// currentList() {
		// 	if (this.type == 'all') {
		// 		return this.consoleList;
		// 	} else {
		// 		return this.consoleObj[this.type] || [];
		// 	}
		// }
	},
	mounted() {
	},
	methods: {
		handleClick() {
		},
		handleChangeType(type) {
			this.type = type;
		}
	}
};
</script>
<style lang='scss'>
.wya-debug_console-container{
	width: 100%;
	height: 100%;
}
</style>
