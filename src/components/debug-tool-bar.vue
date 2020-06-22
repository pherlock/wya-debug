<template>
	<div class="wya-debug_tool-bar">
		<span
			v-for="(item, key) in TOOL_LIST"
			:key="key"
			:ref="`wya-debug-tool-${item}`"
			class="wya-debug-tool-item"
			:class="{'wya-debug_tool-item-active': currentTool === item}"
			@click="e => handleChooseTool(e,item,key)"
		>
			{{ item }}
		</span>
		<span class="wya-debug_tool-bottom-bar" :style="barStyle" />
	</div>
</template>
<script>
import Draggabilly from 'draggabilly';
import Bus from "./bus";
import { TOOL_LIST } from "../constants/constants";

export default {
	components: {},
	props: {
	},
	data() {
		return {
			TOOL_LIST,
			currentTool: 'Console',
			barStyle: {}
		};
	},
	computed: {

	},
	mounted() {
		const consoleTarget = this.$refs['wya-debug-tool-Console'][0];
		this.barStyle = {
			left: consoleTarget.offsetLeft + 'px',
			width: consoleTarget.offsetWidth + 'px'
		};
		Bus.$emit('changeTool', 'console');
	},
	methods: {
		handleChooseTool(e, tool, index) {
			this.currentTool = tool;
			this.barStyle = {
				left: e.target.offsetLeft + 'px',
				width: e.target.offsetWidth + 'px'
			};
			Bus.$emit('changeTool', tool.toLowerCase());
		}
	}
};
</script>
<style lang='scss'>
.wya-debug_tool-bar {
	width: 100%;
	height: 30px;
	line-height: 30px;
	background: rgb(33, 150, 243);
	color: #fff;
	display: flex;
	position: relative;
	z-index: 99999;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
	.wya-debug-tool-item{
		transition: 0.3s;
		padding: 0 12px;
	}
	.wya-debug_tool-item-active {
		height: 30px;
		background: #eceffe;
		transition: 0.3s;
		color: #263238;
		line-height: 30px;
		opacity: 0.5;
	}
	.wya-debug_tool-bottom-bar {
		transition: left 0.3s, width 0.3s;
		height: 3px;
		background: #fff;
		position: absolute;
		bottom: 0;
	}
}
</style>
