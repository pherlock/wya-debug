import log from './log.vue';
import normal from './normal.vue';

const components = {
	'wya-debug-log': log,
	'wya-debug-normal': normal,
};
const regex = new RegExp(`^(${Object.keys(components).map((i) => i.replace(/wya-debug-/, '')).join('|')})$`);

export default {
	components,
	data() {
		return {
			regex
		};
	},
	methods: {
	},
};
