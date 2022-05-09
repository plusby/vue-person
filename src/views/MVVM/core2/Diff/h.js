import vnode from './vnode.js'

/**
 * h('div', {}, h() | '' | [h()])
 */
export default function h(sel, data, c) {
  if (arguments.length !== 3) {
    throw new Error('参数有误')
  }
  
  // 字符串或数字就直接返回虚拟对象
  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, [], c, null)
  } else if (Array.isArray(c)) { // 如果是数组就把数组作为children传递给当前对象
    for (let i = 0; i < c.length; i++) {
      if (typeof c[i] !== 'object') { // 不是对象就提示
        throw new Error('参数数组中的值必须是对象')
      }
    }
    return vnode(sel, data, c, '', null)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) { // 如果是对象并且是vnode类型
    return vnode(sel, data, [c], '', null)
  } else {
    throw new Error('第三个参数必须是字符串或数字或h()调用返回的对象或数组')
  }
}