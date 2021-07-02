<template>
  <pre>
    <h2>动态规划</h2>
    问题：
      从给定的数字中，组合不相邻的数，使得结果最大

      number：1 2 3 2 1 5 7 6
      结果：15
      解析：1 3 5 6



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









  </pre>
</template>
<script>
export default {
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