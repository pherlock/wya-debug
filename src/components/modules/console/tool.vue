<template>
	<div class="wya-debug_console-tool-bar wya-debug__relative">
		<span
			class="iconfont iconclear wya-debug__absolute"
			style="left: 10px; top: 8px"
			@click="handleClear"
		/>
		<span
			v-for="(item, key) in toolList"
			:key="key"
			class="_tool-item"
			:class="{'_tool-item-active': item.value === currentType}"
			@click="handleClick(item)"
		>
			{{ item.label }}
		</span>
	</div>
</template>
<script>
import { CONSOLE_TOOL } from "../../../constants/constants.js";

export default {
	components: {},
	data() {
		return {
			toolList: CONSOLE_TOOL,
			currentType: 1
		};
	},
	computed: {

	},
	mounted() {

	},
	methods: {
		handleClick(data) {
			this.currentType = data.value;
			this.$emit('change', data.label.toLowerCase());
		},
		handleClear() {
			this.$emit('clear');
		}
	}
};
</script>
<style lang='scss'>
.wya-debug_console-tool-bar{
	width: 100%;
	height: 40px;
	cursor: default;
	padding: 10px 10px 10px 40px;
	background: #fff;
	overflow: hidden;
	z-index: 9999;
	border-bottom: 1px solid #eceffe;
	._tool-item {
		cursor: pointer;
		color: #707d8b;
		margin: 0 1px;
		font-size: 12px;
		height: 20px;
		display: inline-block;
		padding: 0 4px;
		line-height: 20px;
		border-radius: 4px;
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}
	._tool-item-active{
		background: #707d8b;
		color: #fff;
	}
}
</style>
