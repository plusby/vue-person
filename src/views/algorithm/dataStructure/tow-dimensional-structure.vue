<template>
  <div>
    <h2>二维数据结构</h2>
    <p>二维数据结构有二维数组和图</p>
    <h5>二维数组</h5>
    <pre>
      结构：
        var arr = [[],[],[]]
      
      实现一个四行八列的二维数组
      
      <codemirror
        ref="mycode"
        value="
        const arr = new Array(4) // 注意，对于这种初始化指定长度创建的数组，数组中的每一项都是空项，因此不能通过forEach和map进行遍历，因为它们是不会遍历空项
        // 无法进行遍历
        // arr.forEach((item,index) => {
        //  arr[index] = new Array(8)
        // })
        for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(8)
        }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <h5>图 二维扩扑结构</h5>
    <pre>
      实现一个a关联b,c,d  b关联e,f的图, c关联d
          a
      b   c   d 
    e   f
      <codemirror
        ref="mycode"
        value="
         function Node(val){
           this.value = val
           this.neighbor = []
         }

         const a = new Node('a')
         const b = new Node('b')
         const c = new Node('c')
         const d = new Node('d')
         const e = new Node('e')
         const f = new Node('f')

         a.neighbor.push(b)
         a.neighbor.push(c)
         a.neighbor.push(d)

         b.neighbor.push(e)
         b.neighbor.push(f)

         c.neighbor.push(d)

        "
        :options="cmOptions"
        class="code"/>

      1. 图的广度搜索
         一行一行的搜索。先搜索a,再搜索b,c,d再搜索e,f
        /*
          方法1
          存储当前遍历的每一项，在以后的遍历中进行过滤
         */
         <codemirror
          ref="mycode"
          value="
          function searchBySpan(arr, val){
            const last = []
            function _searchBySpan(arr){
              if (arr.length === 0) {
                return false
              }
              let child = []
              for(let i = 0; i < arr.length; i++){
                const item = arr[i]
                // 如果已经查找过的就直接跳出本次循环
                if (last.includes(item)) {
                  continue
                }
                // 把当前节点存储到已找过的数组中
                last.push(item)
                if (item.value === val) {
                  return true
                } else {
                  // 把这一行的下个节点存起来, 这里会存储大量重复的节点，优化可以过滤掉相同的节点
                  // child = [...item.neighbor, ...child]
                  // 优化 过滤
                  item.neighbor.forEach(result => {
                    if (!child.includes(result)) {
                      child.push(result)
                    }
                  })
                }
              }
              // 递归这一行
              return _searchBySpan(child)
            }
            return _searchBySpan(arr)
          }
          searchBySpan([a], 'c') // true
          "
          :options="cmOptions"
          class="code"/>

      2.图的深度搜索 
        一个一个的搜索每个节点
        <codemirror
          ref="mycode"
          value="
          function searchByDeep(item, val){
            const last = []
            function _searchByDeep(item){
              if (item === null) {
                return false
              }
              let result = false
              if (last.includes(item)) { // 已经查找过就直接返回
                return false
              }
              if (item.value === val) {
                return true
              }
              last.push(item) // 存储为已查找过的
              // 遍历相邻的节点，递归搜索每个节点
              for(let j = 0; j < item.neighbor.length; j++){
                result |= _searchByDeep(item.neighbor[j]) // |= 或等于，为True则返回true
              }
              // 递归这一行
              return result ? true : false
            }
            return _searchByDeep(item)
          }
          searchByDeep(a, 'c') // true
          "
          :options="cmOptions"
          class="code"/>

      3. 图的最小生成树
          两个点之间找到最短的边进行连接，把所有的点都连接起来，但不能有回路(注意：这个不是最短路径问题)
          实际问题：要连通n个城市需要n－1条边线路，那么怎么样建设才能使工程造价最小呢？
          <img src="../../../assets/img/tu2.png" alt="">
          <h3>普利姆算法(加点法)</h3>
          概述：
            先找个点，然后再重其他点中找到距离最短的点进行连接，然后再重这两个点之外的其他点找一个到这
            两个点任意一个点距离最短的点进行链接，重复上述步骤，不断的扩张，直到所有连接的点等于所有的
            点的时候结束

          第一步： 首先随便找一个点作为起点，这里选择c作为起点，把它当在一个A数组中[c]
          第二步： 找到A数组之外的其它点到起点的最短路线,这里只有D点，把D点存到A数组中[c,D]
          第三步： 找到A数组之外的其它点到A数组中任何一个点的最短路线，这里只有B点，把B点存到A数组中[c,D,B]
          第四步： 找到A数组之外的其他点到A数组中任何一个点的最短路线，这里只有A点，把B点存到A数组中[c,D,B,A]
          第五步： 找到A数组之外的其他点到A数组中任何一个点的最短路线，这里只有E点，把E点存到A数组中[c,D,B,A,E]
          第六步： 所有的节点都已经连接，表示连接完毕，(A数组的长度等于所有点的个数)

          <codemirror
            ref="mycode"
            value="
            // 通过图设计出每个点之间的距离的二维数组,每一行和每一列都表示a,b,c,d,e
            var distance = [
            // a b c    d        e
              [0,4,7,Infinity,Infinity], // a
              [4,0,8,6,       Infinity], // b
              [7,8,0,5,       Infinity], // c
              [Infinity,6,5,0,7], // d
              [Infinity,Infinity,Infinity,7,0], // e
            ]

            // 定义节点
            function Node(val) {
              this.value = val
              this.neighbor = []
            }

            // 初始化每个节点
            var a = new Node('a')
            var b = new Node('b')
            var c = new Node('c')
            var d = new Node('d')
            var e = new Node('e')

            // 把所有的节点按照距离数组的位置放在一个数组中
            var arr = [a,b,c,d,e]

            /*
              普利姆算法 1
              遍历所有的节点，让每一个没有连接的点和所有已经连接的点进行距离比较，找出最短距离的两个点，
              进行连接，把结束点存放到已经连接的数组中，再次重复上述步骤，直到已经连接的节点的数组的长度
              和所有节点的长度相等的时候结束循环
              
            */
            function prim(nodes, distance){
              // 如果只有一项则返回
              if (nodes.length <= 1) {
                return nodes[0]
              }
              // 定义一个存放已经连接过的节点,初始值随便放一个点
              const arr = [nodes[0]]
              // 已经链接过的节点的数量小于 所有节点的数量的时候进行循环
              while(arr.length < nodes.length){
                // 最小的两个点和距离
                let result = {
                  from: null,
                  to: null,
                  dis: Infinity
                }
                // 遍历所有的节点，和已经连接的节点进行连接
                for(let i = 0; i < nodes.length; i ++){
                  const item = nodes[i]
                  // 找出没有连接过的节点进行链接
                  if(!arr.includes(item)){
                    // 找出最小距离的点
                    getMin(item, result)
                  }
                }
                // 把结束点存到已链接的数组中
                arr.push(result.to)
                // 两个点进行连接
                result.from.neighbor.push(result.to)
                result.to.neighbor.push(result.from)
              }
              return nodes[0]

              function getMin(item, result){
                // 遍历已经链接过的节点 和当前未连接的节点的距离进行比较找出最小的那个点
                for(let i = 0 ; i < arr.length; i ++){
                  // 获取开始点和结束点的索引
                  const startIndex = nodes.indexOf(arr[i])
                  const endIndex = nodes.indexOf(item)
                  // 获得它们之间的距离
                  const dis = distance[startIndex][endIndex]
                  // 每个节点进行比较找出最小的距离的点
                  if (dis < result.dis) {
                    result.to = item
                    result.from = arr[i]
                    result.dis = dis
                  }
                }
              }
            }
            
            const result = prim(arr, distance)
            console.log('result', result)

            /*
              普利姆算法 2
              遍历已经连接过的节点，找出每个节点在二维数组中对应的行，遍历这个行，找出两个点的最短距离，
              链接两个点，把结束点存到已经连接的数组中，重复上述步骤，直到已经连接的节点和所有节点的长度
              相同结束循环
            */

            function prim2(nodes, distance){
              // 如果只有一项则返回
              if (nodes.length <= 1) {
                return nodes[0]
              }
              const arr = [nodes[0]]
              while(true){
                const result = connect(arr)
                // 两个点进行连接
                result.to.neighbor.push(result.from)
                result.from.neighbor.push(result.to)
                arr.push(result.to)
                // 如果已经连接过的节点和所有节点的长度一样就结束循环
                if (arr.length === nodes.length) {
                  return nodes[0]
                }
              }
              function connect(hasArr){
                let min = {
                  to: null,
                  from: null,
                  dis: Infinity
                }
                // 遍历已经连接过的节点
                for(let i = 0; i < hasArr.length; i ++){
                  const item = hasArr[i] // 开始点
                  // 找出它在节点数组中的索引
                  const index = nodes.indexOf(item)
                  // 找出这个点到其他节点的距离数据，二维数组中对应的行
                  const all = distance[index]
                  // 遍历这个行
                  for(let j = 0; j < all.length; j++){
                    // 找出当前距离对应的节点
                    const end = nodes[j]
                    // 排除自己
                    if (!hasArr.includes(end)) {
                      // 找出开始点到其他点距离最短的点
                      if (min.dis > all[j]) {
                        min.to = end
                        min.from = item
                        min.dis = all[j]
                      }
                    }
                  }
                }
                return min
              }
            }
            const result2 = prim(arr, distance)
            console.log('result2', result2)

            "
            :options="cmOptions"
            class="code"/>

          <h3>克鲁斯卡尔算法(加边法)</h3>
          概述
            1. 找到所有边中最短的边进行连接
            2. 要保证边连接的两端至少有一个点是新的点
            3. 或者这个边的两端是两个部落进行连接
            4. 重复1-3的步骤连接所有的点

            <img src="../../../assets/tu/kl1.png" alt="">
            首先从所有节点中，找到一个最短边的两个节点进行连接a和b，形成一个部落

            <img src="../../../assets/tu/tu2.png" alt="">
            在从剩下节点中，找到一个最短边的两个节点进行连接c和d，形成一个部落

            <img src="../../../assets/tu/tu3.png" alt="">
            在从剩下节点中，找到一个最短边的两个节点进行连接,此时6最短，就要连接两个部落

            <img src="../../../assets/tu/tu4.png" alt="">
            在从剩下节点中，找到一个最短边的两个节点进行连接,此时7最短，就要连接部落和节点，
            最后所有的节点全部连接完成，表示结束


          思路：
            把连接在一起的节点放在一个数组中表示一个部落，不同部落可以进行连接，直到所有的节点都连接完成
          第一步： 遍历距离的二维数组
          第二步： 定义开始节点为数组的行索引对应的节点，结束节点为数组列的索引对应的节点
          第三步： 从已经连接的数组中找到这两个节点对应的部落，如果两个部落相等表示两个节点在同一个部落已经连接过了，不能再链接，其他情况可以连接
          第四步： 如果当前两个节点可以连接并且不是同一个节点并且距离最小，那么可以连接这两个节点
          第五步： 从已经连接的数组中找到这两个节点对应的部落，如果两个部落都不存在表示可以连接，把开始节点和结束节点组合成一个部落放在已经链接的数组中
                  如果开始部落存在，结束部落不存在，表示两个节点可以连接，把结束节点加入到开始部落并存入数组
                  如果开始部落不存在，结束部落存在，表示这两个节点可以链接，把开始节点加入到结束部落并存入数组
                  如果开始部落和结束部落都存在，并且两个部落不相等，表示可以连接，把两个部落进行组合，并且分别把两个部落
                  从数组删除，再把组合的整体加入到数组中
                  连接两个节点
          第六步： 如果已经连接的数组中只有一个部落并且这个部落的长度等于所有元素的个数，表示全部连接完成，结束循环



          <codemirror
            ref="mycode"
            value="
              // 通过图设计出每个点之间的距离的二维数组,每一行和每一列都表示a,b,c,d,e
              var distance = [
              // a b c    d        e
                [0,4,7,Infinity,Infinity], // a
                [4,0,8,6,       Infinity], // b
                [7,8,0,5,       Infinity], // c
                [Infinity,6,5,0,7], // d
                [Infinity,Infinity,Infinity,7,0], // e
              ]

              // 定义节点
              function Node(val) {
                this.value = val
                this.neighbor = []
              }

              // 初始化每个节点
              var a = new Node('a')
              var b = new Node('b')
              var c = new Node('c')
              var d = new Node('d')
              var e = new Node('e')

              // 把所有的节点按照距离数组的位置放在一个数组中
              var arr = [a,b,c,d,e]

              function kelusi2(nodes, distance){
                // 已经连接过的数组  
                const list = []
                while(true){
                  // 开始节点
                  var begin = null
                  // 结束节点
                  var endIn = null
                  // 最短距离
                  var minDis = Infinity
                  // 遍历距离这个二维数组
                  for(let i = 0; i < distance.length; i++){
                    for(let j = 0; j < distance[i].length; j++){
                      // 开始节点
                      const start = nodes[i]
                      // 结束节点
                      const end = nodes[j]
                      // 能够连线
                      const isLink = canLink(list, start, end)
                      // 如果不是同一个节点，并且能够连接，并且当前距离最小则进行连接
                      if(i !== j && isLink && distance[i][j] < minDis){
                        begin = start
                        endIn = end
                        minDis = distance[i][j]
                      }
                    }
                  }
                  // 连接
                  link(list, begin, endIn)
                  // 如果已经连接的数组的第一个部落等于所有节点的个数表示结束
                  if (list[0] && list[0].length === nodes.length) {
                    return nodes[0]
                  }
                }

                // 进行连接
                function link(list, start, end){
                  // 开始部落
                  let beginIn = null
                  // 结束部落
                  let endIn = null
                  // 遍历已经连接的节点
                  for(let i = 0; i < list.length; i ++){
                    // 找出开始部落
                    if (list[i].indexOf(start) !== -1) {
                      beginIn = list[i]
                    }
                    // 找出结束部落
                    if (list[i].indexOf(end) !== -1) {
                      endIn = list[i]
                    }
                  }
                  // 两个点都是新的点，不再任何部落中，就可以组成一个新的部落放在数组中
                    if(beginIn === null && endIn === null){
                        var newArr = []
                        newArr.push(start)
                        newArr.push(end)
                        list.push(newArr)
                    }
                  // 如果开始部落存在，结束部落不存在，结束点添加到开始部落
                  if (beginIn && !endIn) {
                    beginIn.push(endIn)
                  }
                  // 如果开始部落不存在，结束部落存在，开始点添加到结束部落
                  if (!beginIn && endIn) {
                    endIn.push(beginIn)
                  }
                  // 如果两个部落都存在并且不是在一个部落中，合并两个部落
                  if (beginIn && endIn && beginIn !== endIn) {
                    // 找出开始部落的索引
                    const startIndex = list.indexOf(beginIn)
                    // 在数组中删除这个部落
                    list.splice(startIndex,1)
                    // 找出结束部落的索引
                    const endIndex = list.indexOf(endIn)
                    // 在数组中删除这个部落
                    list.splice(endIndex,1)
                    // 合并两个部落
                    const all = [...beginIn,...endIn]
                    // 添加到数组中
                    list.push(all)
                  }
                  // 连线
                  start.neighbor.push(end)
                  end.neighbor.push(start)
                }

                function canLink(list, start, end){
                  // 开始部落
                  let beginIn = null
                  // 结束部落
                  let endIn = null
                  // 遍历已经连接的节点
                  for(let i = 0; i < list.length; i ++){
                    // 找出开始部落
                    if (list[i].indexOf(start) !== -1) {
                      beginIn = list[i]
                    }
                    // 找出结束部落
                    if (list[i].indexOf(end) !== -1) {
                      endIn = list[i]
                    }
                  }
                  // 如果起始和结束点都在同一个部落，表示不能连接，返回false, 其他情况表示可以连接
                  if (beginIn && endIn && beginIn === endIn) {
                    return false
                  }
                  return true
                }
              }
              kelusi2(arr, distance)
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