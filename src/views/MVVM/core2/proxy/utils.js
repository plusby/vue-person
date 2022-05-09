
/**
 * 给对象的属性设置值
 * @param {*} obj 
 * @param {*} key 
 * @param {*} value 
 * @param {*} enumerable 
 */
export function def (obj, key, value, enumerable) {
  Object.defineProperty(obj , key, {
    enumerable,
    value,
    writable: true,
    configurable: true
  })
}