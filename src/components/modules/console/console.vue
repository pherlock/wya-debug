<template>
	<div class="wya-debug_console-container wya-debug__flex">
		<div v-show="showList">
			<wya-debug-tool @change="handleChangeType" @clear="clearAll" />
			<wya-debug-console-list
				:console-list="type == 'all' ? consoleList : (consoleObj[type] || [])"
				:type="type"
			/>
			<div class="_tojs" @click="showList=false">
				Type JavaScript here
			</div>
		</div>
		<wya-debug-js-bar
			v-show="!showList"
			@close="showList=true"
			@run="handleRun"
		/>
	</div>
</template>
<script>
import Tool from "./tool.vue";
import List from "./list.vue";
import JsBar from "./js-bar.vue";
import store from "../../../store";
import consoleMixin from "../mixins/console-mixins";

export default {
	components: {
		'wya-debug-tool': Tool,
		'wya-debug-console-list': List,
		'wya-debug-js-bar': JsBar,
	},
	mixins: [consoleMixin],
	data() {
		return {
			consoleList: [],
			type: 'all',
			showList: true
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
		},
		handleRun(jscode) {
			this.showList = true;
			try {
				this.handleEvalJs(jscode);
			} catch (error) {
				console.error(error.toString());
			}
		}
	}
};
</script>
<style lang='scss'>
.wya-debug_console-container{
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	._tojs{
		width: 100%;
		background: #fff;
		position: absolute;
		bottom: 30px;
		line-height: 40px;
		left: 0;
		z-index: 1000000;
		text-indent: 15px;
		color: #666;
	}
}
</style>
