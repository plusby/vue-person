import createDom from './createDom.js'
import patchVnode from './patchVnode.js'

function sameNode(oldNode, newNode){
  return oldNode.sel === newNode.sel && oldNode.key === newNode.key
}

export default function patchChilVnode (parentDom, oldNode, newNode) {
  // 新前指针
  let newStartIndex = 0
  // 新后指针
  let newEndIndex = newNode.length - 1
  // 旧前指针
  let oldStartIndex = 0
  // 旧后指针
  let oldEndIndex = oldNode.length - 1
  // 新前节点
  let newStartVnode = newNode[newStartIndex] 
  // 新后节点
  let newEndVnode = newNode[newEndIndex]
  // 旧前节点
  let oldStartVnode = oldNode[oldStartIndex]
  // 旧后节点
  let oldEndVnode = oldNode[oldEndIndex]
  // 遍历新旧节点
  while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
    if (!newStartVnode) {
      newStartVnode = newNode[++newStartIndex]
    } else if (!newEndVnode) {
      newEndVnode = newNode[--newEndIndex]
    } else if (!oldStartVnode) {
      oldStartVnode = oldNode[++oldStartIndex]
    } else if (!oldEndVnode) {
      oldEndVnode = oldNode[--oldEndIndex]
    } else if (sameNode(newStartVnode, oldStartVnode)) { // 新前和旧前进行比较
      console.log('规则1')
      // 新旧节点进行patch
      patchVnode(oldStartVnode, newStartVnode)
      // 新前和旧前的指针向下移动
      newStartIndex++
      oldStartIndex++
      // 新旧节点指向下个
      newStartVnode = newNode[newStartIndex]
      oldStartVnode = oldNode[oldStartIndex]
    } else if (sameNode(newEndVnode, oldEndVnode)) { // 新后和旧后进行对比
      console.log('规则2')
      // 新旧节点进行patch
      patchVnode(oldEndVnode, newEndVnode)
      // 新旧指针向前移动
      newEndIndex--
      oldEndIndex--
      // 新旧节点指向上个
      newEndVnode = newNode[newEndIndex]
      oldEndVnode = oldNode[oldEndIndex]
    } else if (sameNode(newEndVnode, oldStartVnode)) { // 新后和旧前进行比较
      console.log('规则3')
      // 新旧节点进行patch
      patchVnode(oldStartVnode, newEndVnode)
      // 把旧前节点插入到旧后的后面
      parentDom.insertBefore(oldStartVnode.elm, oldNode[oldEndIndex+1] ? oldNode[oldEndIndex+1].elm : null)
      // 把旧节点的这个节点标记为undefined
      oldNode[oldStartIndex] = undefined
      // 新后指针向前移动，旧前指针向后移动
      newEndIndex--
      oldStartIndex++
      // 新后节点指向上个，旧前节点指向下个
      newEndVnode = newNode[newEndIndex]
      oldStartVnode = oldNode[oldStartIndex]
    } else if (sameNode(newStartVnode, oldEndVnode)){ // 新前和旧后进行比较
      console.log('规则4')
      // 新旧节点进行patch
      patchVnode(oldStartVnode, newEndVnode)
      // 把旧后节点插入到旧前的前面
      parentDom.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      // 把旧节点的这个节点标记为undefined
      oldNode[oldEndIndex] = undefined
      // 新前指针指向下个，旧后指针指向上个
      newStartIndex++
      oldEndIndex--
      newStartVnode = newNode[newStartIndex]
      oldEndVnode = oldNode[oldEndIndex]

    } else { // 如果都不符合
      console.log('都不符合')
      // 存储旧指针之间的节点和对应的索引
      const map = {}
      for (let i = oldStartIndex; i <= oldEndIndex; i++) {
        map[oldNode[i].key] = i
      }
      // 如果旧节点中有这个节点 移动这个节点并且旧节点中的这个节点标记为undefined
      if (map[newNode[newStartIndex].key] !== undefined) {
        debugger
        const move = oldNode[map[newNode[newStartIndex].key]]
        if (move.sel !== newStartVnode.sel) { // 不是同一个节点就直接插入
          parentDom.insertBefore(createDom(newStartVnode), oldStartVnode.elm)
        } else { // 是同一个节点就标记为undefined
          oldNode[map[newNode[newStartIndex].key]] = undefined
          // 对比要移动节点和新节点的差异
          patchVnode(move, newStartVnode)
          // 把这个节点插入到旧前的前面
          parentDom.insertBefore(move.elm, oldStartVnode.elm)
        }
      } else { // 如果没有这个节点，表示是新增的节点直接插入到旧前的前面
        parentDom.insertBefore(createDom(newStartVnode), oldStartVnode.elm)
      }
      
      // 移动新前指针
      newStartIndex++
      newStartVnode = newNode[newStartIndex]
    }
  }
  console.log(newStartIndex, newEndIndex)
  // 如果新节点有剩余节点，则把新节点的剩余节点插入到dom中
  if (newStartIndex <= newEndIndex) {
    // 获取要要插入的位置
    // let pos = newNode[newEndIndex+1] ? newNode[newEndIndex+1].elm : null
    let pos = null
    // 如果要插入的节点从在
    if (newNode[newEndIndex+1]) {
      // 从真实列表中找出这个节点
      for (let i = 0; i < parentDom.children.length; i++) {
        if (parentDom.children[i].tagName.toLowerCase() === newNode[newEndIndex+1].sel && parentDom.children[i].getAttribute('key') == newNode[newEndIndex+1].key) {
          pos = parentDom.children[i]
          break;
        }
        
      }
    }
   
    // 遍历剩余的节点,插入到父元素中，这里可以通过碎片来批量插入进行优化
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      // 创建这些节点
      const dom = createDom(newNode[i])
      console.log(dom, pos, parentDom,oldNode,oldStartIndex)
      // 把这个节点插入到父节点下
      parentDom.insertBefore(dom, pos)
    }
  }
  // 如果旧节点有剩余节点，则把剩余的旧节点从父元素中删除
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      console.log(oldNode[i])
      if (oldNode[i]) { // 需要判空，因为可能把移动的节点标记为undefined
        // 把这个节点插入到父节点下
        parentDom.removeChild(oldNode[i].elm)
      }
    }
  }
}