<template>
	<div class="wya-debug_console-js">
		<div class="_js-tool wya-debug__bb wya-debug__flex wya-debug__jc-sa wya-debug__ai-c">
			<span
				style="flex: 1; text-align: center; line-height: 40px;"
				class="wya-debug__br"
				@click="handleCancel"
			>Cancel</span>
			<span
				style="flex: 1; text-align: center; line-height: 40px;"
				@click="handleExecute"
			>Execute</span>
		</div>
		<textarea
			v-model="jscode"
			class="_js-textarea"
		/>
	</div>
</template>
<script>

export default {
	components: {},
	data() {
		return {
			jscode: ''
		};
	},
	computed: {

	},
	mounted() {

	},
	methods: {
		handleCancel() {
			this.$emit('close');
		},
		handleExecute() {
			if (this.jscode == '') {
				this.$emit('close');
				return;
			}
			this.$emit('run', this.jscode);
		}
	}
};
</script>
<style lang='scss'>
.wya-debug_console-js{
	width: 100%;
	height: 100%;
	cursor: default;
	._js-tool{
		width:100%;
		height: 40px;
		background: white;
	}
	._js-textarea{
		width: 100%;
		height: calc(100% - 40px);
		outline: none;
		padding: 12px;
	}
}
</style>
