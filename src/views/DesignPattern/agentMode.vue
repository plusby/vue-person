<template>
  <pre>
    <h2>代理模式</h2>
      代理一个对象，为其添加一些功能，也可去掉原有对象的一些功能

      虚拟代理：
        把开销很大的对象，延迟到真正需要它的时候才去创建，图片加载，文件上传

      安全代理
        控制对象的访问权限，前端校验

      远程代理
        一个对象将不同空间的对象进行局部代理

      智能代理
        为代理对象添加额外的功能

      
      


    <codemirror
      ref="mycode"
      value="
        // 图片懒加载
        // 展示图片
        function MyImg (id) {
          var oImg = new Image()
          this.setSrc = (src) => {
            oImg.src = src
          }
          document.getElementById(id).appendChild(oImg)
        }

        // 代理之前的功能，添加一个懒加载的图片
        var ProxyImg = (() => {
          var nImg = new Image()
          var oMyImg = new MyImg('img')
          nImg.onload = function () {
            // 要加载的图片请求完成之后，替换到懒加载的图片
            oMyImg.setSrc(nImg.src)
          }
          return function (src, loadImg) {
            // 懒加载的图片
            oMyImg.setSrc(loadImg)
            // 要加载的图片
            nImg.src = src
          }
        })()
        ProxyImg('a.png', 'load.png')
      "
      :options="cmOptions"
      class="code"
    />
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