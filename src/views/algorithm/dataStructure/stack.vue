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

          /*
            根据数字重复其后面的字母
            eg:
              3[2[abc]4[bb]]
              abcabcbbbbbbbbabcabcbbbbbbbbabcabcbbbbbbbb

              解题方法：
              找出数字和[,把数字存到栈1中，在栈2中存储空字符串，移动下标到[得下一位
              找出字母和]，把字母字母存储到栈2的最后一项中，移动下标到]位置
              如果是]，取出栈1和栈2的最后一项，根据栈1的数字重复栈2的字母，把结果再和栈2的前一项合并

          */
          function sameStr (str) {
            // 下标
            let index = 0
            // 栈1
            const arr1 = []
            // 栈2
            const arr2 = []
            while(index < str.length -1) {
              // 截取剩余的部分
              str = str.substring(index)
              console.log(str, /^\d+\[/.test(str), index)
              // 如果是以数字和[开头
              if (/^\d+\[/.test(str)) {
                
                // 获取到其中的数字
                const num = Number(str.match(/^(\d+)\[/)[1])
                arr1.push(num)
                arr2.push('')
                index = num.toString().length + 1
              } else if (/^\w+\]/.test(str)) { // 如果是字母数字和]开头的
                console.log( str.match(/^(\w+)\]/))
                // 获取到其中的数字和字母
                const s = str.match(/^(\w+)\]/)[1]
                // 存储到栈的最后一项
                arr2[arr2.length-1] = s
                index = s.length
              } else {
                // 取出栈1和2的最后一项
                const num = arr1.pop()
                const s = arr2.pop()
                // 重复字符
                const result = s.repeat(num)
                // 把结果和栈2的上一项进行拼接
                arr2[arr2.length-1] = arr2[arr2.length-1] + result
                index = 1
              }
            }
            
            const num = arr1.pop()
            const s = arr2.pop()
            // 重复字符
            return s.repeat(num)
          }
          console.log(sameStr('3[2[abc]4[bb]]'))
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