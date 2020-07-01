<template>
	<div class="wya-debug_console-item wya-debug__flex">
		<div
			v-for="(item, index) in dataSource.data"
			:key="index"
		>
			<!-- eslint-disable -->
			<div
				v-if="!isObj(item)"
				v-html="handleFormat(item)"
			/>
			<div
				v-else
				style="width: calc(100vw - 40px)"
			>
				<json-viewer
					:expand-depth="getDepth(item)"
					:value="formatJson(item)"
					:closed="true"
					:expanded="false"
					copyable
				>
					<template #copy>
						<div class="_copy-block">
							复制
						</div>
					</template>
				</json-viewer>
				<!-- <json-pretty
					:data="item"
					:deep="0"
					:highlight-mouseover-node="true"
					:show-select-controller="true"
					:show-length="true"
				/> -->
			</div>
		</div>
	</div>
</template>
<script>
import JsonViewer from "vue-json-viewer";
// import JsonPretty from "vue-json-pretty";
import item from "../../mixins/item-mixins";

export default {
	components: {
		'json-viewer': JsonViewer,
		// 'json-pretty': JsonPretty,
	},
	mixins: [item],
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
		getDepth(data) {
			if (this.isArray(data)) {
				return 1;
			} else {
				return 0;
			}
		},
		formatJson(data) {
			if (this.isWin(data)) {
				return {};
			} else {
				return data;
			}
		}
	}
};
</script>
<style lang='scss'>
.wya-debug_console-item{
	flex-wrap: wrap;
	.jv-container .jv-tooltip{
		top: -5px;
	}
}
</style>
