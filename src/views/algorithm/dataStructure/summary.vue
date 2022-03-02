<template>
    <div>
        <h1>数据结构</h1>
        <h4>什么是数据结构？</h4>
        <p>数据结构就是存储数据的结构</p>
        <h4>类别：</h4>
        <pre>
            1.线性数据结构
                一对一的关系，数组、队列和栈
            2.树形数据结构
                一对多的关系
            3.图
                多对多的关系
        </pre>
        <h2>练习题</h2>
        <h3>1. 字符串中的每个单词进行反转</h3>
        <p>{{ word }}</p>
        <button @click="revertByWord">反转</button>
        <p>{{ revertWord }}</p>
        <div class="answer-box">
            <el-collapse v-model="grayCodeFlag" >
                <el-collapse-item title="答案" name="1">
                    <codemirror
                        ref="mycode"
                        value="
                            function revertByWord (word) {
                                // 根据空格把单子分割成数组，然后再把每个单子分割成数组，
                                // 再进行反转，再组合成单词，再组合成句子

                                return word.splite(' ').map(item => {
                                    return item.splite('').reverse().join()
                                }).join()
                            }"
                        :options="cmOptions"
                        class="code"/>
                </el-collapse-item>
            </el-collapse>
        </div>
        
        <h3>2. 如下电话号码，点击任意键进行字母组合</h3>
        <div class="key" @click="keyBtn($event)">
            <span v-for="(item,index) in keyArr" :key="index"><i>{{index+1}}</i>{{item}}</span>
        </div>
        <p>组合的结果：</p>
        <div class="key">
            <span v-for="(item,index) in keyVal" :key="index">{{item}}</span>
        </div>
        <div class="answer-box">
            <el-collapse v-model="grayCodeFlag" >
                <el-collapse-item title="答案" name="1">
                    <codemirror
                        ref="mycode"
                        value="
                            const saveKeyArr = []
                            let timer;
                            function keyBtn (e) {
                                saveKeyArr.push(e.target.innerText.substr(1))
                                bounce(composeWord)
                            }
                            function bounce(callBack){
                                if (timer) {
                                    clearTimeout(timer)
                                }
                                setTimeout(() => {
                                    callBack()
                                },2000)
                            }
                            function composeWord (array)) {
                                /**
                                    原理：把每次点击的字母放在一个数组中，
                                    先组合数组的前两项，然后把结果替换为前两项，
                                    再一次往下计算两项进行替换，直到数字只有一项为止
                                */
                                // 如果数字只有一项直接返回
                                if (array.length <= 1) {
                                    return array
                                }
                                // 组合前两项
                                let arr = []
                                for(let i = 0; i < array[0].length; i++){
                                   for(let j = 0; j < array[1].length; j++){
                                       arr.push(array[0][i] + '' + array[1][j])
                                    } 
                                }
                                // 把新的结果替换为前两项
                                array.splice(0,2,arr)
                                // array大于一表示可以继续组合
                                if(array.length > 1){
                                    composeWord(array)
                                }
                                return array
                            }
                            "
                        :options="cmOptions"
                        class="code"/>
                </el-collapse-item>
            </el-collapse>
        </div>
        
        <h3>3. 卡牌分组</h3>
        <pre>
            给定一副牌，每张牌上都写着一个整数
            此时，你需要选定一个数字X,使我们可以将整副牌按下述规则分成1组或者更多组：
                每组都有X张牌
                组内所有的牌上都写着相同的整数
            仅当你可选的X>=2时返回true

            eg1:
                输入： [1,2,3,4,4,3,2,1]
                输出： true
                解释： 可行的分组是 [1,1] [2,2] [3,3] [4,4]

            eg2:
                输入： [1,1,1,2,2,2,3,3]
                输出： false
                解释： 可行的分组是 [1,1,1] [2,2,2] [3,3]

            eg3:
                输入:  [1,1,1,1,2,2]
                输出:  true
                解释： 可行的分组是 [1,1] [1,1] [2,2]
        </pre>
        <p>输入：</p>
        <input type="text" v-model="cardInput">
        <button @click="cardInputBtn">提交</button>
        <p>输出值：{{cardVal}} <span v-for="(item,index) in cardObj" :key="index">[<i v-for="(items,indexs) in item" :key="indexs">{{index}}</i>]</span> </p>
        <div class="answer-box">
            <el-collapse v-model="grayCodeFlag" >
                <el-collapse-item title="答案" name="1">
                    <codemirror
                        ref="mycode"
                        value="
                            /*
                                思路：
                                    1. 每张卡片上写着一个整数，因此可以根据这个进行排序，把相同的数字排在一起
                                    2. 遍历找出每个数字的数量，并且找出其中最小的数量的个数
                                    3. 使用每个数字的数量除以最小的个数，不能除正就返回False,否则就是true
                            */
                            function cardInputBtn (arr) {
                                // 进行从小到大的排序
                                arr.sort((a,b)=>a-b)
                                const obj = {}
                                let min = Number.MAX_SAFE_INTEGER
                                arr.forEach((item, index) => {
                                    // 如果不存在就进行初始化，否则就进行加1
                                    if (obj[item]) {
                                        obj[item] = obj[item] + 1
                                        // 最后一项也进行比较
                                        if (index === arr.length -1 && obj[index-1] < min) {
                                            min = obj[index-1]
                                        }
                                    } else {
                                        obj[item] = 1
                                        // 新的数字类型就使用上个类型和最小值进行比较
                                        if (index >= 1 && obj[index-1] < min) {
                                            min = obj[index-1]
                                        }
                                    }
                                })
                                // 判断每个数字类型的个数是否可以整除最小值
                                for(let key in obj){
                                    if (obj.hasOwnProperty(key)) {
                                        if(obj[key]%min!==0){
                                            return false
                                        }
                                    }
                                }
                                return true
                            }
                            "
                        :options="cmOptions"
                        class="code"/>
                </el-collapse-item>
            </el-collapse>
        </div>
        <h3>4. 种花问题</h3>
        <pre>
            假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

            给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

            示例 1:

            输入: flowerbed = [1,0,0,0,1], n = 1
            输出: True
            示例 2:

            输入: flowerbed = [1,0,0,0,1], n = 2
            输出: False
            注意:

            数组内已种好的花不会违反种植规则。
            输入的数组长度范围为 [1, 20000]。
            n 是非负整数，且不会超过输入数组的大小。
        </pre>
        <p>请输入花坛：</p>
        <input type="text" v-model="flowersInput">
        <p>请输入种植的数量：</p>
        <input type="number" v-model="flowersN">
        <button @click="flowersBtn">提交</button>
        <p>
            [
            <span v-for="(item,index) in flowersInput" :key="index">
                {{item}},
            </span>
            ]
        </p>
        <p>种植结果：{{flowersResult}}</p>
        <p>当前只能种植：{{flowersOnlyN}}株</p>
        <div class="answer-box">
            <el-collapse v-model="grayCodeFlag" >
                <el-collapse-item title="答案" name="1">
                    <codemirror
                        ref="mycode"
                        value="
                            /*
                                思路：
                                    1. 当前元素为0并且上一个和下一个都为0表示可以种树
                                    2. 当前元素为0并且为第一项时候，下一个元素为0表示可以种树
                                    3. 当前元素为0并且为最后一项的时候，上一个元素为0表示可以种树
                            */
                            function flowersBtn (arr,n) {
                                if (arr.length <= 0) {
                                    return false
                                }
                                if (arr.length === 1) {
                                    return arr[0] === 0 ? ture : false
                                }
                                let num = 0
                                for (let index = 0; index < arr.length; index++) {
                                    const item = arr[index]
                                    if (item === 0) {
                                        // 当前元素为第一项的时候并且下一个元素为0的时候可以种树
                                        if (index === 0 && arr[index+1] === 0) {
                                            num++
                                            // 把索引指向下一个元素
                                            index = index+1
                                        // 最后一项的时候 并且上一个元素为0
                                        } else if (index === arr.length-1 && arr[index-1] === 0){
                                            num++
                                        } else { // 中间值，只需要判断上下两个元素是否为0
                                            if (arr[index-1] === 0 && arr[index+1] === 0) {
                                                num++
                                                // 把索引指向下一个元素
                                                index = index+1
                                            }
                                        }
                                    }
                                }
                                // 如果num大于等于n表示可以种树
                                if (num >= n) {
                                    return true
                                }
                                return false
                            }
                            "
                        :options="cmOptions"
                        class="code"/>
                </el-collapse-item>
            </el-collapse>
        </div>
        <h3>5. 格雷编码</h3>
        <pre>
            格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。
            给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。即使有多个不同答案，你也只需要返回其中一种。
            格雷编码序列必须以 0 开头。
            示例 1:
                输入: 2
                输出: [0,1,3,2]
                解释:
                00 - 0
                01 - 1
                11 - 3
                10 - 2

                对于给定的 n，其格雷编码序列并不唯一。
                例如，[0,2,3,1] 也是一个有效的格雷编码序列。

                00 - 0
                10 - 2
                11 - 3
                01 - 1

            示例 2:
                输入: 0
                输出: [0]
                解释: 我们定义格雷编码序列必须以 0 开头。
                     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
                     因此，当 n = 0 时，其格雷编码序列为 [0]。
        </pre>
        <p>请输入整数：</p>
        <input type="number" v-model="grayCodeN">
        <button @click="grayCodeBtn">提交</button>
        <p>二进制系统</p>
        <p v-show="grayCodeBinaryResultArr">
            [
            <br/>
            <span v-for="(item,index) in grayCodeBinaryResultArr" :key="index">{{item}} <br/></span>
            ]
        </p>
        <p>输出结果</p>
        <p v-show="grayCodeResultArr">
            [
            <span v-for="(item,index) in grayCodeResultArr" :key="index">{{item}}{{ index === grayCodeResultArr.length-1 ? '' : ','}}</span>
            ]
        </p>
        <div class="answer-box">
            <el-collapse v-model="grayCodeFlag" >
                <el-collapse-item title="答案" name="1">
                    <pre class="code">
                        function grayCodeBtn(grayCodeN){
                            let grayCodeBinaryResultArr = grayCodeFn(grayCodeN)
                            return grayCodeBinaryResultArr.map(item=>{
                                return parseInt(item,2)
                            })
                        }

                        // 格蕾数函数封装
                        function grayCodeFn(n){
                            if(n===0){  
                                return [0]
                            }
                            if(n===1){
                                return [0,1]
                            }
                            let result = this.grayCodeFn(n-1)
                            let len = Math.pow(2,n)
                            let arr1 = []
                            let arr2 = []
                            for(let i = 0; i 小于 len/2;i++){
                                arr1.push(`0${result[i]}`)
                                arr2.push(`1${result[i]}`)
                            }
                            return [...arr1,...arr2.reverse()]
                        }
                        grayCodeBtn(2)
                    </pre>
                </el-collapse-item>
            </el-collapse>
        </div>
        <h3>6. 重复的子字符串</h3>
        <pre class="code">
            给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

            示例 1:
                输入: "abab"

                输出: True

                解释: 可由子字符串 "ab" 重复两次构成。

            示例 2:
                输入: "aba"

                输出: False

            示例 3:
                输入: "abcabcabcabc"

                输出: True

                解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
        </pre>
        <p>请输入：</p>
        <input type="text" v-model="repeatSubstrInput">
        <button @click="repeatSubstrBtn">提交</button>
        <p>结果：</p>
        <p>{{repeatSubstrResult}}</p>
        <div class="answer-box">
            <el-collapse  >
                <el-collapse-item title="答案" name="1">
                    <pre class="code">
                        <!-- 方法一
                            1. 让字符串s重复一次
                            2. 去掉首位字符，获取子字符串b
                            3. 查看b中是否包含s
                            4. 如果包含表示是重复的，否则不是
                         -->
                        var repeatedSubstringPattern = function (s) {
                            const doubleS = s + s;
                            const sliceS = doubleS.slice(1, doubleS.length - 1);
                            return sliceS.indexOf(s) > -1 ? true : false;
                        };
                        <!-- 
                            方式二

                        -->

                        function repeatStr(s){
                            const reg =  /^(\w+)\1+$/g
                            return reg.test(s)
                        }
                        
                    </pre>
                </el-collapse-item>
            </el-collapse>
        </div>
        <h3>7. 正则表达式匹配</h3>
        <pre class="code">
            给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

            '.' 匹配任意单个字符
            '*' 匹配零个或多个前面的那一个元素
            所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

            示例 1：

            输入：s = "aa" p = "a"
            输出：false
            解释："a" 无法匹配 "aa" 整个字符串。

            示例 2:

            输入：s = "aa" p = "a*"
            输出：true
            解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。

            示例 3：

            输入：s = "ab" p = ".*"
            输出：true
            解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。

            示例 4

            输入：s = "aab" p = "c*a*b"
            输出：true
            解释：因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。

            示例 5：

            输入：s = "mississippi" p = "mis*is*p*."
            输出：false

            提示：
            0 小于= s.length 小于= 20
            0 小于= p.length 小于= 30
            s 可能为空，且只包含从 a-z 的小写字母。
            p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
            保证每次出现字符 * 时，前面都匹配到有效的字符
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入s" v-model="regSSubstrInput">
        <input type="text" placeholder="请输入p" v-model="regPSubstrInput">
        <button @click="regSubstrBtn">提交</button>
        <p>结果： {{regSubResult}}</p>
        
        <h3>8. 冒泡排序</h3>
        <pre class="code">
            升序:
                每一轮遍历都是前后两个进行比较，前者比后者大就交换位置,遍历完这一轮之后,最大值被排到了这一轮的最后
                利用这个特点可以优化很多排序算法,降序则相反

            简单的说就是每一轮遍历就是把这一轮中的最大值排到最右边,遍历的轮数就是数组的长度-1,最后一轮无需再遍历,
            每一轮都是从0遍历到当前轮的值

            eg:
                有一个数组的长度为10,那么遍历的轮数就是9轮,第一轮要遍历9次,从0到9找出这一轮的最大值排列到最右边,第二轮
                就是遍历8次从0-8找出这一轮的最大值,然后第三轮七次,依次递减
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="bubblingInput">
        <p v-show="bubblingResult.length">
            [
            <span v-for="(item,index) in bubblingResult" :key="index">{{item}}{{ index === bubblingResult.length-1 ? '' : ','}}</span>
            ]
        </p>
        <button @click="bubblingBtn">提交</button>
        <el-collapse  >
            <el-collapse-item title="答案" name="2">
                <pre class="code">
                    function bubblingBtn (arr) {
                        if (!arr.length) {
                            return
                        }
                        for(let i = arr.length - 1, temp; i > 0; i --){ // 遍历轮数
                            for(let j = 0; j 《 i; j ++ ){ // 每轮遍历次数 排出这一轮的最大值
                                if(Number(arr[j]) > Number(arr[j+1])){
                                    temp = arr[j+1]
                                    arr[j+1] = arr[j]
                                    arr[j] = temp
                                }
                            }
                        }
                        return arr
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>

        <h3>9. 选择排序</h3>
        <pre class="code">
            拿当前值和后面的进行比较，找出比当前值小的值标记为最小值，然后一次进行比较，比较完之后把最小值和当前值进行交换位置
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="selectInput">
        <p v-show="selectResult.length">
            [
            <span v-for="(item,index) in selectResult" :key="index">{{item}}{{ index === selectResult.length-1 ? '' : ','}}</span>
            ]
        </p>
        <button @click="selectBtn">提交</button>
        <el-collapse  >
            <el-collapse-item title="答案" name="3">
                <pre class="code">
                    function selectBtn(arr){
                        if(!arr.length){
                            return 
                        }
                        for(let i = 0,min, z; i 《 arr.length; i++){
                            min = Number(arr[i])
                            for(let j = i+1; j 《 arr.length; j++){
                                if(min > Number(arr[j])){
                                    min = arr[j]
                                    z = j
                                }
                            }
                            arr[z] = arr[i]
                            arr[i] = min
                        }
                        return arr
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>

        <h3>10. 最大间距</h3>
        <pre class="code">
            给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
            如果数组元素个数小于 2，则返回 0。

            示例 1:

                输入: [3,6,9,1]
                输出: 3
                解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。

            示例 2:

                输入: [10]
                输出: 0
                解释: 数组元素个数小于 2，因此返回 0。
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="maxSpacingInput">
        <p v-show="maxSpacingResult">
           {{ maxSpacingResult }}
        </p>
        <button @click="maxSpacingBtn">提交</button>
        <el-collapse  >
            <el-collapse-item title="答案" name="4">
                <pre class="code">
                    function maxSpacingBtn(arr){
                        if(arr.length 《 2){
                            return 0
                        }
                        if(arr.length === 2){
                            return Math.abs(Number(arr[0])-arr[1])
                        }
                        let max = 0
                        console.log('arr',arr)
                        for(let i = arr.length - 1, empt; i > 0; i--){
                            for(let j = 0; j 《 i; j ++){
                                if(Number(arr[j]) > Number(arr[j+1])){
                                    empt = arr[j+1]
                                    arr[j+1] = arr[j]
                                    arr[j] = empt
                                }
                            }
                            if(i !== arr.length - 1 ){
                                let val = Number(arr[i+1]) -  Number(arr[i])
                                if(val >  Number(max)){
                                    max = val
                                }
                            }
                        }
                        return max
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>
        <h3>11. 按奇偶排序数组</h3>
        <pre class="code">
            给定一个非负整数数组 A，返回一个数组，在该数组中， A 的所有偶数元素之后跟着所有奇数元素。

            你可以返回满足此条件的任何数组作为答案

            示例 1:

                输入：[3,1,2,4]
                输出：[2,4,3,1]
                输出 [4,2,3,1]，[2,4,1,3] 和 [4,2,1,3] 也会被接受。
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="oddEvenInput">
        <p v-show="oddEvenResult.length">
            [
            <span v-for="(item,index) in oddEvenResult" :key="index">{{item}}{{ index === oddEvenResult.length-1 ? '' : ','}}</span>
            ]
        </p>
        <button @click="oddEvenBtn">提交</button>
        <el-collapse  >
            <el-collapse-item title="答案" name="5">
                <pre class="code">
                    思路一：
                    function oddEvenBtn(arr){
                        let oddArr = []
                        let evenArr = []
                        arr.forEach(item=>{
                            if(item%2===0){ // 偶数
                                oddArr.push(item)
                            }else{  // 奇数
                                evenArr.push(item)
                            }
                        })
                        return [...oddArr,...evenArr]
                    }

                    思路二：
                    function oddEvenBtn(arr){
                        // 使用sort排序，返回正数就调换位置，偶数的余数都是0，奇数的余数都是1， 0 - 1返回负数
                        return arr.sort((a,b)=>(a%2 - b%2))

                        /**
                            1转为二进制: 0001  奇数转为二进制最后一个都是1， 偶数转为二进制最后一位是0
                            通过 & 运算符得到 偶数得到的是 0， 奇数得到的是1，再进行相减再排序
                            “&”运算符（位与）用于对两个二进制操作数逐位进行比较，并根据下表所示的换算表返回结果。
                         */
                        return A.sort((a, b) => (a & 1) - (b & 1))
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>

        <h3>12. 按奇偶排序数组2</h3>
        <pre class="code">
            给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

            对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

            你可以返回任何满足上述条件的数组作为答案。

            示例 1:

                输入：[4,2,5,7]
                输出：[4,5,2,7]
                解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="oddEvenInput2">
        <p v-show="oddEvenResult2.length">
            [
            <span v-for="(item,index) in oddEvenResult2" :key="index">{{item}}{{ index === oddEvenResult2.length-1 ? '' : ','}}</span>
            ]
        </p>
        <button @click="oddEvenBtn2">提交</button>
        <h3>13. 数组中的第k个最大元素</h3>
        <pre class="code">
            在未排序的数组中找到第k个最大元素，请注意，你需要找到的是数组排序
            后的第k个最大的元素，而不是第k个不同的元素

            示例：
                输入：[3,2,1,5,6,4] 和 k = 2
                输出: 5

            示例2:
                输入： [3,2,3,1,2,4,5,5,6] 和 k = 4
                输出：4
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="arrMaxKInput">
        <input type="text" placeholder="请输入最大K" v-model="arrMaxk">
        <button @click="arrMaxKBtn">提交</button>
        <p>结果: {{ arrMaxKVal }}</p>
        <el-collapse  >
            <el-collapse-item title="答案" name="6">
                <pre class="code">
                    function arrMaxKBtn(arr,arrMaxk){
                        // 升序:
                        // 每一轮遍历都是前后两个进行比较，前者比后者大就交换位置,遍历完这一轮之后,最大值被排到了这一轮的最后
                        // 利用这个特点可以优化很多排序算法,降序则相反
                        // 利用冒泡排序的特点 每排列一次就可以得到当前排列的最大值，所以利用这个特点不需要排序整个数组就可以得到答案
                        for(let i = arr.length - 1,tem; i > 0; i --){
                            for(let j = 0; j 《 i; j ++){
                                if(arr[j] > arr[j+1]){
                                    tem = arr[j+1]
                                    arr[j+1] = arr[j]
                                    arr[j] = tem
                                }
                            }
                            if(Number(arrMaxk) === arr.length - i){
                                return  arr[i]
                            }
                        }
                    }
                </pre>
            </el-collapse-item>
        </el-collapse>
        <h3>14. 缺失的第一个正数</h3>
        <pre class="code">
            给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

            示例 1:
                输入: [1,2,0]
                输出: 3

            示例 2:

                输入: [3,4,-1,1]
                输出: 2
            示例 3:

                输入: [7,8,9,11,12]
                输出: 1
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="losePositiveNumInput">
        <button @click="losePositiveNumBtn">提交</button>
        <p>结果: {{ losePositiveNumVal }}</p>
        <el-collapse  >
            <el-collapse-item title="答案" name="7">
                <pre class="code">
                    function  losePositiveNumBtn(arr){
                        if(!arr.length){
                            return 1
                        }
                        let z = 1
                        let obj = {}
                        // 冒泡降序
                        for(let i = arr.length - 1,tem; i >= 0; i --){
                            for(let j = 0; j 《 i; j++){
                                if(arr[j] 《 Number(arr[j+1])){
                                    tem = arr[j+1]
                                    arr[j+1] = arr[j]
                                    arr[j] = tem
                                }
                                
                            }
                            if(obj[arr[i]]){ // 去重
                                arr.splice(i,1)        
                                arr[i] > 0 && z-- // 正数才减一
                            }
                            obj[arr[i]] = true
                            // 正数并且不等于z的时候就返回这个z
                            if(Number(arr[i]) > 0 && Number(arr[i]) !== z){
                                return z
                            }
                            // 正数才加1
                            if(Number(arr[i]) > 0){
                                z++
                            }
                        }
                        return z

                        // 方法2
                        let len = arr.length
                        for(let i = 0; i 《 len; i++){
                            while(arr[i] > 0 && arr[i] 《= len && arr[i] !== arr[arr[i]-1]){
                                let temp = arr[i]
                                arr[i] = arr[arr[i]-1]
                                arr[arr[i]-1] = temp
                            }
                        }

                        for(let i = 0; i 《 len; i++){
                            if(arr[i] !== i + 1){
                                return i + 1
                            }
                        }
                        return len + 1
                    }

                    
                </pre>
            </el-collapse-item>
        </el-collapse>
        <h3>15. 连续字符串</h3>
        <pre>
            给定一个字符串S,获取其中最长连续字符串的长度
            eg：
                aaacd  得到3
                aabbbbabc 得到4
                fdsddfffffdsasfdsdff 得到5
                abshd  得到1
                ""  得到0
        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="continuousStrInput">
        <button @click="continuousStrBtn">提交</button>
        <p>结果: {{ continuousStrVal }}</p>
        <el-collapse  >
            <el-collapse-item title="答案" name="7">
                <pre class="code">
                <codemirror
                    ref="mycode"
                    value="
                        /*
                            连续字符串
                            通过指定索引法
                            1. 遍历字符串，并且遍历要超出字符串的长度
                            2. 比较当前字符和前面一个字符是否相等
                            3. 如果不相等表示已经找完了前面相同的字符，通过当前的索引减去上次不相等的索引，
                            得到相同字符的长度，然后再和保存的最大的字符长度进行比较，这样遍历完就找出了最大相同的字符
                        */
                        continuousStrBtn () {
                            let str = this.continuousStrInput
                            let j = 0
                            let max = 0
                            // 注意等于，否则最后一个判断不了
                            for(let i = 0; i <= str.length; i ++){
                                if (str[i] !== str[i-1]) {
                                    const len = i - j
                                    if (len > max) {
                                        max = len
                                    }
                                    j = i
                                }
                            }
                            this.continuousStrVal = max
                        }
                    "
                    :options="cmOptions"
                    class="code"/>
                </pre>
            </el-collapse-item>
        </el-collapse>
        <h3>16. 验证回文字符串</h3>
        <pre>
            给定一个字符串，验证它是否是回文字符串，只考虑数字和字母，可以忽略空格和符号
            eg:
                输入："A man, a plan, a canal: Panama"
                输出： ture

                输入："race a car"
                输出：false

                输入：""
                输出：true

                输入：" "
                输出：true

                输入："1"
                输出：true

                输入："1a"
                输出：false

        </pre>
        <p>请输入：</p>
        <input type="text" placeholder="请输入" v-model="zyEqualInput">
        <button @click="zyEqualBtn">提交</button>
        <p>结果: {{ zyEqualVal }}</p>
        <el-collapse  >
            <el-collapse-item title="答案" name="7">
                <pre class="code">
                <codemirror
                    ref="mycode"
                    value="
                        /*
                            验证回文串
                            1. 定义前后两个指针
                            2. 判断前后两个字符是否是字母或数字
                            3. 是的话进行判断是否相等，不相等直接返回false
                            4. 不是数字或字母向前或向后移动一位指针进行比较
                            5. 当前后指针相等的时候终止循环
                        */
                        zyEqualBtn () {
                            let leftIndex = 0
                            let rightIndex = this.zyEqualInput.length-1
                            while(leftIndex < rightIndex){
                                let leftVal = isWord(this.zyEqualInput[leftIndex])
                                let rightVal = isWord(this.zyEqualInput[rightIndex])
                                if (leftVal && rightVal) {
                                    if (this.zyEqualInput[leftIndex] !== this.zyEqualInput[rightIndex]) {
                                        this.zyEqualVal = false
                                        return false
                                    } else {
                                        leftIndex++
                                        rightIndex--
                                    }
                                } else {
                                    if (!leftVal) {
                                        leftIndex++
                                    } else {
                                        rightIndex--
                                    }
                                }
                            }
                            this.zyEqualVal = true
                            return true
                            // 判断是数字或字母，通过ASCALL码进行比较，字符串的比较就是隐士的ASCALL码比较 数字1-8的ascll码比0的ascall码大比9的小
                            // 字母也是一样
                            function isWord(str){
                                if ((str >= '0' && str <= '9') || (str >= 'a' && str <= 'z') || (str >= 'A' && str <= 'Z')) {
                                    return true
                                }
                                return false
                            }
                        },
                    "
                    :options="cmOptions"
                    class="code"/>
                </pre>
            </el-collapse-item>
        </el-collapse>
        <h3>17. 字符串计算</h3>
        <pre>
            给定一个字符串，输出计算结果
            一个字符串S是一个有效的四则运算表达式，请计算该表达式的值

            示例：
                '1+2' 得到3
                '2*(2+3)' 得到10
                '(15%(5-3)+6)*(2+3)' 得到35
            
            字符串s至少包含一个运算符
            字符串s中的操作数均为数字字面量，但可能包含小数

        </pre>
        <el-collapse  >
            <el-collapse-item title="答案" name="7">
                <pre class="code">
                <img src="../../../assets/img/com.png" alt="">
                <img src="../../../assets/img/com33.png" alt="">
                <codemirror
                    ref="mycode"
                    value="
                       /*
                        通过栈实现计算
                        一个栈存放运算符
                        一个栈存放数字

                        一个运算符的操作对象，用于计算

                        一个获取字符串开头的字符，判断是数字还是运算符的函数

                        如果是数字存入数字栈中

                        如果是运算符，判断运算符的类型
                            如果是(直接存入运算符栈中
                            如果是)循环进行计算知道遇到(就结束，
                            如果当前运算符栈顶是(那么把当前的运算符直接放入运算符栈中
                            如果当前运算符的优先级大于栈顶运算符的优先级直接放入运算符栈中
                            否则就进行计算

                       */
                        // 实现一个栈
                        function Stack(){
                            this._datas = []
                        }
                        Stack.prototype.push = function(data){
                            this._datas.push(data)
                        }
                        Stack.prototype.pop = function(){
                            return this._datas.pop()
                        }
                        Stack.prototype.getTop = function(data){
                            return this._datas[this._datas.length-1]
                        }


                        // 创建一个对象，实现属性为运算符进行计算，并且具有优先级
                        var operators = {
                            '+': {
                                level: 1,
                                compute: function(a,b){
                                    return a + b
                                }
                            },
                            '-': {
                                level: 1,
                                compute: function(a,b){
                                    return a - b
                                }
                            },
                            '*': {
                                level: 2,
                                compute: function(a,b){
                                    return a * b
                                }
                            },
                            '/': {
                                level: 2,
                                compute: function(a,b){
                                    return a / b
                                }
                            },
                            '%': {
                                level: 2,
                                compute: function(a,b){
                                    return a % b
                                }
                            },
                        }

                        /*
                            四则运算符扫描器
                        */
                        function Scanner(s){
                            // 取消字符串中所有的空白字符
                            this.s = s.replace(/\s/g, "")
                            // 匹配字符串开头的数字
                            this.numberExp = /^\d+(\.\d+)?/
                            // 匹配字符串开头的符号
                            this.opExp = /^[\(\)\+\-\*\%\/]/

                        }
                        /*
                            从字符串开头的位置，获取一个符号或者数字
                        */
                        Scanner.prototype.next = function(){
                            if(this.s.length === 0){
                                return null
                            }
                            // 获取字符串开头的数字
                            const num = this.s.match(this.numberExp)
                            var result;
                            // 没有匹配上数字
                            if(!num){
                                // 取出符号
                                result = {
                                    type: 'operator',
                                    value: this.s[0]
                                }
                                // 去除取出的符号
                                this.s = this.s.substr(1)
                            }else{
                                // 取出数字
                                result = {
                                    type: 'number',
                                    value: +num[0]
                                }
                                this.s = this.s.substr(num[0].length)
                            }
                            return result
                        }
                        var scan = new Scanner('2.5*(2+3)')
                        console.log(scan.next()) // { type: 'number', value: 2.5}
                        console.log(scan.next()) // { type: 'operator', value: '*'}
                        
                        /*
                        
                        运算一个表达式返回一个结果
                        */
                        function compute(s){
                            var numStack = new Stack() // 数字栈
                            var opStack = new Stack() // 符号栈

                            // 运算
                            function _compute(){
                                var top = opStack.getTop()
                                if(!top){ // 栈顶为空就直接返回
                                    return
                                } else if(top === '(') { // 是左括号直接弹出
                                    opStack.pop()
                                    return false
                                } else{ // 否则就是运算符
                                    opStack.pop() // 弹出符号
                                    // 弹出两个数字
                                    var num1 = numStack.pop()
                                    var num2 = numStack.pop()
                                    // 通过运算符获取到对应的计算函数进行计算
                                    const result = operators[top].compute(num2,num1)
                                    numStack.push(result) // 计算结果存入数字栈中
                                    return true
                                }
                            }
                            /*
                                    处理一次操作
                                    12 + 1 * 2 / 3*(3+4)
                                */
                                function _handleOperation(op){
                                    var topOp = opStack.getTop() // 获取栈顶
                                    if(op === ')'){ // 遇到),运算到左括号出栈为止
                                        while(_compute()){}
                                    } else if ( // 如果符号栈为空，或当期符号是(,或栈顶是(，当期符号优先级高，直接入栈
                                        !topOp ||
                                        op === '(' ||
                                        topOp === '(' ||
                                        operators[op].level > operators[topOp].level
                                    ){
                                        opStack.push(op)
                                    } else { // 如果当前符号小于等于栈顶符号，运算，递归查看
                                        _compute() // 运算一次
                                        _handleOperation(op)
                                    }
                                }
                                
                                var scancer = new Scanner(s)
                                var next 
                                while ((next = scancer.next())) {
                                    if(next.type === 'number'){
                                        numStack.push(next.value)
                                    }else{
                                        _handleOperation(next.value)
                                    }
                                }

                                // 将符号栈清空
                                while (_compute()) {}
                                console.log('numStack',numStack,opStack)
                                return numStack.getTop()

                        }
                        
                        const result = compute('2.5*(2+3)')
                        console.log('result', result)
                        const result2 = compute('2.5*(2*5+3 -1 *3)/2')
                        console.log('result2', result2)
                    "
                    :options="cmOptions"
                    class="code"/>
                </pre>
            </el-collapse-item>
        </el-collapse>
        <h3>18. 区间调度</h3>
        <pre>
            有许多[start, end]的闭区间，请设计一个算法，算出这些区间中，最多有几个互不相交的区间？
            eg:
                intvs = [[1,3],[2,4],[3,6]]

            这些区间中最多有两个互不相交，[1,3],[3,6]

        </pre>
        <el-collapse  >
            <el-collapse-item title="答案" name="7">
                <pre class="code">
                <img src="../../../assets/img/com.png" alt="">
                <img src="../../../assets/img/com33.png" alt="">
                <codemirror
                    ref="mycode"
                    value="
                      function intervalSchedule(arr){
                          if (!arr.length) {
                              return 0
                          }
                          // 根据end给数组进行升序
                          const sortArr = arr.sort((a,b) => a[1] - b[1])
                          let count = 1
                          let end = sortArr[0][1]
                          console.log(sortArr)
                          for(let item in sortArr){
                              debugger
                              const start = item[0]
                              if (start >= end) {
                                end = item[1]
                                count++
                              }
                          }

                          return count
                      }
                    "
                    :options="cmOptions"
                    class="code"/>
                </pre>
            </el-collapse-item>
        </el-collapse>
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
            zyEqualVal: '',
            zyEqualInput: '',
            continuousStrInput: '',
            continuousStrVal: '',
            cmOptions: {
                value: '',
                // mode: 'text/javascript',
                theme: 'idea',
                readOnly: true,
                lineNumbers: false, // 是否显示行数
                showCursorWhenSelecting: true,
            },
            word: "Let's go to schools",
            revertWord: '',
            keyArr: ['','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz'],
            saveKeyArr: [],
            timer: null,
            keyVal: [],
            cardInput: '',
            cardVal: false,
            cardObj: {},
            flowersInput: '',
            flowersN: 1,
            flowersResult: false,
            flowersOnlyN: 0,
            grayCodeN: 0,
            grayCodeBinaryResultArr: [],
            grayCodeResultArr: [],
            grayCodeFlag: ['2'],
            repeatSubstrInput: '',
            repeatSubstrResult: '',
            regSSubstrInput: '',
            regPSubstrInput: '',
            regSubResult: '',
            bubblingInput: '',
            bubblingResult: [],
            selectInput: '',
            selectResult: [],
            maxSpacingInput: '',
            maxSpacingResult: '',
            oddEvenInput: '',
            oddEvenResult: [],
            oddEvenInput2: '',
            oddEvenResult2: [],
            arrMaxKInput: [],
            arrMaxKVal: '',
            arrMaxk: 1,
            losePositiveNumInput: [],
            losePositiveNumVal: ''
        }
    },
    mounted () {

    },
    components: {
        codemirror,
    },
    methods: {
        /*
            验证回文串
            1. 定义前后两个指针
            2. 判断前后两个字符是否是字母或数字
            3. 是的话进行判断是否相等，不相等直接返回false
            4. 不是数字或字母向前或向后移动一位指针进行比较
            5. 当前后指针相等的时候终止循环
        */
        zyEqualBtn () {
            let leftIndex = 0
            let rightIndex = this.zyEqualInput.length-1
            while(leftIndex < rightIndex){
                let leftVal = isWord(this.zyEqualInput[leftIndex])
                let rightVal = isWord(this.zyEqualInput[rightIndex])
                if (leftVal && rightVal) {
                    if (this.zyEqualInput[leftIndex] !== this.zyEqualInput[rightIndex]) {
                        this.zyEqualVal = false
                        return false
                    } else {
                        leftIndex++
                        rightIndex--
                    }
                } else {
                    if (!leftVal) {
                        leftIndex++
                    } else {
                        rightIndex--
                    }
                }
            }
            this.zyEqualVal = true
            return true
            // 判断是数字或字母，通过ASCALL码进行比较，字符串的比较就是隐士的ASCALL码比较 数字1-8的ascll码比0的ascall码大比9的小
            // 字母也是一样
            function isWord(str){
                if ((str >= '0' && str <= '9') || (str >= 'a' && str <= 'z') || (str >= 'A' && str <= 'Z')) {
                    return true
                }
                return false
            }
        },
        /*
            连续字符串
            通过指定索引法
            1. 遍历字符串，并且遍历要超出字符串的长度
            2. 比较当前字符和前面一个字符是否相等
            3. 如果不相等表示已经找完了前面相同的字符，通过当前的索引减去上次不相等的索引，
               得到相同字符的长度，然后再和保存的最大的字符长度进行比较，这样遍历完就找出了最大相同的字符
        */
        continuousStrBtn () {
            let str = this.continuousStrInput
            let j = 0
            let max = 0
            // 注意等于，否则最后一个判断不了
            for(let i = 0; i <= str.length; i ++){
                if (str[i] !== str[i-1]) {
                    const len = i - j
                    if (len > max) {
                        max = len
                    }
                    j = i
                }
            }
            this.continuousStrVal = max
        },
        // 单词反转
        revertByWord(){
            /*
                方式一

                split(separator,howmany)
                - separator	必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。
                - howmany	可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的
                            子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都
                            会被分割，不考虑它的长度。
            */
            // this.revertWord = this.word.split(' ').map(item=>{
            //     return item.split('').reverse().join('')
            // }).join(' ')
            /**
             * 方式二  通过正则
             * \s 包括空格、换行、tab缩进等所有的空白
             */
            // this.revertWord = this.word.split(/\s/g).map(item=>{
            //     return item.split('').reverse().join('')
            // }).join(' ')

            /*
                方式三  正则

                "\w"：匹配字母，数字，下划线。等价于'[A-Za-z0-9_]'
                "."：匹配除了换行符以外的任何字符。
                [ ]就是匹配中括号里的任意一个字符
                [\w'] 匹配任意字母或数字或下划线或'
            */
            this.revertWord = this.word.match(/[\w']+/g).map(item=>{
                console.log('item',item)
                return item.split('').reverse().join('')
            }).join(' ')
        },
        // 键盘按钮
        keyBtn (e) {
            this.saveKeyArr.push(e.target.innerText.substr(1))
            console.log(this.timer)
            this.bounce(this.composeWord,this.saveKeyArr).then(res=>{
                this.keyVal = res
            })
        },
        // 防抖
        bounce(callBack,arg){
            return new Promise((res)=>{
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    callBack && callBack(arg)
                    console.log(arg)
                    res([...arg[0]])
                    this.timer = null
                    this.saveKeyArr = []
                },3000)
            })
        },
        // 字母组合
        /*
            思路： 点击任意几个键。把每个键上的字母存储在数组中，
            eg [abc,def,ghi],然后遍历前两项进行组合，组合完毕之后把组合之后的结果替换成前两项，得到
            [[ad,ae,af...],ghi],然后再遍历这个数组的前两项进行组合，再把前两项替换成组合后的那一项，
            最后数组只有一项了，便是最终的组合结果
        */
        composeWord (arr) {
            let temp = []
            if(arr.length <= 1){
                return arr
            }
            // 组合arr的第0个和第一个字母
            for(let i = 0; i < arr[0].length; i++){
                for(let j = 0; j < arr[1].length; j++){
                    temp.push(`${arr[0][i]}${arr[1][j]}`)
                }
            }
            arr.splice(0,2,temp) // 前面两个组合完毕，把前面两项替换成组合之后的一项继续往下组合
            // arr大于一表示可以继续组合
            if(arr.length > 1){
                this.composeWord(arr)
            }
            return arr
        },
        /*
            卡牌

        */
        cardInputBtn () {
            let arr = this.cardInput.split('')
            console.log(arr)
            arr.sort((a,b)=>a-b)
            let obj = {}
            let min = Number.MAX_SAFE_INTEGER
            arr.forEach((item,index)=>{
                if(obj[item]){
                    obj[item] += 1
                    // 如果是最后一项再进行比较
                    if(index === (arr.length-1) && obj[arr[index-1]] < min){
                        min = obj[arr[index-1]]
                    }
                } else {
                    obj[item] = 1
                    // 每获取一个新的key的时候就和上一个key的值进行比较，使得每一个key的值都进行了比较找出了最小值
                    if(index > 1 && obj[arr[index-1]] < min){
                        min = obj[arr[index-1]]
                    }
                }
            })
            console.log('obj',obj,min)
            this.cardObj = obj
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const element = obj[key];
                    if(element%min !== 0){
                        this.cardVal = false
                        return false
                    }     
                }
            }
            this.cardVal = true
             return true
        },
        /*
            种花问题
            [1,0,0,1]
            [1,0,0,0,1]
            [1,0,0,0,0,1]
            [1,0,0,0,0,0,1]
            [0,0,1,0,0,0,0,1]
            1.  遍历数组，判断当前是否为0，如果不为0，则继续往下遍历，否则就判断它的上一个和下一个是否为0，为0则表示可以种植一个
        */
        flowersBtn(){
            const arr = this.flowersInput.split('')
            if(arr.length===1 && arr[0] === '0'){
                this.flowersResult = true
                this.flowersOnlyN = 1
                if(n > 1){ 
                    this.flowersResult = false
                    return false
                } else {
                    return true
                }
            }
            let n = 0
            for(let i = 0; i < arr.length; i ++){
                if(arr[i] === '0'){ // 判断当前是否为0
                    // 判断当前是否是第一项,如果第一项是0并且下一项还是0表示可以种植一个
                    if(i===0 && arr[i+1] === '0'){
                        n++
                        i = i + 1
                    }else{ // 如果不是第一项 判断上一项和下一项是否是0，是0表示可以种植
                        if(arr[i-1] === '0' && i === arr.length-1){
                            n++
                            i = i + 1
                        }
                        if(arr[i+1] === '0' && arr[i-1] === '0'){
                            n++
                            i = i + 1
                        }
                    }
                }
            }
            if(n > this.flowersN || n === this.flowersN){
                this.flowersResult = true
                this.flowersOnlyN = ''
                return true
            }
            this.flowersOnlyN = n
            this.flowersResult = false
            return false
        },
        /*
            格雷编码

            解析：

                输入n = 0
                输出： [0]
                0
                长度： 2的0次方 = 1

                输入n = 1
                输出：[0,1] 
                0
                1
                长度： 2的1次方 = 2

                输入n = 2
                输出: [0,1,3,2]
                00 - 0
                01 - 1
                11 - 3
                10 - 2
                长度： 2的2次方 = 4

                输入n = 3
                输出: [0,1,3,2]
                000 - 0
                001 - 1
                011 - 3
                010 - 2
                110 - 6
                111 - 7
                101 - 5
                100 - 4
                长度： 2的3次方 = 8

                根据上述可以总结出，二进制系统的长度就是2的n次方，并且左边第一个数都是以0开始然后是1，后面的数都是以2的n次方除以2对称的


        */
        grayCodeBtn(){
            this.grayCodeBinaryResultArr = this.grayCodeFn(this.grayCodeN)
            this.grayCodeResultArr = this.grayCodeBinaryResultArr.map(item=>{
                return parseInt(item,2)
            })
        },
        // 格蕾数函数封装
        grayCodeFn(n){
            if(n===0){  
                return [0]
            }
            if(n===1){
                return [0,1]
            }
            let result = this.grayCodeFn(n-1)
            let len = Math.pow(2,n)
            let arr1 = []
            let arr2 = []
            for(let i = 0; i < len/2;i++){
                arr1.push(`0${result[i]}`)
                arr2.push(`1${result[i]}`)
            }
            return [...arr1,...arr2.reverse()]
        },
        /*
            重复的子字符串
        */
        repeatSubstrBtn(){
            // \1表示重复正则第一个圆括号内匹配到的内容
            // \2表示重复正则第二个圆括号内匹配到的内容
            // var RegExp = /^(123)(456)\2\1$/;
            // 123456456123
            const reg =  /^(\w+)\1+$/g
            this.repeatSubstrResult = reg.test(this.repeatSubstrInput)
        },
        /*
            正则表达式匹配
            s = "mississippi"
            p = "mis*is*p*."

            1. 通过正则匹配出p中的 mi | s* | i | s* | p* | .，声明一个变量l表示当前匹配到第几项。
            2. 遍历匹配出的数组
            3. 获取每一项的第二个字符，判断是否是*，如果是*,再去判断第一个字符是不是.,是.就直接
               给l赋值为这一项的长度，并且跳出本次循环
            4. 如果不是.,那么就循环判断s[l]是否等于第一个字符，等于就让l加一
            5. 如果每一项的第二个字符不是*,那么就遍历这项，并且用这一项的每个字符去和s[l]进行比较，如果不相等就
               直接返回false,否则就让l++
            6. 如果每一项只有一个字符并且是.那么就直接让l加一
            7. 最后使用l和s字符串的长度进行比较，如果相等表示全部匹配返回true,否则就返回false

        */
        regSubstrBtn () {
            let str = this.regSSubstrInput
            let mode = this.regPSubstrInput
            // .* | a* | dads | .
            const regArr = mode.match(/([a-z.]\**)|([a-z]+(?=([a-z.]\*)|$))|([.]$)|([.])/g)
            let currIndex = 0
            let strLen = str.length
            console.log(regArr)
            debugger
            for(let i = 0,len = regArr.length, m; i < len; i ++) {
                // .* | a* | dads
                m = regArr[i].split('')
                if (m[1] === '*') {
                        if (m[0] === '.') {
                            currIndex += m.length
                            continue
                        } else {
                            while (str[currIndex] === m[0] ) {
                                currIndex ++
                            }
                            if (regArr[i+1] && m[0] === regArr[i+1][0]) {
                                currIndex = currIndex - regArr[i+1].length
                            }
                        }
                } else if(m.length === 1 && m[0] === '.') {
                    currIndex ++
                } else {
                    for(let j = 0, jl = m.length; j < jl; j++) {
                        if (m[j] !== str[currIndex]) {
                            this.regSubResult = false
                            return false
                        } else {
                            currIndex ++
                        }
                    }
                }
            }
            console.log(currIndex,strLen)
            this.regSubResult = currIndex === strLen
            return currIndex === strLen
        },
        /*
            冒泡排序
        */
        bubblingBtn () {
            let arr = this.bubblingInput.split(' ')
            if (!arr.length) {
                return
            }
            for(let i = arr.length - 1, temp; i > 0; i --){
                for(let j = 0; j < i; j ++ ){
                    if(Number(arr[j]) > Number(arr[j+1])){
                        temp = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = temp
                    }
                }
            }
            console.log('arr',arr)
            this.bubblingResult = arr
        },
        /**
         * 选择排序
         */
        selectBtn(){
            let arr = this.selectInput.split(' ')
            if(!arr.length){
                return 
            }
            for(let i = 0,min, z; i < arr.length; i++){
                min = Number(arr[i])
                for(let j = i+1; j < arr.length; j++){
                    if(min > Number(arr[j])){
                        min = arr[j]
                        z = j
                    }
                }
                arr[z] = arr[i]
                arr[i] = min
            }
            this.selectResult = arr
        },
        /*
            最大间距
        */
        maxSpacingBtn(){
            let arr = this.maxSpacingInput.split(' ')
            if(arr.length < 2){
                return 0
            }
            if(arr.length === 2){
                return Math.abs(Number(arr[0])-arr[1])
            }
            let max = 0
            console.log('arr',arr)
            for(let i = arr.length - 1, empt; i > 0; i--){
                debugger
                for(let j = 0; j < i; j ++){
                    if(Number(arr[j]) > Number(arr[j+1])){
                        empt = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = empt
                    }
                }
                if(i !== arr.length - 1 ){
                    let val = Number(arr[i+1]) -  Number(arr[i])
                    if(val >  Number(max)){
                        max = val
                    }
                }
            }
            this.maxSpacingResult = max
        },
        /**
         * 按奇偶排序数组
         */
        oddEvenBtn(){
            let arr = this.oddEvenInput.split(' ')
            let oddArr = []
            let evenArr = []
            arr.forEach(item=>{
                if(item%2===0){ // 偶数
                    oddArr.push(item)
                }else{  // 奇数
                    evenArr.push(item)
                }
            })
            this.oddEvenResult = [...oddArr,...evenArr]
            return [...oddArr,...evenArr]
        },
        /**\
         * 按奇偶排序数组2
         */
        oddEvenBtn2(){
            let arr = this.oddEvenInput2.split(' ')
            let resultArr = []
            let oddIndex = 0
            let evenIndex = 1
            arr.forEach((item,index) => {
                console.log(item,item&1,(item&1) === 0)
                if((item&1) === 0){ // 偶数
                    resultArr[oddIndex] = item
                    oddIndex +=2
                } else {
                    resultArr[evenIndex] = item
                    evenIndex +=2
                }
            })
            this.oddEvenResult2 = resultArr
            return resultArr
        },
        // 数组中的第k个最大元素
        arrMaxKBtn(){
            const arr = this.arrMaxKInput.split(" ")
            // 利用冒泡排序的特点 每排列一次就可以得到当前排列的最大值，所以利用这个特点不需要排序整个数组就可以得到答案
            for(let i = arr.length - 1,tem; i > 0; i --){
                for(let j = 0; j < i; j ++){
                    if(arr[j] > arr[j+1]){
                        tem = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = tem
                    }
                }
                if(Number(this.arrMaxk) === arr.length - i){
                    this.arrMaxKVal = arr[i]
                    return
                }
            }
        },
        // 缺失的第一个正数
        losePositiveNumBtn(){
            const arr = this.losePositiveNumInput.split(' ')
            if(!arr.length){
                this.losePositiveNumVal = 1
                return 1
            }
            let z = 1
            let obj = {}
            // 冒泡降序
            for(let i = arr.length - 1,tem; i >= 0; i --){
                for(let j = 0; j < i; j++){
                    if(arr[j] < Number(arr[j+1])){
                        tem = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = tem
                    }
                    
                }
                console.log(obj,arr[i])
                if(obj[arr[i]]){ // 去重
                  arr.splice(i,1)        
                  arr[i] > 0 && z-- // 正数才减一
                }
                obj[arr[i]] = true
                // 正数并且不等于z的时候就返回这个z
                if(Number(arr[i]) > 0 && Number(arr[i]) !== z){
                    this.losePositiveNumVal = z
                    return z
                }
                // 正数才加1
                if(Number(arr[i]) > 0){
                    z++
                }
            }
            this.losePositiveNumVal = z
            return z

            // 方法2
            let len = arr.length
            for(let i = 0; i < len; i++){
                while(arr[i] > 0 && arr[i] <= len && arr[i] !== arr[arr[i]-1]){
                    let temp = arr[i]
                    arr[i] = arr[arr[i]-1]
                    arr[arr[i]-1] = temp
                }
            }

            for(let i = 0; i < len; i++){
                if(arr[i] !== i + 1){
                    return i + 1
                }
            }
            return len + 1
        }
    }
}
</script>

<style lang='less'>
    .key{
        width: 310px;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        margin-top: 50px;
        span {
            border: 1px solid #ccc;
            width: 100px;
            box-sizing: border-box;
            font-size: 12px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            i{
                font-size: 14px;
                font-style: normal;
                font-weight: bolder;
                margin-right: 4px;
            }
        }
        span:active{
            background: cornflowerblue;
        }
    }
</style>

