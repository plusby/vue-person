import VNode from '../vdom/vnode.js'
import { vmodel } from './grammer/vmodel.js'
import { prepareRender, getVnode2Template, clearVnode } from './render.js'
import { vforInit } from './grammer/vfor.js'
import { mergeObj } from '../utils/ObjectUtils.js'
import { checkVBind } from './grammer/vbind.js'
import { checkVOn } from "./grammer/von.js";

export function initMount(Vue){
  Vue.prototype.$mount = function (el) {
    const dom = document.getElementById(el)
    mount(this, dom)
  }
}


export function mount(vm, elm){
  // 虚拟节点挂在到vue上
  vm._vnode = constructVNode(vm, elm, null)
   // 准备渲染 根据虚拟dom解析树dom和data变量之间的映射
  prepareRender(vm, vm._vnode)
  // console.log('getVnode2Template', getVnode2Template(), getTemplate2Vnode(), vm._vnode)
}

/**
 * 深度优先搜索 生成 虚拟节点树
 * @param {*} vm vue实例
 * @param {*} elm 当前节点
 * @param {*} parent 父级节点
 */
function constructVNode (vm, elm, parent) {
  // 分析元素身上的属性
  let vnode = analysisAttr(vm, elm, parent)
  if (vnode === null) {
    const tag = elm.nodeName
    const children = []
    const text = getNodeText(elm)
    const data = null
    const nodeType = elm.nodeType
    // 获取当前节点的虚拟节点
    vnode = new VNode(tag,elm,children,text, data, parent, nodeType)
    // 如果是元素，并且具有env就进行合并，否则直接合并当前元素的env和父级的env。因为子元素可以使用父元素的值
    if (elm.nodeType === 1 && elm.getAttribute('env')) {
      vnode.env = mergeObj(vnode.env, JSON.parse(elm.getAttribute('env')))
    } else {
      vnode.env = mergeObj(vnode.env, parent ? parent.env : {})
    }
  }
  // 进行v-bind解析
  checkVBind(vm, vnode)
  // 进行v-on事件解析
  checkVOn(vm, vnode)
  // 获取当前节点的子节点
  let childs = vnode.nodeType === 0 ? vnode.parent.elm.childNodes: vnode.elm.childNodes
  // 遍历子节点
  for(let i = 0; i < childs.length; i++){
    // 递归获取每个子节点的虚拟节点
    const childNode = constructVNode(vm, childs[i], vnode)
    if (childNode instanceof VNode) {
      vnode.children.push(childNode)
    } else {
      vnode.children = vnode.children.concat(childNode)
    }
    
  }
  return vnode
}

// 获取文本内容
function getNodeText(elm){
  // 文本节点直接返回内容 否则返回空
  if (elm.nodeType === 3) {
    return elm.nodeValue
  } else {
    return ''
  }
}

/**
 * 分析元素身上的属性
 * @param {Object} vm vue
 * @param {HTMLObject} elm 元素标签
 * @param {*} parent 
 */
function analysisAttr(vm, elm, parent){
  if (elm.nodeType === 1) { // 元素标签
    const attrNames = elm.getAttributeNames()
    if (attrNames.indexOf('v-model') > -1) { // 具有v-model属性
      vmodel(vm._data, elm, elm.getAttribute('v-model'))
    } if (attrNames.indexOf('v-for') > -1) { // 具有v-for属性的元素
      return vforInit(vm, elm, elm.getAttribute('v-for'), parent)
    } 
  }
  return null
}


/**
 * 根据属性模板重新构建
 * @param vm
 * @param template
 */
export function rebuild (vm, template) {
  debugger
  // 通过属性模板获取到对应的虚拟节点
  const vnodeArr = getVnode2Template(template)
  for (let i = 0 ; i < vnodeArr.length; i++) {
    // 清空父级内容
    vnodeArr[i].parent.elm.innerHTML = ''
    // 把之前的遍历元素再添加给父级
    vnodeArr[i].parent.elm.appendChild(vnodeArr[i].elm)
    // 重新构造虚拟节点
    const result = constructVNode(vm, vnodeArr[i].elm, vnodeArr[i].parent)
    debugger
    // 重新添加到父级中
    vnodeArr[i].parent.children = [result]
    // 清空模板
    clearVnode()
    // 重新在预渲染
    prepareRender(vm, vm._vnode)
  }
}