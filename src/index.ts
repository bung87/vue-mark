// tslint:disable

import { name, version } from "../package.json";
import { DirectiveBinding } from 'vue/types/options'

import {
	VNode, DirectiveOptions, default as Vue
} from 'vue';
import Mark from 'mark.js';
import { isEqual } from 'lodash';


function mark(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
	if (isEqual(binding.value, binding.oldValue)) {
		return
	}
	var instance = new Mark(el);
	el.querySelectorAll(`${binding.value.tag}[data-markjs="true"]`).forEach(x => x.remove());
	instance.mark(binding.value.keyword, {
		element: binding.value.tag,
		className: binding.value.className
	});
}
const options: DirectiveOptions = {
	bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
		mark(el, binding, vnode, oldVnode);
	},
	componentUpdated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
		mark(el, binding, vnode, oldVnode);
	}

}
export default {
	install(Vue: any) {
		Vue.directive('mark', options)
	}
}