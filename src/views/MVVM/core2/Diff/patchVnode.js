import patchChilVnode from './patchChilVnode.js'

export default function patchVnode (oldNode, newNode) {
  // 新旧节点是不是同一个对象,是同一个对象就什么都不做
  if (oldNode === newNode) {
    return
  }
  // 新节点中有没有text
  if (newNode.text) { // 有
    // 判断新旧节点的text是否相同，不同就把旧的文本替换成新的
    if (newNode.text !== oldNode.text) {
      oldNode.elm.innerText = newNode.text
    }
  } else { // 没有text 表示就有children
    // 如果旧节点中没有children 就把新的进行替换
    if (!oldNode.children || !oldNode.children.length) {
      for (let i = 0; i < newNode.children.length; i++) {
        const dom = createDom(newNode.children[i])
        oldNode.elm.parentNode.insertBefore(dom, oldNode.elm)
        // 把旧的进行删除
        // oldNode.elm.parentNode.remove()
      }
    } else { // 新旧都有children
      patchChilVnode(oldNode.elm, oldNode.children, newNode.children)
    }
  }
}