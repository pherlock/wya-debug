<template>
	<div class="wya-debug">
		<debug-entry-btn
			@open="handleOpen"
		/>
		<span class="wya-debug__c-red">111</span>
		<debug-popup v-show="isOpen">
			<debug-tool-bar
				slot="tool-bar"
			/>
			<debug-tool-container
				slot="container"
			/>
		</debug-popup>
	</div>
</template>

<script>
import debugPopup from "./components/debug-popup.vue";
import debugEntryBtn from "./components/debug-entry-btn.vue";
import debugToolBar from "./components/debug-tool-bar.vue";
import debugToolContainer from "./components/debug-tool-container.vue";
import store from './store';

export default {
	name: '',
	components: {
		'debug-popup': debugPopup,
		'debug-entry-btn': debugEntryBtn,
		'debug-tool-bar': debugToolBar,
		'debug-tool-container': debugToolContainer
	},
	// mixins: [consoleMixin],
	props: {

	},
	data() {
		return {
			isOpen: true,
			store
		};
	},
	computed: {

	},
	watch: {

	},
	created() {

	},
	methods: {
		handleOpen() {
			this.isOpen = !this.isOpen;
		}
	},
};
</script>

<style lang="scss">
@import './style/iconfont.scss';
@import './style/global.scss';

.wya-debug {
	pointer-events: none;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 100000;
}
</style>
