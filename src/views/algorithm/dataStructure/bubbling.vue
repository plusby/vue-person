<template>
  <div>
    <h3>冒泡排序</h3>
    <pre>
      思路：
        从小到大
        1. 遍历数组
        2. 比较前后两项的大小，前者比后者大就交换位置，每一轮遍历结束都会把这一轮中最大的值放在最后
        3. 当第一项之后的每一项都比较排序完成，表示冒泡结束

      <img src="../../../assets/search/m1.png" alt="">
      前后两个比较进行交换位置，每一轮把最大值排到最后
      
      <codemirror
        ref="mycode"
        value="
          function bubbling(arr){
            if(!arr || !arr.length){
              return arr
            }
            for(let i = 0; i < arr.length; i++){
              for(let j = 0; j < arr.length - i; j++){
                if (arr[j] > arr[j+1]) {
                  let temp = arr[j+1]
                  arr[j+1] = arr[j]
                  arr[j] = temp
                }
              }
            }
            return arr
          }
          bubbling([94,3,1,6,7,9,654,3,2]) //  [1, 2, 3, 3, 6, 7, 9, 94, 654]
        "
        :options="cmOptions"
        class="code"/>
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