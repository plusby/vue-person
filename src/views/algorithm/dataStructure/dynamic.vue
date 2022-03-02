<template>
  <pre>
    <h2>动态规划</h2>
    把大问题划分为一个个小问题，再通过小问题推算出大问题

    问题：
      从给定的数字中，组合不相邻的数，使得结果最大

      number：1 2 3 2 1 5 7 6
      结果：15
      解析：1 3 5 6

      思路：
        计算到最后只有两种结果，
        如果选中6进行计算，那么上一次的计算就是包括5
        如果不选中6进行计算，那么上一次的计算就是7

        如果选中5，那么上一次的计算就是2
        如果不选中5，那么上一次的计算就是1

        如果选中7，那么上一次的计算就是1
        如果不选中7，那么上一次的计算就是5

        依次往前推，最后到1的时候，如果选择1直接返回1，如果选择1之前的数那么就是0

        优化点：从上面步骤中可以看出有大量的重复计算，因此可以保存之前计算的结果

      <codemirror
        ref="mycode"
        value="
          function maxValue(arr){
              function _maxValue(arr, i){
                // 如果i等于0的时候直接返回第一项，小于0直接返回0
                if(i === 0){
                  return arr[0]
                } else if(i <= 0) {
                  return 0
                }
                // 选择这项 用这项加上上上项的和
                const selected = arr[i] + _maxValue(arr, i - 2)
                // 不选择这项 直接得到上一项的和
                const unSelect = _maxValue(arr, i - i)
                // 返回最大值
                return Math.max(selected,unSelect)
              }
              return _maxValue(arr, arr.length-1)
          }
          const arr = [1,2,3,4,5]
          maxValue(arr) // 9
          const arr2 = [1, 2, 3, 2, 1, 5, 7, 6]
          maxValue(arr2) // 15

          // 进行优化
          function maxValue2(arr){
              const obj = {}
              function _maxValue(arr, i){
                // 如果i等于0的时候直接返回第一项，小于0直接返回0
                if(i === 0){
                  return arr[0]
                } else if(i <= 0) {
                  return 0
                }
                let selected
                // 选择这项 用这项加上上上项的和
                if (obj[i-2]) {
                  selected = obj[i-2]
                } else {
                  selected = arr[i] + _maxValue(arr, i - 2)
                  obj[i-2] = selected
                }
                // 不选择这项 直接得到上一项的和
                let unSelect
                if (obj[i-1]) {
                  selected = obj[i-1]
                } else {
                  unSelect = _maxValue(arr, i - i)
                  obj[i-1] = unSelect
                }
                // 返回最大值
                return Math.max(selected,unSelect)
              }
              return _maxValue(arr, arr.length-1)
          }
        "
        :options="cmOptions"
        class="code"/>

    问题1：
      <img src="../../../assets/search/m3.png" alt="">

      思路：
        到达目的地，只有从(m,n-1)或(m-1,n)这两个格子过去

        到(m,n-1)只有从(m,n-2)或(m-1,n-1)两个格子过去

        到(m-1,n)只有从(m-1,n-1)或(m-3,n)两个格子过去

        依次类推，得到 f(m,n) = f(m,n-1) + f(m-1,n)
        那么起始值f(1,1) = 0; f(1,2) = 1; f(1,3) = 1
        f(2,1) = 1; 在第一列或者第一行的路线只有1条，
        因此f(1,n) = 1; f(m,1) = 1;

      <codemirror
        ref="mycode"
        value="
          function roate(m, n){
              function _roate(m, n){
                // 如果m和n都是0的时候，表示在起始位置直接返回1
                if(m === 1 && n === 1){
                  return 0
                } else if(m < 1 || n < 1) {
                  return 0
                }
                if ((m === 1 && n > 1) || (n === 1 && m > 1)) {
                  return 1
                }
                return _roate(m-1, n) + _roate(m, n-1)
              }
              return _roate(m, n)
          }
          roate(7,3) // 28

          function rote2(m, n){
            if (m <= 0 || n <= 0) {
              return 0
            }
            const arr = []
            for(let i = 0; i < n; i++){
              const row = []
              for(let j = 0; j < m; j++){
                if (i === 0 || j === 0) {
                  row.push(1)
                } else {
                  row.push(null)
                }
              }
              arr.push(row)
            }

            for(let i = 1; i < n; i++){
              for(let j = 1; j < m; j++){
                arr[i][j] = arr[i-1][j] + arr[i][j-1]
              }
            }
            return arr[n-1][m-1]
          }


        "
        :options="cmOptions"
        class="code"/>

    问题3:
      给定一个m*n的网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小

      [1, 3, 1, 1]
      [1, 3, 1, 1]
      [1, 3, 1, 1]

      答案： 1, 3, 1, 1, 1, 1  => 8

      <codemirror
        ref="mycode"
        value="
          function min(arr){
              function _min(m, n){
                // 起点直接返回起点的值
                if(m === 0 && n === 0){
                  return arr[0][0]
                }
                // 全部小于0 就返回0
                if (m < 0 && n < 0) {
                  return 0
                }
                // 最左侧列上的时候
                if ( m > 0 && n <= 0) {
                  return _min(m-1,0) + arr[m][0]
                }
                // 最上面一行的时候
                if ( n > 0 && m <= 0) {
                  return _min(0,n-1) + arr[0][n]
                }
                return Math.min(_min(m,n-1) + arr[m][n], _min(m-1,n) + arr[m][n])
              }
              return _min(arr.length - 1,arr[0].length - 1)
          }
          const arr22 = [
            [1, 3, 1, 1],
            [1, 3, 1, 1],
            [1, 3, 1, 1],
          ]
          min(arr22) // 8

        "
        :options="cmOptions"
        class="code"/>



    问题2：
      给定零钱，每个零钱有无限使用次数，给定余额，从中找出最小找零的硬币

      零钱：1 2 3 5 10
      余额: 21

      结果：3
      解析：10 + 10 + 1

    问题3：
      给定零钱，每个零钱有指定的使用次数，给定余额，从中找出最小找零的硬币

      零钱：两个25美分、1个10美分和3个3美分
      余额：23

      结果：3
      解析：10 +  10 + 3

    问题：4
      给定零钱，给定余额，从中找出最小找零的硬币,和问题2个实现方式不同，通过动态规划实现

      零钱：1 3 5
      余额: 6

      结果：2
      解析： 3 + 3  或 1 + 5

      fi = n
      i: 表示余额
      n: 表示找零的次数

      f0 = 0  
      // 0元的时候无需找零
      f1 = f(1-1) + 1 = f0 + 1 = 1  
      // 余额为1元的时候只能通过零钱1元来找零，(1-1)表示余额1减去零钱1，+ 1表示找零了一次，也就等于f0加上找零一次得到结果1
      f2 = f(2-1) + 1 = f1 + 1 = 1 + 1 = 2 
      // 余额为2元的时候只能通过零钱1来找零，(2-1)表示余额2减去零钱1，+ 1表示找零了一次，也就等于f1加上找零一次，f1等于1所以结果就是2
      f3 = Min(f(3-1) + 1, f(3-3) + 1) = Min(f2 + 1, f0 + 1) = Min(3, 1) = 1
      // 余额为3元的时候能通过零钱1来找零也可以通过零钱3来找零，然后获取它们的最小值就是最少找零硬币，(3-1)表示余额3减去零钱1，+ 1表示找零了一次，也就等于f2+1 => 3, (3-3)表示余额3减去找零3，
      // +1表示当前找零一次， 也就等于f0 + 1 => 1, 获取3和1的最小值，最后1表示最少找零次数，依次类推，可以得到最终余额为i的最小找零次数
      f4 = Min( f(4-1) + 1, f(4-3) + 1) = Min( f3 + 1, f1 + 1) = Min(2,2) = 2
      f5 = Min( f(5-1) + 1, f(5-3) + 1, f(5-5) + 1 ) = Min(f4 + 1, f2 + 1, f0 + 1) = Min(3,3,1) = 1
      f6 = Min( f(6-1) + 1, f(6-3) + 1, f(6-5) + 1 ) = Min(f5 + 1, f3 + 1, f1 + 1) = Min(2,2,2) = 2

    问题5
      最短路线问题：
      给定一个线路网格，两点之间连线上的数字表示两点间的距离，试求一条由
      A到G的铺管线路，使得总距离为最短
      <img src="@img/minRoute.png" alt="">
      解析：
        只看从上个节点到当前节点的最短路线，
        A到A的值为0                A = 0
        A到B1只有一条路线为5      B1= A + 5 = 5
        A到B2只有一条路线为3      B2= A + 3 = 3
        B1到C1只有一条路线为1     C1= B1 + 1 = 6
        B1和B2到C2的路线分别为：B1 + 3 = 8 和 B2 + 8 = 11 因此取最小值 C2 = B1 + 3 = 8
        B1和B2到C3的路线分别为：B1 + 6 = 11 和 B2 + 7 = 10 因此取最小值 C3 = B2 + 7 = 10
        B2到C4只有一条路线为6     C4= B2 + 6 = 9
        C1和C2到D1的路线分别为：C1 + 6 = 12 和 C2 + 3 = 11 因此取最小值 D1 = C2 + 3 = 11
        C1、C2、C3和C4到D2的路线分别为：C1 + 8 = 14、C2 + 5 = 13、C3 + 3 = 13 和 C4 + 8 = 17 因此取最小值 D2 = C2 + 5 = 13 或 D2 = C3 + 3 = 13
        C3和C4到D3的路线分别为：C3 + 3 = 13 和 C4 + 4 = 13 因此取最小值 D3 = C3 + 3 = 13 或 D3 = C4 + 4 = 13
        D1到E1只有一条路线为2      E1= D1 + 2 = 13
        D1、D2、D3到E2的路线分别为：D1 + 2 = 13、D2 + 1 = 14、D3 + 3 = 16 因此取最小值 E2 = D1 + 2 = 13
        D2、D3到E3的路线分别为：D2 + 2 = 15、D3 + 3 = 16 因此取最小值 E3 = D2 + 2 = 15
        E1、E2、E3到F1的路线分别为：E1 + 3 = 16、E2 + 5 = 18、E3 + 6 = 21 因此取最小值 F1 = E1 + 3 = 16
        E1、E2、E3到F2的路线分别为：E1 + 5 = 18、E2 + 2 = 15、E3 + 6 = 21 因此取最小值 F2 = E2 + 2 = 15
        E1、E2到G的路线分别为：E1 + 4 = 20、E2 + 3 = 18 因此取最小值 G = E2 + 3 = 18
        最终结果就是从A到G的最短路线为18

    问题6
      青蛙跳台阶问题：

        普通青蛙跳台阶
          问题：
            一个青蛙一次只能跳一个台阶，或者跳两个台阶。那么这只青蛙跳到n个台阶有多少种情况？

          思路：
            如果这只青蛙跳到n个台阶，那么最后一次跳之前，它一定在n-1个台阶或者n-2个台阶上；
            那么这只青蛙跳到n个台阶上，就是跳到n-1个台阶加上n-2个台阶之和，依次往下推，
            跳到第一个台阶就一种方式跳一个台阶，跳第二个台阶有两种方式每次都跳一个台阶或者
            一次跳两个台阶，跳第三个台阶有三种可能，每次都跳一次，或者先跳一次再跳两阶，或者
            先跳两阶再跳一阶

            f(1) = 1
            f(2) = 2
            f(3) = 3
            f(4) = 5
            f(n) = f(n-1) + f(n-2)

        <codemirror
          ref="mycode"
          value="
            function steps(n){
              function _steps(n){
                if(n <= 0){
                  return 0
                }
                if(n===1){
                  return 1
                }
                if(n===2){
                  return 2
                }
                return steps(n-1) + steps(n-2)
              }
              return _steps(n)
            }
            steps(3) // 3
          "
          :options="cmOptions"
          class="code"/>      
            
        青蛙变态跳台阶
          问：
            一只青蛙，一次可以跳1个台阶，或者两个台阶，或三个台阶，或四个台阶...或n个台阶
            那么这只青蛙跳到n个台阶有多少种情况？

            跳1个台阶有1种方式
            跳两个台阶有2种方式 1,1 或 2
            跳三个台阶有4种方式 1,1,1 或 1,2 或 2,1 或 3
            跳四个台阶有8种方式 1,1,1,1 或 1,2,1 或 2,1,1 或 2,2 或 1,1,2 或 1,3 或 3,1 或 4

            f(1) = 1
            f(2) = 2 = f(1) + 1
            f(3) = 4 = f(1) + f(2) + 1
            f(4) = 8 = f(1) + f(2) + f(3) + 1
            f(n) = f(n-1) + f(n-2) + ... + f(1) + 1

          <codemirror
            ref="mycode"
            value="
              function steps2(n){
                function _steps(n){
                  if(n <= 0){
                    return 0
                  }
                  if(n===1){
                    return 1
                  }
                  if(n===2){
                    return 2
                  }
                  if(n===3){
                    return 4
                  }
                  let result = 0
                  for(let i = 0; i < n; i++){
                    result +=steps(i)
                  }
                  return result + 1
                }
                return _steps(n)
              }
              steps2(3) // 4
            "
            :options="cmOptions"
            class="code"/> 

      问题7：
        背包问题：
            给定商品的价格和大小，放入一个指定大小的背包中，使得放入的商品最大价值

        商品： [{m:30,v:20},{m:20,v:10},{m:10,v:5}]
        背包体积30
        <img src="../../../assets/search/bb1.png" alt="">
        通过图和代码可以看出递归是一直到最底层，并且是从终止递归的地方开始一层一层向上计算；
        通过递归可以实现上图的所有情况，通过图可以看出，每次都有选中b，不选中b,选中c，不选中c
        的重复计算，因此可以通过缓存进行缓存优化
        <codemirror
            ref="mycode"
            value="
              function package(goods,volume){
                function _package(index,rest){
                  // 当前商品已经超出最后一个那么直接返回0
                  if(index >= goods.length){
                    return 0
                  }
                  // 如果当前商品的体积大于了背包剩余空间，放不下直接放下一个
                  if (goods[index].v > rest) {
                    return _package(index+1,rest)
                  }
                  // 如果能放下，那么分别获取到选中和不选中这个商品
                  // 选中 当前商品加上下个商品的价值
                  const selected =  goods[index].m + _package(index+1,rest - goods[index].v)
                  // 没有选中 返回下个商品的价值
                  const unselected =  _package(index+1,rest)
                  // 返回最大值
                  return Math.max(selected, unselected)
                }
                return _package(0,volume)
              }
              const goods = [{m:30,v:20},{m:20,v:10},{m:10,v:5}]
              package(goods,30) // 50

              // 优化
              function package2(goods,volume){
                let obj = {}
                let obj2 = {}
                function _package(index,rest){
                  // 当前商品已经超出最后一个那么直接返回0
                  if(index >= goods.length){
                    return 0
                  }
                  let unselected
                  if (obj[index+1]) {
                    // 如果当前商品的体积大于了背包剩余空间，放不下直接放下一个
                    if (goods[index].v > rest) {
                      return obj[index+1]
                    }
                    unselected = obj[index+1]
                  } else {
                    obj[index+1] = _package(index+1,rest)
                    if (goods[index].v > rest) {
                      return _package(index+1,rest)
                    }
                    // 没有选中 返回下个商品的价值
                    unselected =  _package(index+1,rest)
                  }

                  // 选中 当前商品加上下个商品的价值
                  let selected
                  if (obj2[index+1]) {
                    selected =  obj2[index+1]
                  } else {
                    selected =  goods[index].m + _package(index+1,rest - goods[index].v)
                  }
                  
                  // 返回最大值
                  return Math.max(selected, unselected)
                }
                return _package(0,volume)
              }
            "
            :options="cmOptions"
            class="code"/> 

      问题8：
        最长子字符串问题：
            给定两个字符串，从中获取到相同的子字符串

         eg:
            boijdsjhfodisabcdefg132e
            popjdsopjhabcdefg321

            结果：
                ojdsjhabcdefg32

        <codemirror
            ref="mycode"
            value="
              function maxStr(str1,str2){
                function _maxStr(index1,index2){
                  // 如果字符串1的索引或者字符串2的索引分别超过他们的长度就直接返回空字符串
                  if (index1 >= str1.length || index2 >= str2.length) {
                    return ''
                  }
                  // 如果相等直接用当前字符加上下个相等的字符
                  if (str1[index1] === str2[index2]) {
                    return str1[index1] + _maxStr(index1+1,index2+1)
                  } else { // 不相同，那么str1的当前字符不动，移动str2进行比较，和str2不动，移动str1进行比较
                    const a = _maxStr(index1,index2+1) // 大量的递归非常卡，所以需要缓存优化
                    const b = _maxStr(index1+1,index2)
                    return a.length > b.length ? a : b
                  }
                }
                return _maxStr(0,0)
              }
              const str1 = 'boijdsjhfodisabcdefg132e'
              const str2 = 'popjdsopjhabcdefg321'
              maxStr(str1,str2) // ojdsjhabcdefg32


               // 通过缓存进行优化，否则计算非常慢
              function getMaxStr2(str1, str2){
                  let obj = {}
                  function _getMaxStr(str1Index, str2Index){
                      // 当前索引超出了str1或str2的长度直接返回空字符串
                      if (str1Index >= str1.length || str2Index >= str2.length) {
                          return ""
                      }
                      const key = str1Index + '-' + str2Index
                      if (obj[key]) {
                          return obj[key]
                      }
                      // 如果当前字符相同，那么就使当前字符和下字符进行连接
                      let val
                      if (str1[str1Index] === str2[str2Index]) {
                          val = str1[str1Index] + _getMaxStr(str1Index+1,str2Index+1)
                      } else { // 不相同，那么str1的当前字符不动，移动str2进行比较，和str2不动，移动str1进行比较
                          let sub1 = _getMaxStr(str1Index,str2Index+1)
                          let sub2 = _getMaxStr(str1Index+1,str2Index)
                          // 返回长度最大的子串
                          val = sub1.length > sub2.length ? sub1 : sub2
                      }
                      obj[key] = val // 进行缓存
                      return val
                  }
                  return _getMaxStr(0,0)
              }
            "
            :options="cmOptions"
            class="code"/> 

      问题9：
        斐波拉契数列
          0 1 1 2 3 5 8 13 21

        <codemirror
          ref="mycode"
          value="
           
          "
          :options="cmOptions"
          class="code"/> 
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
  mounted () {
    const result = this.maxResult([1, 2, 3, 2, 1, 5, 7, 6])
    console.log(result)
    const result2 = this.minMoney([1, 2, 5, 10], 21)
    console.log('result2', result2) // { num: 3, value: ["10*2", "1*1"] }
    const result3 = this.minMoney([1, 2, 5, 10, 20, 50], 59)
    console.log('result3', result3) // { num: 3, value: ["10*2", "1*1"] }
    const obj = [
      {
        key: 3,
        val: 3,
      },
      {
        key: 1,
        val: 10,
      },
      {
        key: 2,
        val: 25,
      },
    ]
    const result4 = this.minNumMoney(obj, 23)
    console.log('result4', result4) // -1
    const result5 = this.minNumMoney(obj, 16)
    console.log('result5', result5) // { num: 3, value: ["10*1", "3*2"] }
    const result6 = this.minOnly([1, 3, 5], 8)
    console.log('result6', result6) // { num: 3, value: ["10*1", "3*2"] }
    this.minRoute()
  },
  methods: {
    fblq(n){
      // 0 1 1 2 3 5 8 13 21
      function _fblq(i){
        if(i === 0){
          return 0
        }
        if(i === 1){
          return 1
        }
        if(i === 2){
          return 1
        }
        return _fblq(i-1) + _fblq(i-2)
      }
      // for循环实现
      function _fblq2(i){
        if(i === 0){
          return 0
        }
        if(i === 1){
          return 1
        }
        if(i === 2){
          return 1
        }
        let last1 = 1
        let last2 = 1
        let val = 0
        for(let j = 0; j < i; j ++){
          if (j >= 3) {
            val = last1 + last2
            last1 = last2
            last2 = val
          }
        }
        return val
      }

      return _fblq(n)
      
    },
    // 计算不相邻数之和的最大值(还需要缓存优化)
    maxResult(arr){
      function max(arr, i){
        if(i < 0) {
          return 0
        } else if(i === 0){
          return 1
        }
        // 获取到当前的数
        const curr = arr[i]
        // 如果选择当前的数，那么就用当前的数加上i-2的数和不选当前的数和i-1的数进行比较，取最大值
        // 选择当前的数
        const selected = curr + max(arr, i -2)
        // 不选择当前的数
        const unselected = max(arr, i - 1)
        return Math.max(selected, unselected)
      }
      return max(arr,arr.length-1)
    },
    // 计算无此数硬币最少找零数，传递的硬币一定是从小到大的排序之后的数组
    minMoney(arr, money){
      function min(arr, money, i){
        if(i < 0){
          // return 0
          return {
            num: 0,
            value: [],
          }
        }
        const curr = arr[i]
        if(curr > money){
          return min(arr, money, i-1)
        }
        // 当前值进行取余
        const balance = money%curr
        // 计算出使用当前值需要用几次
        const num = (money - balance)/curr
        // 有余额就返回当前硬币使用的次数加上下一个硬币使用的次数
        if (balance > 0) {
          // return (num + min(arr, balance, i-1))
          return {
            num: (num + min(arr, balance, i-1).num),
            value: [curr + '*' + num,...min(arr, balance, i-1).value]
          }
        }
        // return num
        return  {
            num: num,
            value: [curr + '*' + num]
          }
      }
      return min(arr, money, arr.length-1)
    },
    // 计算有次数的硬币最小找零，传递硬币一定是从小到大的排序之后的对象
    minNumMoney(arr, money){
      function min(arr, money, i){
        if(i < 0){
          // return 0
          return {
            num: 0,
            value: [],
          }
        }
        const curr = arr[i]
        if(curr.val > money){
          return min(arr, money, i-1)
        }
        // 当前值进行取余
        let balance = money%curr.val
        // 计算出使用当前值需要用几次
        let num = (money - balance)/curr.val
        // 使用次数超出了最大使用次数，使用最大次数进行求余额
        if (num > curr.key) {
          num = Math.min(num, curr.key)
          balance = money - curr.val * num
        }
        // 有余额就返回当前硬币使用的次数加上下一个硬币使用的次数
        if (balance > 0) {
          // return (num + min(arr, balance, i-1))
          return {
            num: (num + min(arr, balance, i-1).num),
            value: [curr.val + '*' + num,...min(arr, balance, i-1).value]
          }
        }
        // return num
        return  {
            num: num,
            value: [curr.val + '*' + num]
          }
      }
      const result = min(arr, money, arr.length-1)
      const total = result.value.reduce((total, item)=> {
        const arr = item.split('*')
        const val = arr[0]
        const num = arr[1]
        return total + val * num
      },0)
      return total === money ? result : -1
    },
    // 计算每个硬币只能找零一次
    minOnly(arr,balance){
        let obj = {} // 存储已经计算过的结果
        // 进行缓存优化，不需要计算过的每次都重新计算
        function min(balance){
          // 余额为0的就不用找返回0
          if (balance <= 0) {
            return 0
          }
          // 每一轮遍历的结果存到数组中
          let result = []
          // 遍历找零的零钱
          for(let i = 0; i < arr.length; i ++){
            // 余额大于零才会找零
            if(balance >= arr[i]){
              let key = balance - arr[i]
              if(obj[key] === undefined){
                const val = (min(key) + 1)
                result.push(val)
                obj[key] = val
              }else{
                result.push(obj[key])
              }
            }
          }
          // 获取当前一轮中的最小值
          result.sort((a,b)=>a-b)
          return result[0]
        }
        // 最简单的实现方式，并且没有进行缓存优化
        // function min(balance){
        //   // 余额为0的就不用找返回0
        //   if (balance <= 0) {
        //     return 0
        //   }
        //   // 每一轮遍历的结果存到数组中
        //   let result = []
        //   // 遍历找零的零钱
        //   for(let i = 0; i < arr.length; i ++){
        //     // 余额大于零才会找零
        //     if(balance >= arr[i]){
        //       const val = (min(balance - arr[i]) + 1)
        //       result.push(val)
        //     }
        //   }
        //   // 获取当前一轮中的最小值
        //   result.sort((a,b)=>a-b)
        //   return result[0]
        // }
        return min(balance)
    },
    minRoute(){
      const arr = [
       // A B1 B2 C1 C2 C3 C4 D1 D2 D3 E1 E2 E3 F1 F2 G
        [ 0, 5, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], // A
        [ 5, 0,-1, 1, 3, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], // B1
        [ 3,-1, 0,-1, 8, 7, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1], // B2
        [-1, 1,-1, 0,-1,-1,-1, 6, 8,-1,-1,-1,-1,-1,-1,-1], // C1
        [-1, 3, 8,-1, 0,-1,-1, 3, 5,-1,-1,-1,-1,-1,-1,-1], // C2
        [-1, 6, 7,-1,-1, 0,-1,-1, 3, 3,-1,-1,-1,-1,-1,-1], // C3
        [-1,-1, 6,-1,-1,-1, 0,-1, 8, 4,-1,-1,-1,-1,-1,-1], // C4
        [-1,-1,-1, 6, 3,-1,-1, 0,-1,-1, 2, 2,-1,-1,-1,-1], // D1
        [-1,-1,-1, 8, 5, 3, 8,-1, 0,-1,-1, 1, 2,-1,-1,-1], // D2
        [-1,-1,-1,-1,-1, 3, 4,-1,-1, 0,-1, 3, 3,-1,-1,-1], // D3
        [-1,-1,-1,-1,-1,-1,-1, 2,-1,-1, 0,-1,-1, 3, 5,-1], // E1
        [-1,-1,-1,-1,-1,-1,-1, 2, 1, 3,-1, 0,-1, 5, 2,-1], // E2
        [-1,-1,-1,-1,-1,-1,-1,-1, 2,-3,-1,-1, 0, 6, 6,-1], // E3
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 5, 6, 0,-1, 4], // F1
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5, 2, 6,-1, 0, 3], // F2
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4, 3, 0], // G
      ]
      
      const a = ['A','B1','B2','C1','C2','C3','C4','D1','D2','D3','E1','E2','E3','F1','F2','G']
      const obj = {}

      for(let i = 0; i < arr.length; i++){ // 行遍历 出发地
        for(let j = i; j < arr[i].length; j++){ // 列遍历 下一个目的地
          // 显示值
          // const value = Number(arr[i][j])
          // if(value > 0){
          //   // 获取上一条路线结果的值
          //   const last = obj[a[i]] || 0
          //   // 当前路线加上上一条路线的结果
          //   const result = value + last
          //   // 如果对应的字母已经有值就和当前结果进行比较，赋值最小值, 否则就直接赋值
          //   if(obj[a[j]]){
          //     if(obj[a[j]] > result){ // 之前的值大于当前的值直接赋值，否则不变
          //       obj[a[j]] = result
          //     }
          //   } else {
          //     // 把当前计算结果存到相应的字母上
          //     obj[a[j]] = result
          //   }
          // }
          // 显示路线
          const value = Number(arr[i][j])
          if(value > 0){
            // 获取上一条路线结果的值
            const last = (obj[a[i]] && obj[a[i]].value) || 0
            // 之前的路线
            const route = obj[a[i]] && obj[a[i]].route || ''
            // 当前路线加上上一条路线的结果
            const result = value + last
            // 如果对应的字母已经有值就和当前结果进行比较，赋值最小值, 否则就直接赋值
            if(obj[a[j]]){
              if(obj[a[j]].value > result){ // 之前的值大于当前的值直接赋值，否则不变
                obj[a[j]] = {route: route + a[i], value: result}
              }
            } else {
              // 把当前计算结果存到相应的字母上
              obj[a[j]] = {route: route + a[i], value: result}
            }
          }
        }
      }
      console.log('obj',obj['G']) // 18 或 {route: "AB1C2D1E2F2", value: 18}
      return obj['G']
    },
  }
}
</script>
<style lang="less" scoped>

</style>