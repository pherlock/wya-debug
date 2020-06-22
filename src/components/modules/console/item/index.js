import info from './info.vue';
import log from './log.vue';
import error from './error.vue';
import warning from './warning.vue';
import debug from './debug.vue';

const components = {
	'wya-debug-log': log,
	'wya-debug-error': error,
	'wya-debug-warning': warning,
	'wya-debug-debug': debug,
	'wya-debug-info': info,
};
const regex = new RegExp(`^(${Object.keys(components).map((i) => i.replace(/wya-debug-/, '')).join('|')})$`);

export default {
	components,
	data() {
		return {
			regex
		};
	}
};
