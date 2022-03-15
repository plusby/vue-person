import { getValue } from '../utils/ObjectUtils.js'

// 通过模板，找到哪些节点使用了这个模板
let template2Vnode = new Map()
// 通过节点，找到哪些模板中有这个节点
let vnode2Template = new Map()


// 准备渲染虚拟节点
/**
 * 把元素标签上或内部的属性和当前元素的虚拟dom一一对应起来
 * 格式通过map存储
 *  1. 通过模板变量 存储对应的所有的使用到改模板变量的虚拟节点对象
 *    key:模板变量 value: 虚拟节点对象
 *  2. 通过虚拟节点对象   存储其中使用到的所有的模板变量
 *    key: 虚拟节点对象   value: 模板变量
 */
export function prepareRender (vm, vnode) {
  if (!vnode) {
    return
  }
  // 文本节点
  if (vnode.nodeType === 3) {
    // 获取其中的模板字符串
    analysisTemplateString(vnode)
  }
   // 虚拟节点 v-for的节点
  if (vnode.nodeType === 0) {
    setTemplate2Vnode(vnode.data, vnode)
    setVnode2Template(vnode.data, vnode)
  }
  // 分析元素身上的属性
  analysisAttr(vm, vnode)
  // 标签节点
  // if (vnode.nodeType === 1) {
    // 遍历标签节点的子节点获取到文本节点
    for (let i = 0; i < vnode.children.length; i++) {
      prepareRender(vm, vnode.children[i])
    }
  // }
}

// 获取模板字符串
function analysisTemplateString(vnode){
  let text = vnode.text
  // 正则匹配找出所有的{{文字}}
  text = text.replace(/\s/g, '')
  const templateString = text.match(/{{[a-zA-Z0-9_.]+}}/g)
  if (templateString) {
    for (let i = 0; i < templateString.length; i ++) {
      setTemplate2Vnode(templateString[i], vnode)
      setVnode2Template(templateString[i], vnode)
    }
  }
  
}

// 通过模板，找到哪些节点使用了这个模板 把它存起来
function setTemplate2Vnode (template, vnode) {
  // 获取到模板名
  let name = getTemplateName(template)
  let vnodeArr = template2Vnode.get(name)
  if (vnodeArr) {
    vnodeArr.push(vnode)
  } else {
    template2Vnode.set(name, [vnode])
  }
}

// 通过节点，找到哪些模板中有这个节点 把它存起来
function setVnode2Template (template, vnode) {
  const templateArr = vnode2Template.get(vnode)
  let name = getTemplateName(template)
  if (templateArr) {
    templateArr.push(name)
  } else {
    vnode2Template.set(vnode, [name])
  }
}

// 获取模板中的变量名
function getTemplateName (template) {
  // if (!template) {
  //   return template
  // }
  // 具有{{}}获取其中的内容
  if (template.substring(0,2) === '{{' && template.substring(template.length - 2) === '}}') {
    return template.substring(2, template.length - 2)
  } else {
    return template
  }
}

export function getTemplate2Vnode (vnode) {
  return vnode2Template.get(vnode)
}

export function getVnode2Template (template) {
  console.log('template2Vnode', template2Vnode)
  return template2Vnode.get(template)
}

export function clearVnode () {
  template2Vnode.clear()
  vnode2Template.clear()
}

// 虚拟dom渲染相关
export function renderMixin (Vue) {
  // 渲染方法
  Vue.prototype._render = function () {
    renderNode(this, this._vnode)
  }
}

// 根据虚拟dom树，渲染出真正的dom
export function renderNode(vm, vnode){

  // 如果是文本节点就获取下面的模板变量和对应的值
  if (vnode.nodeType === 3) {
    const template = vnode2Template.get(vnode)
    if (template) {
      let result = vnode.text
      for (let i = 0; i < template.length; i++) {
        const value = getTemplateValue([vm._data, vnode.env], template[i])
        console.log('vnode.elm.nodeValue', value, result.replace('{{' + template[i] + '}}', value))
        result = result.replace('{{' + template[i] + '}}', value)
      }
      
      // 修改当前元素的值
      vnode.elm.nodeValue = result

    }
  } else if (vnode.nodeType === 1 && vnode.tag === 'INPUT') { // 如果是元素节点 根据元素节点上的属性渲染出对应的值
    let template = vnode2Template.get(vnode)
    if (template) {
      for (let i = 0; i < template.length; i++) {
        const value = getTemplateValue([vm._data, vnode.env], template[i])
        vnode.elm.value = value
      }
    }
  } else { // 如果不是文本节点就获取下面的子节点进行递归
    for (let i = 0; i < vnode.children.length; i++) {
      renderNode(vm, vnode.children[i])
    }
  }
  
}

/**
 * 根据模板变量在Data或全局变量中获取相应的值
 * @param {*} originArr data和全局变量
 * @param {*} temp 模板变量
 */
function getTemplateValue(originArr, temp) {
  for (let i = 0; i < originArr.length; i++) {
    const value = getValue(originArr[i], temp)
    if (value) {
      return value
    }
  }
  return null
}

/**
 * 根据data下的数据渲染真实dom
 * @param {*} vm vue对象
 * @param {*} data vue下的data下的数据
 */
export function renderData(vm, data) {

  // 通过模板变量找到使用了这个模板变量的node节点
  const nodeArr = template2Vnode.get(data)
  if (!nodeArr) {
    return
  }
  debugger
  console.log('nodeArr', nodeArr)
  for (let i = 0; i < nodeArr.length; i ++) {
    // 把node节点渲染成真正的dom
    renderNode(vm, nodeArr[i])
  }
}

/**
 * 分析元素身上的属性
 * @param {Object} vm 
 * @param {Object} vnode 虚拟节点对象
 */
function analysisAttr (vm, vnode) {
  if (vnode.nodeType === 1) {
    const names = vnode.elm.getAttributeNames()
    if (names.indexOf('v-model') > -1) {
      // 存入模板和虚拟dom的map中
      setTemplate2Vnode(vnode.elm.getAttribute('v-model'), vnode)
      setVnode2Template(vnode.elm.getAttribute('v-model'), vnode)
    } 
  }
}