import { getValue } from "../../utils/ObjectUtils.js"


export function checkVBind (vm, vnode) {
  if (vnode.nodeType !== 1) {
    return
  }
  const attrNames = vnode.elm.getAttributeNames()
  for (let i = 0 ; i < attrNames.length; i++) {
    if (attrNames[i].indexOf('v-bind:') === 0 || attrNames[i].indexOf(':') === 0) {
      vbind(vm, vnode, attrNames[i], vnode.elm.getAttribute(attrNames[i]))
    }
  }
}

function vbind (vm, vnode, name, value) {
  const arr = name.split(':')
  const result = getValue(vm._data, value)
  vnode.elm.setAttribute(arr[1], result)
}