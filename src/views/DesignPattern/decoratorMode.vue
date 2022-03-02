<template>
  <pre>
    <h2>装饰者模式</h2>
    在不改变原对象的基础上，在程序运行期间给对象动态的添加职责

    应用场景：
      需要给当前函数或对象添加额外的功能，但是又不想影响到原函数或对象就可以使用装饰者模式

    装饰者模式和代理模式的区别？
      相同点：都是扩展对象的功能
      不同点：代理模式在代理和对象本身一开始就可以确定，而装饰者模式刚开始不确定在运行的时候动态的添加，
             代理模式通常只有一层代理，而装饰者模式是一条链式装饰

    为什么使用装饰者不使用继承？
      继承带来的问题：父类和子类具有耦合关系，当父类改变的时候，子类也会改变；

    <codemirror
      ref="mycode"
      value="
        // 普通装饰者
        // 对象本身
        function a () {
          alert('a')
        }
        // 保存原对象的引用
        var _a = a
        // 扩展原对象
        a = function () {
          _a()
          alert(2)
        }
        a()

        // 普通装饰者的缺点：
        // 需要保存原对象的引用，并且如果有this，那么this指向也有问题

        // 封装一个AOP装饰函数，解决this指向问题
        // 函数执行前添加额外的功能
        function before (fn, beFn) {
          // 返回一个代理函数 
          return function () {
            // 执行先执行的函数
            beFn.apply(this, arguments)
            return fn.apply(this, arguments)
          }
        }
        // 函数执行后添加额外的功能
        function after (fn, afFn) {
          return function () {
            fn.apply(this, arguments)
            return afFn.apply(this,arguments)
          }
        }

        // 对象本身
        function a () {
          alert('a')
        }

        // 扩展原对象
        function b () {
          alert('b')
        }

        a = after(a,b)
        a() // a b


        // 通过装饰者模式给ajax添加token
        // 获取token伪代码
        function getToken () {
          return token
        }
        // 请求函数
        function request (url, params) {

        }
        // 装饰者函数 给请求函数添加token
        function addToken (url, params)) {
          params.token = getToken()
        }
        // 
        const ajax = before(request, addToken)
        ajax(url,params)

        // 封装一个AOP装饰者，也可放在函数原型上
        Function.prototype.before = function (beFn) {
          const _this = this
          return function () {
            beFn.apply(this, arguments)
            return _this.apply(this, arguments)
          }
        }

        Function.prototype.after = function (afFn) {
          const _this = this
          return function () {
            _this.apply(this, arguments)
            return afFn.apply(this, arguments)
          }
        }

        a = a.after(b)
        a()
      "
    :options="cmOptions"
    class="code"/>
  </pre>
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