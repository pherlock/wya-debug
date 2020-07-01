<template>
	<div class="wya-debug_console-list">
		<div
			v-for="(item, key) in consoleList"
			:key="key"
			class="_console-item"
			@click="handleClick(item)"
		>
			<!-- 有问题  可能不该这么写  还是分item吧  -->
			<div
				:class="`_console-item-content wya-debug__break wya-debug__flex _console-item-${item.type}`"
			>
				<span class="iconfont " :class="`icon${item.type}`" style="width: 20px" />
				<!-- eslint-disable -->
				<component
					v-if="normalType.includes(item.type)"
					:is="`wya-debug-normal`"
					:dataSource="formatArr(item)"
					style="flex: 1"
				/>
				<component
					v-else
					:is="`wya-debug-${item.type}`"
					:dataSource="formatArr(item)"
					style="flex: 1"
				/>
			</div>
			<div class="_from">
				<div>{{item.time}} {{item.from}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import { cloneDeep } from "lodash";
import {
	getObjType,
	isStr,
	isErr,
	isEl,
	isObj,
	isUndef,
	isNull,
	isFn,
	isNum,
	toStr,
	toInt,
	toNum
} from "../../../utils/console";
/* eslint-disable*/
const regJsUrl = /(((https?:(?:\/\/)?)(?:[-;:&=,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=,\w]+@)[A-Za-z0-9.-]+)((?:\/[~%\/.\w-_]*)?\??(?:[-=&;%@.\w_]*)#?(?:[\w]*))?)/ig;
const regErudaJs = /eruda(\.min)?\.js/;
import item from "./item";
import itemFnMixins from "../mixins/item-mixins"
export default {
	components: {

	},
	mixins: [item,itemFnMixins],
	props: {
		consoleList: Array
	},
	data() {
		return {
			normalType: [
				'log',
				'debug',
				'info',
				'warn',
				'output',
				'groupCollapsed',
				'group',
				'error'
			]
		};
	},
	computed: {

	},
	watch: {
	},
	mounted() {
	},
	methods: {
		handleClick(data) {
		},
		formatArr(dataSource) {
			let {
				data,
				type
			} = dataSource;
			let dataArr = this.getLogArr(data);
			const needStrSubstitution = isStr(dataArr[0]) && dataArr.length !== 1;
			if (needStrSubstitution) dataArr = this.substituteStr(dataArr);
			return {type, data: dataArr};
		},
		getLogArr(data) {
			let arr = [];
			for (const key in data) {
				const element = data[key];
				arr.push(element);
			}
			return arr;
		},
	}
};
</script>
<style lang='scss'>
.wya-debug_console-list{
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 80px;
	._console-item{
		.iconerror {
			color: #f44336
		}
		.iconinfo {
			color: #2196f3
		}
		.iconwarn {
			color: #ff6f00
		}
		._console-item-content{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			margin-top: -1px;
			padding: 10px;
			position: relative;
		}
		._console-item-log,._console-item-info {
			background: #fff;
			border-bottom: 0.5px solid #eceffe;
			border-top: 0.5px solid #eceffe;
		}
		._console-item-warn {
			background: #fffbe6;
			border-top: 0.5px solid #ffc107;
			border-bottom: 0.5px solid #ffc107;
		}
		._console-item-error {
			background: #ffebee;
			color: #f44336;
			border-top: 0.5px solid #f44336;
			border-bottom: 0.5px solid #f44336;
		}
		._from{
			word-wrap: nowrap;
			width: 100%;
			overflow-x: auto;
			div{
				line-height: 24px;
				padding-left: 8px;
				width: max-content;
				word-break: break-all;
			}
		}
	}
	.jv-container .jv-code{
		padding: 0
	}
	.jv-container.jv-light {
		background: unset;
	}
}
</style>
