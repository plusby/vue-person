<template>
  <div>
    <h3>二分查找法</h3>
    <pre>
      1. 把数组进行从小到大的排序
      2. 获取到数组的中间值
      3. 比较目标值和中间值
      4. 如果目标值等于中间值直接返回
      5. 如果目标值小于中间值，表示目标值在中间值的左侧，
         把右边的索引指向中间值的上个值，重复第二步
      6. 如果目标值大于中间值，表示目标值在中间值的右侧，
         把左边的索引指向中间值的下歌值，重复第二步

      <codemirror
        ref="mycode"
        value="
          function binarySearch(arr, target){
            if (!arr || !arr.length) {
              return false
            }
            arr.sort((a,b)=>a-b)
            // 定义左侧的索引
            let left = 0
            // 定义右侧的索引
            let right = arr.length - 1
            // 当左边的索引小于等于右边的索引的时候进行循环
            while(left <= right){
              // 获取到中间值
              const middleIndex = Math.floor((left+right)/2)
              const middle = arr[middleIndex]
              if(middle === target){
                return true
              }
              // 目标值小于中间值在左侧
              if(middle > target){
                right = middleIndex - 1
              } else{
                left = middleIndex + 1
              }
            }
            return false
          }
          binarySearch([1,2,3,5,7,8,99], 2) // true
          binarySearch([1,2,3,5,7,8,99], 6) // false
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