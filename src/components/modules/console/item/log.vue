<template>
	<div class="wya-debug_console-log wya-debug__flex">
		<!-- eslint-disable -->
		<div
			v-html="handleFormat(dataSource)"
		/>
	</div>
</template>
<script>
import item from "../../mixins/item-mixins";

export default {
	components: {},
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

	}
};
</script>
<style lang='scss'>
.wya-debug_console-log{
	position: relative;
	background: #fff;
	padding: 10px;
	border-bottom: 0.5px solid #eceffe;
	border-top: 0.5px solid #eceffe;
	margin-top: -1px;
	width: 100%;
}
</style>
