<template>
  <div>
    <h3>选择排序</h3>
    <pre>
      思路：
        1. 遍历数组
        2. 使用每一项和后面的所有项进行比较，找出最小的值
        3. 用最小值和当前项交换位置

      <img src="../../../assets/search/m2.png" alt="">
      <codemirror
        ref="mycode"
        value="
          function selectSort(arr){
            if(!arr || !arr.length){
              return arr
            }
            // 这里可以少遍历一次，因为遍历到倒数第二项即可交换位置完成排序
            for(let i = 0; i < arr.length - 1; i++){
              // 设置当前项为最小项
              let min = arr[i]
              // 定义最小项的索引
              let minIndex = i
              // 遍历其他项进行查找最小值
              for(let j = i; j < arr.length; j++){
                if(arr[j] < min){
                  min = arr[j]
                  minIndex = j
                }
              }
              // 交换位置
              if (min < arr[i]) {
                let temp = arr[i]
                arr[i] = min
                arr[minIndex] = temp
              }
            }
            return arr
          }
          selectSort([94,3,1,6,7,9,654,3,2]) //  [1, 2, 3, 3, 6, 7, 9, 94, 654]
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