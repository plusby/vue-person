

export default function createDom (vnode) {
  // 创建这个元素
  let dom = document.createElement(vnode.sel)
  for (const key in vnode.data) {
    if (Object.hasOwnProperty.call(vnode.data, key)) {
      const element = vnode.data[key];
      dom.setAttribute(key, element)
    }
  }
  // 如果节点下有文本
  if (vnode.text) {
    dom.innerText = vnode.text
  } else if (vnode.children && vnode.children.length) { // 如果有子节点
    for (let i = 0; i < vnode.children.length; i++) {
      // 递归子节点
      const chilDom = createDom(vnode.children[i])
      // 把子节点添加到当前节点上
      dom.appendChild(chilDom)
    }
  }
  vnode.elm = dom
  return dom
}