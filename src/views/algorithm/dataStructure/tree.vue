<template>
  <div>
    <h3>树</h3>
    <pre>
      树形结构(有向无环图)
      树是图的一种
      树是没有回路的
      树只有一个根节点
      根节点：树的最顶部的节点
      叶子节点：树的最底层的节点，并且这些节点下面没有其他节点
      节点：除了根节点和子节点的中间节点
      度：一个节点下的最多分支数量
      深度： 树的层数
    </pre>
    <h3>二叉树</h3>
    <pre>
      树的度最多为2的树形结构
    </pre>
    <h3>满二叉树</h3>
    <pre>
      每个节点都有两个节点，每个叶子节点都在树的最底层
    </pre>
    <h3>完全二叉树</h3>
    <pre>
      国内定义：
        1.叶子节点在最后一层或者最后第二层(总共有三层)
        2.叶子节点都向左靠拢

      国际定义：
        1.叶子节点都在最后一层或最后第二层(总共有三层)
        2.每个节点都有两个叶子节点
    </pre>
    <h3>遍历二叉树</h3>
    <pre>
      1. 前序遍历
         先打印当前的，再打印左边的，再打印右边的

      2. 中序遍历
         先打印左边的，再打印当前的，再打印右边的

      3. 后序遍历
         先打印左边的，再打印右边的，再打印当前的

                  a
            b           c 
        d      e     f      g

        前序遍历： a -> b -> d -> e -> f -> c -> g
        中序遍历： d -> b -> e -> a -> f -> c -> g
        后序遍历： d -> e -> b -> f -> g -> c -> a 

      <codemirror
        ref="mycode"
        value="
        // 节点
        function Node(value){
          this.value = value
          this.left = null
          this.right = null
        }

        const a = new Node('a')
        const b = new Node('b')
        const c = new Node('c')
        const d = new Node('d')
        const e = new Node('e')
        const f = new Node('f')
        const g = new Node('g')
        const h = new Node('h')

        a.left = b
        a.right = c
        b.left = d
        b.right = e
        c.left = f
        c.right = g

        // 前序遍历
        function start(node){
          if (!node) {
            return
          }
          console.log(node.value)
          start(node.left)
          start(node.right)
        }
        start(a)

        // 中序遍历
        function center(node){
          if (!node) {
            return
          }
          center(node.left)
          console.log(node.value)
          center(node.right)
        }
        center(a)

        // 后序遍历
        function end(node){
          if (!node) {
            return
          }
          end(node.left)
          start(node.right)
          end.log(node.value)
        }
        end(a)


        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <h3>还原二叉树</h3>
    <pre>
      <codemirror
        ref="mycode"
        value="
        // 给出前序和中序还原二叉树
        const qian =  ['a','b','d','e','f','c','g']
        const zhong = ['d','b','e','a','f','c','g']

        // 节点
        function Node(value){
          this.value = value
          this.left = null
          this.right = null
        }

        function restoreQian(qian,zhong) {
          if(qian === null || zhong === null || qian.length === 0 || zhong.length === 0 || qian.length !== zhong.length){
            return
          }
          // 找出根节点
          const root = new Node(qian[0])
          // 找出根节点在中序中的位置
          const centerIndex = zhong.indexOf(root)
          // 获取前序左边的节点
          const qianLeft = qian.slice(1, centerIndex + 1)
          // 获取前序右边的节点
          const qianRight = qian.slice(centerIndex + 1)
          // 获取中序左边的节点
          const zhongLeft = zhong.slice(0, centerIndex)
          // 获取中序右边的节点
          const zhongRight = zhong.slice(centerIndex+1)
          root.left = restore(qianLeft, zhongLeft)
          root.right = restore(qianRight, zhongRight)
          return root
        }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <h3>深度遍历二叉树</h3>
    <pre>
      <codemirror
        ref="mycode"
        value="
          function deep(node, value){
            if (!node) {
              return
            }
            if (node.value === value) {
              return true
            }
            const left = deep(node.left, value)
            const right = deep(node.right, value)
            return left || right
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <h3>广度遍历二叉树</h3>
    <pre>
      <codemirror
        ref="mycode"
        value="
          先遍历每一层的子树

          function deep(nodes, value){
            if (!nodes || !nodes.length) { // 节点不存在直接返回false
              return false
            }
            const list = []
            // 遍历这一层的所有节点，找出它们的子节点进行存储
            for(let i = 0; i < nodes.length; i++){
              if (nodes[i].value === value) {
                return true
              }
              nodes[i].left && list.push(nodes[i].left)
              nodes[i].right && list.push(nodes[i].right)
            }
            // 递归遍历它们的子节点
            return deep(list, value)
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <h3>两个二叉树进行比较</h3>
    <pre>
      左右完全相等
      <codemirror
        ref="mycode"
        value="
          function compareTree(tree1, tree2){
            // 如果相等就直接返回true  这里不能这样判断，因为第一节点就相等那直接返回了，所以的判断false
            // if ((tree1 && tree2 && tree1.value === tree2.value) || (!tree1 && !tree2)) {
            //  return true
            //} else {
            //  return false
            //}
            // 这里用于判断最后的叶子节点为null
            if (tree1 === tree2) {
              return true
            }
            if((tree1 && tree2 === null) || (tree2 && tree1 === null) || tree1.value !== tree2.value){
                return false
            }
            const left = compareTree(tree1.left, tree2.left)
            const right = compareTree(tree1.right, tree2.right)
            return left && right
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <pre>
      左边可以和右边相等，右边可以和左边相等
      <codemirror
        ref="mycode"
        value="
          function compareTree(tree1, tree2){
            // 这里用于判断最后的叶子节点为null
            if (tree1 === tree2) {
              return true
            }
            if((tree1 && tree2 === null) || (tree2 && tree1 === null) || tree1.value !== tree2.value){
                return false
            }
            const left = compareTree(tree1.left, tree2.left)
            const right = compareTree(tree1.right, tree2.right)
            const left2 = compareTree(tree1.left, tree2.right)
            const right2 = compareTree(tree1.right, tree2.left)
            return (left && right) || (left2 && right2)
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <pre>
      diff算法，找出二叉树中的增删改的地方
      <codemirror
        ref="mycode"
        value="
          function diffTree(tree1, tree2, diffList){
            // 这里用于判断最后的叶子节点为null
            if (tree1 === tree2) {
              return diffList
            }
            // 增
            if (!tree1 && tree2) {
              diffList.push({
                type: 'add',
                oldVal: null,
                newVal: tree2, 
              })
            } else if (tree1 && !tree2) { // 删
              diffList.push({
                type: 'remove',
                oldVal: tree1,
                newVal: null, 
              })
            } else if (tree1.value !== tree2.value) { // 改
              diffList.push({
                type: 'change',
                oldVal: tree1,
                newVal: tree2, 
              })
            } else {
              diffTree(tree1.left, tree2.left, diffList)
              diffTree(tree1.right, tree2.right, diffList)
            }
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <pre>
      给一个数组返回一个左小右大的二叉树
      <codemirror
        ref="mycode"
        value="
          // 创建节点
          function Node(value) {
            this.value = value
            this.left = null
            this.right = null
          }
          // 给二叉树添加节点
          function addNode(root, value){
            if (!root) {
              return
            }
            // 如果当前节点的值小于 传递的值表示要在右边加入节点 否则在左边
            if (root.value < value) {
              // 如果右边没有值直接加
              if (!root.right) {
                root.right = new Node(value)
              } else { // 已经有了就递归
                addNode(root.right, value)
              }
            } else {
              if (!root.left) {
                root.left = new Node(value)
              } else { // 已经有了就递归
                addNode(root.left, value)
              }
            }
          }
          function buildSearchTree(arr){
            // 遍历数组
            const root = new Node(arr[0])
            for(let i = 0; i < arr.length; i ++){
              // 第一个节点为根节点
              if (i > 0) {
                addNode(root, arr[i])
              }
            }
            return root
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <pre>
      通过二叉树进行搜索指定的值
      <codemirror
        ref="mycode"
        value="
          // 创建节点
          function Node(value) {
            this.value = value
            this.left = null
            this.right = null
          }
          // 给二叉树添加节点
          function searchNode(root, value){
            if(!root){
              return false
            }
            if (root.value === value) {
              return true
            }
            const left = searchNode(root.left, value)
            if (left) {
              return true
            }
            const right = searchNode(root.right, value)
            if (right) {
              return true
            }
            return left || right
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