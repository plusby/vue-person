/**
 * 获取对应的值
 * @param {*} obj 对象
 * @param {*} name key  a.b.c
 * @return 值
 */
 export function getValue (obj, name) {
  if (!obj) {
    return obj
  }
  const names = name.split('.')
  let value = obj
  for (let i = 0; i < names.length; i ++) {
    if (value[names[i]]) {
      value = value[names[i]]
    } else {
      return undefined
    }
  }
  return value
}

/**
 * 给vue.data下的属性设置值
 * @param {Object} data vue.data
 * @param {String} props vue.data下的属性 可能是 obj.a.b 或 a
 * @param {String|number} value 修改的值
 */
export function setValue(data, props, value){

  if (!data) {
    return data
  }
  const list = props.split('.') // [obj, a, b]
  let obj = data
  // 获取到这个属性的对象
  for (let i = 0; i < list.length - 1; i++) {
    if (obj[list[i]]) {
      obj = obj[list[i]]
    } else {
      return
    }
  }
  console.log('obj[list.length - 1]', obj[list[list.length - 1]], list.length - 1, obj)
  // 修改这个对象的这个属性的值
  if (obj[list[list.length - 1]] != null) {
    obj[list[list.length - 1]] = value
  }
}

/**
 * 合并对象
 * @param {*} obj1 
 * @param {*} obj2
 * @returns 返回一个合并之后的对象
 */
export function mergeObj (obj1, obj2) {
  if (!obj1) {
    return clone(obj2)
  }
  if (!obj2) {
    return clone(obj1)
  }
  let newObj = {}
  const keys = Object.getOwnPropertyNames(obj1)
  for (let i = 0 ; i < keys.length; i ++) {
    newObj[keys[i]] = obj1[keys[i]]
  }

  const keys2 = Object.getOwnPropertyNames(obj2)
  for (let i = 0 ; i < keys2.length; i ++) {
    newObj[keys2[i]] = obj2[keys2[i]]
  }
  return newObj
}

// 克隆对象
export function clone(obj){
  // 如果是一个数组
  if (obj instanceof Array) {
    return cloneArr(obj)
  } else if (obj instanceof Object) { // 如果是对象
    return cloneObj(obj)
  } else {
    return obj
  }
}

// 克隆对象
function cloneObj (obj) {
  const newObj = {}
  const keys = Object.getOwnPropertyNames(obj)
  for (let i = 0 ; i < keys.length; i ++) {
    newObj[keys[i]] = clone(obj[keys[i]])
  }
  return newObj
}

// 克隆数组
function cloneArr (obj) {
  const newArr = new Array(obj.length)
  for (let i = 0 ; i < obj.length; i ++) {
    newArr[i] = clone(obj[i])
  }
  return newArr
}

/**
 * 合并环境变量
 * @param vm
 * @param vnode
 * @returns {返回一个合并之后的对象}
 */
export function getEnvAttr(vm, vnode){
  let result = mergeObj(vm._data, vnode.env)
  result = mergeObj(result, vm._computed)
  return result
}