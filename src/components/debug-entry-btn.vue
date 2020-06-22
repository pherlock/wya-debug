<template>
	<div
		ref="enrty-btn"
		class="wya-debug_entry-btn"
		:style="styleObj"
		@click="handleOpen"
	>
		<span class="iconfont icondebug" />
	</div>
</template>
<script>
import Draggabilly from 'draggabilly';

export default {
	components: {},
	data() {
		return {
			styleObj: { left: 0, top: 0 }
		};
	},
	computed: {

	},
	mounted() {
		this.enrtyBtn = new Draggabilly(this.$refs['enrty-btn'], {
			containment: true
		});
	},
	methods: {
		handleOpen() {
			this.$emit("open");
		}
	}
};
</script>
<style lang='scss'>
.wya-debug_entry-btn{
	pointer-events: all;
	width: 40px;
	height: 40px;
	display: flex;
	background: #000;
	opacity: 0.3;
	border-radius: 10px;
	position: relative;
	z-index: 1000;
	transition: opacity 0.3s;
	color: #fff;
	font-size: 25px;
	align-items: center;
	justify-content: center;
	&.active,
	&:active {
		opacity: 0.8;
	}
}
</style>
