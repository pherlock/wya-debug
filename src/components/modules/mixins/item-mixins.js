import {
	cloneDeep
} from "lodash";
import {
	getObjType,
	isStr,
	isErr,
	isEl,
	isObj,
	isUndef,
	isNull,
	isFn,
	isNum,
	toStr,
	toInt,
	toNum,
	isArray,
	isWin
} from "../../../utils/console";
/* eslint-disable*/
const regJsUrl = /(((https?:(?:\/\/)?)(?:[-;:&=,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=,\w]+@)[A-Za-z0-9.-]+)((?:\/[~%\/.\w-_]*)?\??(?:[-=&;%@.\w_]*)#?(?:[\w]*))?)/ig;
const regErudaJs = /eruda(\.min)?\.js/;

export default {
	data() {
		return {
		};
	},
	// mixins: [store],
	mounted() {
	},
	methods: {
		isObj,
		isArray,
		isWin,
		isFn,
		handleClick(data) {
			console.log(data);
		},
		getLogArr(data) {
			let arr = [];
			for (const key in data) {
				const element = data[key];
				arr.push(element);
			}
			return arr;
		},
		// 我放弃  还是自己写吧
		handleFormat(data) {

			let dataArr = this.getLogArr(data);
			const needStrSubstitution = isStr(dataArr[0]) && dataArr.length !== 1;
			if (needStrSubstitution) dataArr = this.substituteStr(dataArr);

			let basicStr = ''; // 最开始显示的字符串 对象是{...} 数字是 对象里的数组和对象是Array(1),e:{...}
			basicStr = this.getBasicStr(data);

			return basicStr;
		},
		handleGetClass() {
			return '';
		},
		getBasicStr(data) { // 用v-html
			const type = this.getType(data);
			let basicStr = '';
			switch (type) {
				case 'String':
					basicStr = `<div class="wya-bug__c-333">${data}</div>`;
					break;
				case 'Object':
					basicStr = `<span>Object</span><div class="wya-bug__c-333">{...}</div>`;
					break;
				case 'undefined':
					basicStr = `<div class="wya-debug__c-ac">undefined</div>`;
					break;
				case 'Number':
					basicStr = `<div class="wya-debug__c-blue">${data}</div>`;
					break;
				case 'null':

					break;
				case 'function':

					break;
				default:
					break;
			}
			return basicStr.replace(
				regJsUrl,
				match => `<a href="${match}" target="_blank">${match}</a>`
			);
			// this.get;
		},
		/**
		 *
		 * 获取数据类型
		 */
		getType(data) {
			let type = '';
			if (isStr(data)) {
				return 'String';
			} else if (isErr(data)) {
				return isErr(data);
			} else if (isObj(data)) {
				return 'Object';
			} else if (isUndef(data)) {
				return 'undefined';
			} else if (isNum(data)) {
				return 'Number';
			} else if (isNull(data)) {
				return 'null';
			} else if (isFn(data)) {
				return 'function';
			}
			return '';
		},
		formatErr(err) {
			let lines = err.stack ? err.stack.split('\n') : [];
			const msg = `${err.message || lines[0]}<br/>`;

			lines = lines.filter(val => !regErudaJs.test(val)).map(val => escape(val));

			const stack = `<div class="eruda-stack eruda-hidden">${lines
				.slice(1)
				.join('<br/>')}</div>`;

			return (
				msg
				+ stack.replace(
					regJsUrl,
					match => `<a href="${match}" target="_blank">${match}</a>`
				)
			);
		},
		formatJs(code) {
			return code;
			// 格式化js代码
			// const curTheme = evalCss.getCurTheme();
			// return highlight(beautify(code, { indent_size: 2 }), 'js', {
			// 	keyword: `color:${curTheme.keywordColor}`,
			// 	number: `color:${curTheme.numberColor}`,
			// 	operator: `color:${curTheme.operatorColor}`,
			// 	comment: `color:${curTheme.commentColor}`,
			// 	string: `color:${curTheme.stringColor}`
			// });
		},
		formatMsg(args, { htmlForEl = true } = {}) {
			const needStrSubstitution = isStr(args[0]) && args.length !== 1;
			if (needStrSubstitution) args = this.substituteStr(args);

			for (let i = 0, len = args.length; i < len; i++) {
				let val = args[i];

				if (isEl(val) && htmlForEl) {
					args[i] = this.formatEl(val);
				} else if (isFn(val)) {
					args[i] = this.formatFn(val);
				} else if (isObj(val)) {
					args[i] = this.formatObj(val);
				} else if (isUndef(val)) {
					args[i] = 'undefined';
				} else if (isNull(val)) {
					args[i] = 'null';
				} else {
					val = toStr(val);
					if (i !== 0 || !needStrSubstitution) val = escape(val);
					args[i] = val;
				}
			}
			return '<div class="eruda-json eruda-hidden"></div>';
		},
		substituteStr(args) {
			const str = args[0];
			let isInCss = false;
			let newStr = '';
			args.shift();
			for (let i = 0, len = str.length; i < len; i++) {
				const c = str[i];
				if (c === '%' && args.length !== 0) {
					i++;
					const arg = args.shift();
					switch (str[i]) {
						case 'i':
						case 'd':
							newStr += toInt(arg);
							break;
						case 'f':
							newStr += toNum(arg);
							break;
						case 's':
							newStr += toStr(arg);
							break;
						case 'O':
							// if (isObj(arg)) {
							// 	newStr += this.getAbstract(arg);
							// }
							break;
						case 'o':
							if (isEl(arg)) {
								newStr += this.formatEl(arg);
							} else if (isObj(arg)) {
								newStr += this.getAbstract(arg);
							}
							break;
						case 'c':
							if (str.length <= i + 1) {
								break;
							}
							if (isInCss) newStr += '</span>';
							isInCss = true;
							newStr += `<span style="${arg}">`;
							break;
						default:
							i--;
							args.unshift(arg);
							newStr += c;
					}
				} else {
					newStr += c;
				}
			}
			if (isInCss) newStr += '</span>';
			args.unshift(newStr);
			return args;
		},
		formatObj(val) {
			let type = getObjType(val);
			if (type === 'Array' && val.length > 1) type = `(${val.length})`;
			return `${type} ${this.getAbstract(val)}`;
		},
		getAbstract(val) {
			return val;
		},
		formatFn(val) {
			return `<pre style="display:inline">${this.formatJs(val.toString())}</pre>`;
		}
	},
};
