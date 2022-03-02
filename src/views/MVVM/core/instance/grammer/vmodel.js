import { setValue } from '../../utils/ObjectUtils.js'

/**
 * 实现v-model
 * @param {*} vm vue对象
 * @param {*} elm 当前元素标签
 * @param {*} data v-model属性的值
 */
export function vmodel (vm, elm, data) {
  console.log('elm', elm, vm.obj)
  elm.onchange = function (event) {
    console.log(999)
    setValue(vm, data, elm.value)
  }
}