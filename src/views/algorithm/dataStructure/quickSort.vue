<template>
  <div>
    <h3>快速排序</h3>
    <pre>
      思路：
        1. 随便从数组中选择一个值,注意需要把这个值从原数组中截取出去，否则递归就是死循环
        2. 遍历数组，比这个值小的放在左侧，比这个值大的放在右侧
        3. 递归

      <codemirror
        ref="mycode"
        value="
          function quickSort(arr){
            if(!arr || !arr.length || arr.length <= 1){
              return arr
            }
            // 选择一个值
            const value = arr.splice(Math.floor(arr.length/2),1)[0]
            // 存放左边的数组
            const arrLeft = []
            // 存放右边的数组
            const arrRight = []
            // 遍历数组
            for(let i = 0; i < arr.length; i++){
              // 小于就放在左边的数组否则就是右边的数组
              if(arr[i] <= value){
                arrLeft.push(arr[i])
              } else{
                arrRight.push(arr[i])
              }
            }
            // 递归左右两边的数组进行合并
            return [...quickSort(arrLeft),value, ...quickSort(arrRight)]
          }
          quickSort([94,3,1,6,7,9,654,3,2]) //  [1, 2, 3, 3, 6, 7, 9, 94, 654]
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