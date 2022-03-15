import {getValue} from "../../utils/ObjectUtils.js";


/**
 * 处理v-on属性
 * @param vm
 * @param vnode
 */
export function checkVOn(vm, vnode){
  // 不是元素标签就直接返回
  if (vnode.nodeType !== 1) {
    return
  }
  // 获取到当前元素身上的属性
  const attrNams = vnode.elm.getAttributeNames()
  for (let i = 0; i < attrNams.length; i ++) {
    // 如果具有v-on
    if (attrNams[i].indexOf('v-on:') === 0){
      // 把执行函数和对应的事件进行绑定
      von(vm, vnode, attrNams[i].split(':')[1], vnode.elm.getAttribute(attrNams[i]))
    } else if (attrNams[i].indexOf('@') === 0) { // 或@
      von(vm, vnode, attrNams[i].split('@')[1], vnode.elm.getAttribute(attrNams[i]))
    }
  }
}

/**
 * 给事件绑定对应的函数
 * @param vm
 * @param vnode
 * @param eventName
 * @param fnName
 */
function von (vm, vnode, eventName, fnName) {
  // 获取到事件函数
  const fn = getValue(vm._methods, fnName)
  if (fn) {
    // 给当前元素进行绑定事件
    vnode.elm.addEventListener(eventName, proxyFn(vm, fn))
  }
}

/**
 * 代理事件，修改this指向
 * @param vm
 * @param fn
 * @returns {(function(): void)|*}
 */
function proxyFn(vm, fn){
  return function () {
    fn.apply(vm,arguments)
  }
}