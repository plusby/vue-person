<template>
  <div class="strategy-wrap">
    <h2>策略模式</h2>
    <pre>
      什么是策略模式？
        策略模式就是将一系列算法封装起来，被封装起来的算法具有独立性，并且外部不可改变其特性
        个人理解将每块独立的逻辑封装起来，不受外部改变

      具有代表性的例子：表单验证
      <codemirror
          ref="mycode"
          value="
        export function Validate () {
        }

        // 校验规则
        Validate.prototype.rules = {
          // 是否是必填项
          isRequired: function (str) { // 每块逻辑都是独立的
            // 除去首尾空格
            const value = str.replace(/(^\s*)|(\s*$)/g, '')
            return value !== ''
          },
          // 最小长度
          minLength: function (str, length) {
            const strLength = str.length
            return strLength >= length
          },
          /// 是否相等
          isEqual: function () {
            // 可以接收多个参数比较
            const args = Array.prototype.slice.call(arguments)
            // 取首项与后面所有的项比较，如果每个都相等，就返回true
            const equal = args.every(function (value) {
              return value === args[0]
            })
            return equal
          },
          // 是否手机号
          isMobile: function (str) {
            const rule = /^1[3,4,5,7,8,9][0-9]\d{8}$/
            return rule.test(str)
          },
        }

        /*
          validator.test({
            'username': [{rule: 'isRequired', value: this.username.value, message: '用户名不能为空！'}],
            'password1': [
              {rule: 'isRequired', value: this.password1.value, message: '密码不能为空！'},
              {rule: 'minLength', value: [this.password1.value, 6], message: '密码长度不能小于6个字符！'}
            ],
          })
        */
        // 执行检验函数
        Validate.prototype.test = function (rules) {
          // 存放结果
          let result = ''
          // 遍历规则
          for (const key in rules) {
            // 获取到规则的值
            const value = rules[key]
            // 遍历规则中的值
            for (let i = 0; i < value.length; i++) {
              // 获取到每项
              const item = value[i]
              // 获取到值中的规则名称
              const name = item.rule
              // 获取到值中的value
              let val = item.value
              // 获取到值中的文本信息
              const msg = item.message
              // 把所有的val转成数组
              if (!Array.isArray(val)) {
                val = [val]
              }
              const res = this.rules[name].apply(this, val)
              // 如果被校验住了，那么终止循环
              if (!res) {
                result = {
                  key,
                  msg,
                }
                break
              }
            }
            // 如果被校验住了，那么终止循环
            if (result) {
              break
            }
          }
          return result
        }

        // 对外扩展校验规则
        Validate.prototype.extend = function (key, fn) {
          this.rules[key] = fn
        }

        const result = validator.test({
          'username': [{rule: 'isRequired', value: this.username.value, message: '用户名不能为空！'}],
          'password1': [
            {rule: 'isRequired', value: this.password1.value, message: '密码不能为空！'},
            {rule: 'minLength', value: [this.password1.value, 6], message: '密码长度不能小于6个字符！'}
          ],
        })

        if (result) {
          console.log(result.msg)
          return
        }
      "
      :options="cmOptions"
      class="code"/>

      优点：
        将每个独立的逻辑封装起来。提高代码的复用率，减少代码的冗余，策略模式，可以看作if/else的另一种形式，
        极大的减少了代码量和维护成本

      缺点：
        需要写使用说明，否则的阅读源码
    </pre>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/ambiance.css'
require('codemirror/mode/javascript/javascript') // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
require('codemirror/mode/python/python.js')
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')
export default {
  data(){
      return {
        cmOptions: {
          value: '',
          // mode: 'text/javascript',
          theme: 'idea',
          readOnly: true,
          lineNumbers: false, // 是否显示行数
          showCursorWhenSelecting: true,
        },
      }
   },
  components: {
    codemirror,
  },
}
</script>

<style>

</style>