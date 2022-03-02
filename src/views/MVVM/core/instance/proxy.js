
import { renderData } from './render.js'
import { rebuild } from './mount.js'

// 给对象设置代理
function constructObjProxy(vm, obj, nameSpace) {
  let proxyObj = {}
  for (let key in obj) {
    Object.defineProperty(proxyObj, key, {
      configurable: true,
      get(){
        return obj[key]
      },
      set(val){
        obj[key] = val
        // 修改对应dom的数据
        renderData(vm, getNameSpace(nameSpace, key))
      }
    })
    // 给vm上设置代理，这样可以直接通过vm.属性进行访问和修改
    Object.defineProperty(vm, key, {
      configurable: true,
      get(){
        return obj[key]
      },
      set(val){
        obj[key] = val
        // 修改对应dom的数据
        renderData(vm, getNameSpace(nameSpace, key))
      }
    })
    // 如果当前属性的值是一个对象，那么要深度代理
    if (obj[key] instanceof Object) {
      vm[key] = proxyObj[key] = constructProxy(vm, obj[key], getNameSpace(nameSpace, key))
    }
  }

  return proxyObj
}

// 命名空间
function getNameSpace(nameSpace, key){
  if (nameSpace === null || nameSpace === '') {
    return key
  } else if (key === null || key === '') {
    return nameSpace
  } else {
    return nameSpace + '.' + key
  }
}

// 代理数组的方法
function proxyArrFn (obj, key, nameSpace, vm) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    value(){
      const result = Array.prototype[key].apply(this, arguments)
      // 重新构建
      rebuild(vm, getNameSpace(nameSpace, ''))
      // 修改对应dom的数据
      renderData(vm, getNameSpace(nameSpace, ''))
      return result
    }
  })
}

// 代理数组的方法
function proxyArr(vm, arr, nameSpace){
  const obj = {
    eleType: 'Array',
    toString(){
      let result = ''
      for (let i = 0 ; i < arr.length; i ++) {
        result += arr[i] + ', '
      }
      return result.substring(0, result.length - 2)
    },
    push(){},
    pop(){},
    shift(){},
    unshift(){}
  }
  proxyArrFn.call(vm, obj, 'push', nameSpace, vm)
  proxyArrFn.call(vm, obj, 'pop', nameSpace, vm)
  proxyArrFn.call(vm, obj, 'shift', nameSpace, vm)
  proxyArrFn.call(vm, obj, 'unshift', nameSpace, vm)
  arr.__proto__ = obj // 改变Arr的原型指向，不再指向Array的原型，而是obj
  return arr
}

/**
 * 代理 data对象
 * @param {*} vm vue对象
 * @param {*} obj 要代理的对象
 * @param {*} nameSpace 命名空间 eg: a:{b：2} 则b的命名空间'a.b',方便查找
 */
export function constructProxy (vm, obj, nameSpace) {
  let proxyObj = null
  // 如果要代理的是一个对象
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    proxyObj = constructObjProxy(vm, obj, nameSpace)
  } else if (Object.prototype.toString.call(obj) === '[object Array]') { // 要代理的是一个数组
    proxyObj = new Array(obj.length)
    // 给数组的每一项设置代理
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] !== 'object') {
        proxyObj[i] = obj[i]
      } else {
        proxyObj[i] = constructProxy(vm, obj[i], nameSpace)
      }
    }
    // 代理数组的方法
    proxyObj = proxyArr(vm, proxyObj, nameSpace)
  } else {
    throw new Error('proxy must be Object or Array')
  }
  return proxyObj
}

