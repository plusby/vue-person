<template>
  <div>
    <h3>插值搜索法</h3>
    <pre>
      前提条件：
        只能在已经排好序的数组上，并且是等差数组或者有一点偏差的等差数组

      <img src="../../../assets/search/1.png" alt="">

      公式：
        (目标值-左侧的值)/(右侧值-左侧值) = (中间索引 - 左侧索引)/(右侧索引-左侧索引)
        中间索引 = ((目标值-左侧的值)/(右侧值-左侧值) * (右侧索引-左侧索引)) + 左侧索引

      思路：
        根据公式可以得到中间的索引，再获取对应的值，判断这个值是否和目标值相等，相等直接返回，
        如果比目标值大，表示目标值在leftIndex和它之间，因此把rightIndex改为中间索引-1，再次
        通过公式进行计算；
        如果比目标值小，表示目标值在它和rightIndex之间，因此把leftIndex改为中间索引+1,再次
        通过公式进行计算；
        当leftIndex大于rightIndex的时候终止循环

      <codemirror
        ref="mycode"
        value="
          function insertValSearch(arr, target){
            // 定义左侧的索引
            let leftIndex = 0
            // 定义右侧索引
            let rightIndex = arr.length - 1
            // 左边的索引超过右边的索引结束循环
            while(leftIndex <= rightIndex){
              let middleIndex = Math.floor(((target - arr[leftIndex]) / (arr[rightIndex] - arr[leftIndex])) * (rightIndex - leftIndex) + leftIndex)
              // 如果中间索引小于左侧索引或大于右侧索引表示没有查到直接返回false
              if(middleIndex < leftIndex || middleIndex > rightIndex){
                return false
              } 
              if (arr[middleIndex] === target) { // 相等就直接返回true
                return true
              } else if(arr[middleIndex] < target){ // 中间值小于目标值，把左侧的索引赋值为中间的索引+1
                leftIndex = middleIndex+1
              } else if(arr[middleIndex] > target){ // 中间值大于目标值，把右侧的索引赋值为中间的索引-1
                rightIndex = middleIndex - 1
              }
            }
            return false
          }    
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