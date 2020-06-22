import store from "../../../store";
import {
	CONSOLE_METHOD
} from "../../../constants/constants";
import {
	getObjType,
	isStr,
	isErr,
	escape,
	isEl,
	isObj,
	isUndef,
	isNull,
	toStr,
	toInt,
	isFn,
	toNum
} from "../../../utils/console";

const noop = (function (exports) {
	exports = function () {};
	return exports;
}({}));
export default {
	data() {
		return {
			consoleList: [],
			consoleObj: {}
		};
	},
	// mixins: [store],
	mounted() {
		const origConsole = {};
		const winConsole = window.console;

		CONSOLE_METHOD.forEach(type => {
			if (!this.consoleObj[type]) this.consoleObj[type] = [];
			origConsole[type] = noop;
			let origin = origConsole[type];
			if (winConsole[type]) {
				origConsole[type] = winConsole[type].bind(winConsole);
				origin = winConsole[type].bind(winConsole);
			}
			winConsole[type] = (...args) => {
				const data = {
					...args
				};
				this.handleConsole(type, data);
				origin(...args);
			};
		});
	},
	methods: {
		handleConsole(type, data) {
			this.consoleList.push({
				type,
				data
			});
			this.consoleObj[type].push({
				type,
				data
			});
		},
		handleExpand() {

		}
	},
};
