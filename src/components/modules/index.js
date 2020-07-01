import console from './console';
import network from './network';
import resources from './resources.vue';
import sources from './sources.vue';
import info from './info.vue';

const components = {
	'wya-debug-console': console,
	'wya-debug-network': network,
	'wya-debug-resources': resources,
	'wya-debug-sources': sources,
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
