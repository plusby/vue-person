import vnode from './vnode.js'
import createDom from './createDom.js'
import patchVnode from './patchVnode.js'

export default function patch(oldNode, newNode) {
  // 如果旧的节点是dom元素就转换成虚拟节点
  if (!oldNode.sel) {
    oldNode = vnode(oldNode.tageName, {}, [], '', oldNode)
  }
  debugger
  // 新旧节点对比
  // 如果是同一个节点, 就通过diff算法进行对比
  if (oldNode.sel === newNode.sel && oldNode.key === newNode.key) {
    patchVnode(oldNode, newNode)
  } else { // 不是同一个节点就删除重新全部插入
    const dom = createDom(newNode)
    oldNode.elm.parentNode.insertBefore(dom, oldNode.elm)
  }
}