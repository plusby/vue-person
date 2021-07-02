<template>
  <div>
    <h1>栈和队列</h1>
    <h4>1.栈的特点</h4>
    <p>先进后出</p>
    <p>实现一个栈</p>
    <codemirror
      ref="mycode"
      value="
        function Stack () {
          this.arr = []
          // 入栈
          this.push = function (val) {
            this.arr.push(val)
          }
          // 出栈
          this.pop = function () {
            return this.arr.pop()
          }
        }
        const stack = new Stack()
        stack.push(1)
        stack.push(2)
        stack.push(3)
        console.log('向栈中添加数据之后',stack.arr) // [1,2,3]
        stack.pop()
        console.log('向栈中取出一个数据之后',stack.arr) // [1,2]
        "
      :options="cmOptions"
      class="code"/>
      <h4>2.队列的特点</h4>
      <p>先进先出</p>
      <p>实现一个队列</p>
      <codemirror
        ref="mycode"
        value="
          function Queue () {
            this.arr = []
            // 入栈
            this.push = function (val) {
              this.arr.push(val)
            }
            // 出栈
            this.pop = function () {
              return this.arr.shift()
            }
          }
          const queue = new Queue()
          queue.push(1)
          queue.push(2)
          queue.push(3)
          console.log('向队列中添加数据之后',queue.arr) // [1,2,3]
          queue.pop()
          console.log('向队列中取出一个数据之后',queue.arr) // [1,2]
          "
        :options="cmOptions"
        class="code"/>
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