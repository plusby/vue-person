import { getValue, clone } from '../../utils/ObjectUtils.js'
import VNode  from '../../vdom/vnode.js'

/**
 * 初始化处理v-for指令
 * @param {*} vm vue对象
 * @param {*} elm 当前元素对象
 * @param {*} instructions v-for的值
 * @param {*} parent 当前元素的父级元素
 */
export function vforInit (vm, elm, instructions, parent) {
  // 获取指令
  const instrucArr = getVirtualNodeData(instructions)
  // 构建一个虚拟节点,用于保存当前节点的属性，所以节点类型是0，无需渲染
  // tag, // 标签类型，DIV,SPAN,#TEXT
  // elm, // 对应的真实节点
  // children, // 当前节点下的子节点
  // text, // 当前节点的文本
  // data, // VNodeData
  // parent, // 父级节点
  // nodeType, // 节点类型
  const vnode = new VNode(elm.nodeName, elm, [], '', instrucArr[2], parent, 0)
  vnode.instructions = instructions
  // 删除当前模板节点,会把要删除节点后面的空白文本节点也会删除
  parent.elm.removeChild(elm)
  // 添加上删除掉的空白文本节点
  parent.elm.appendChild(document.createTextNode(""))
  // 分析指令
  const resultNewEleArr = analysisInstructions(vm, instrucArr, elm, parent)
  return vnode
}

/**
 * 根据指令字符串 得到一个指令数组
 * @param {*} instructions 指令字符串 (key) in list 或 (key,index) in list
 * @return {Array} 指令数组
 */
function getVirtualNodeData (instructions) {
  let inSet = instructions.trim().split(" ")
  if (inSet.length !== 3 || (inSet[1] !== 'in' && inSet[1] !== 'of')) {
    throw new Error('v-for指令有误')
  }
  return inSet
}

/**
 * 分析指令获取相应的值
 * @param {*} vm 
 * @param {*} instrucArr 
 * @param {*} elm 
 * @param {*} parent
 * @returns 返回遍历创建的新节点数组
 */
function analysisInstructions (vm, instrucArr, elm, parent) {
  // 获取指令对象的指
  const value = getValue(vm._data, instrucArr[2])
  if (!value) {
    throw new Error('v-for中的instrucArr[2]未定义')
  }
  const result = []
  // 遍历v-for的值，创建相应的节点
  for (let i = 0; i < value.length; i ++) {
    // 创建当前新元素
    const ele = document.createElement(elm.nodeName)
    // 填充内容
    ele.innerHTML = elm.innerHTML
    // 解析key,value去获取对应的值
    let env = analysisKV(instrucArr[0], clone(value[i]), i)
    console.log('env', env, env.key.name, JSON.stringify(env))
    // 把key，value添加都元素上
    ele.setAttribute('env', JSON.stringify(env))
    // 把元素添加到父级中
    parent.elm.appendChild(ele)
    result.push(ele)
  }
  return result
}

/**
 * 解析v-for中的(key,index) 或 (key) 并获取到对应的值
 * @param {*} keyValue (key,index)字符串内容
 * @param {*} value 对应的值
 * @param {*} index 对应的下标
 * @returns 
 */
function analysisKV(keyValue, value, index) {
  // 根据正则判断keyValue是否具有()包裹 去除()
  if (/([a-zA-Z0-9_$]+)/.test(keyValue)) {
    keyValue = keyValue.trim()
    keyValue = keyValue.substring(1, keyValue.length - 1)
  }
  const obj = {}
  const keys = keyValue.split(',')
  // 获取并设置key对应的值
  if (keys.length >= 1) {
    obj[keys[0].trim()] = value
  }

  // 获取并设置index对应的索引
  if (keys.length >= 2) {
    obj[keys[1].trim()] = index
  }
  return obj
}