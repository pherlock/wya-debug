import moment from 'moment';
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
	toNum,
	each
} from "../../../utils/console";

const noop = (function (exports) {
	exports = function () {};
	return exports;
}({}));
export default {
	data() {
		return {
			consoleList: [],
			consoleObj: {},
			global: {
				keys: Object.keys
			}
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
			const from = this.getFrom();
			const time = moment(new Date()).format('HH:mm:ss');
			this.consoleList.push({
				type,
				data,
				from,
				time
			});
			this.consoleObj[type] && this.consoleObj[type].push({
				type,
				data,
				from,
				time
			});
		},
		injectGlobal() {
			each(this.global, (val, name) => {
				if (window[name]) return;

				window[name] = val;
			});
		},
		clearGlobal() {
			each(this.global, (val, name) => {
				if (window[name] && window[name] === val) {
					delete window[name];
				}
			});
		},
		clearAll() {
			this.consoleList = [];
			this.consoleObj = {};
		},
		setGlobal(name, val) {
			this.global[name] = val;
		},
		evil(fn) { // 解决eval eslint报错
			let Fn = Function;
			return new Fn('return ' + fn)();
		},
		handleEvalJs(jsInput) {
			let ret;
			this.injectGlobal();
			try {
				ret = this.evil.call(window, `(${jsInput})`);
			} catch (e) {
				ret = this.evil.call(window, jsInput);
			}
			this.setGlobal('$_', ret);
			this.clearGlobal();
			this.handleConsole('log', [ret]);
			return ret;
		},
		getFrom() {
			const e = new Error();
			let ret = '';
			const lines = e.stack ? e.stack.split('\n') : '';
			for (let i = 0, len = lines.length; i < len; i++) {
				ret = lines[i];
				if (ret.indexOf('winConsole') > -1 && i < len - 1) {
					ret = lines[i + 1];
					break;
				}
			}
			return ret;
		}
	},
};
