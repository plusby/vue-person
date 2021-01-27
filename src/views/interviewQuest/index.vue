<template>
  <div class="quest-wrap">
      <pre>
          <img src="@img/quest1.png" alt="">
          解析：
            js数据类型分为基本数据类型(原始数据类型)和引用类型
            基本类型： String, Number, Boolean, Undefined, Null, Symbol;
            引用类型： Object, Function, Array;

          <img src="@img/quest2.png" alt="">
          解析：
            A和B选项中的b变量没用定义就使用会报错
            C选项中的b是一个字符串，任何类型加上字符串都会得到一个字符串
            D选项中undefined和NaN相加，首先进行隐式类型转换Number(undefined)+Number(NaN) => 0 + NaN => NaN,

          <img src="@img/quest3.png" alt="">
          解析：
            ++b+c+a++
            首先要知道++a,和a++的区别
            ++a先加1再计算，a++先计算再加1
            所以++b+c+a++先b+1得到21再+c得到25再+a得到35此时结果是35,最后a再+1,a等于11

          <img src="@img/quest5.png" alt="">
          解析：
            js计算中从左往右依次进行，括号优先和数学中的计算差不多；
            思路1：
            首先计算(val === "smg") 得到true, 再 "value is" + true,
            字符串和任何类型相加最后得到的都是字符串所以得到"value is true",
            这个字符串一定是true所以结果为"Something"
            思路2：
            字符串和任何类型相加最后得到的都是字符串，所以"value is"加上任何值
            最后转为布尔值都为true，所以结果一定是"Something"

          <img src="@img/quest6.png" alt="">
            解析：
                vm.$el用来获取Vue实例的关联DOM元素
                created阶段，实例被创建完成，data初始化完成，模板开始解析，此时还没有
                被挂载

          <img src="@img/quest8.png" alt="">
          解析：
            left 是字符串，是取html中left的值，如果没有就是空串。
            pixelLeft 是数值，是将left的值(如果是空串则赋为0)转化为像素值。
            posLeft 就是将left的值转化为数值类型，而且是浮点型。

          <img src="@img/quest11.png" alt="">
          解析：
            positive: relative; 没有脱离文档流，是相对于自身的位置进行偏移
            width: calc(100%-20px);需要有空格width: calc(100% - 20px);
            clear:both 可以清除同级元素浮动给父元素带来的影响
            以color/font-/text-/line开头的属性可以继承
            所以选c

          <img src="@img/quest12.png" alt="">
          解析：
            padding-top如果设置百分比是按照父元素的宽度进行计算，所以选c

          <img src="@img/quest13.png" alt=""> 
          解析：
             flex-shrink： 空间不足，按比例收缩，为0不收缩
             flex-grow： 有剩余空间，按比例放大，为0不放大
             flex-basis：flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
                        浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小

          <img src="@img/quest14.png" alt=""> 
          解析：
            === 恒等，类型和值都相等才返回true
            {} == {}: 引用类型它的指针指向的分别是两个地址
            console.log(3>2>1): 3>2得true; true > 1 false
            [] == ![]: ![]得到false, [] == false,一侧为布尔值，则要转换为number类型进行比较，
                        通过类型转换Number([]) == Number(false),得 0 == 0 返回true
            
            提示：
                引用类型转换为基本数据类型，默认调用原型上的.valueOf()方法，如果转换不成原始数据类型
                则调用toString()，Number([]) => Number([].toString()) => Number("") => 0

            <img src="@img/quest15.png" alt=""> 
            答案：B
            解析：
                parseInt(num1,num2)
                    num1是要转换的数字;
                    num2是基于num2这个进制转换为十进制的数(范围(2-36),如果省略该参数或其值为 0，则数字将以 10 为基础来解析,
                        如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN);
                map(callBack,_self)
                    callBack是回调函数;
                        callBack(item,index,arr)回调函数接受三个参数，item是遍历数组的当前项，index是遍历数组的当前项的下标，
                                                arr是遍历的数组
                    _self是回调函数中this的指向;
                        
                ["1","2","3"].map(parseInt) 相当于=> parseInt("1",0) parseInt("2",1) parseInt("3",2) 
                    parseInt("1", 0): 第二个参数是0默认把"1"作为十进制转换为十进制就是1
                    parseInt("2",1): 第二个参数是1，没有1进制，所以直接返回NaN
                    parseInt("3",2): 第二个参数是2，把"3"作为2进制转为十进制，但是二进制中没有3，所以转不成功返回NaN

            <img src="@img/quest16.png" alt=""> 
            答案：B
               解析： 
                  v-if：从dom中删除或生成一个元素
                  v-show: 使用display: none进行隐藏和显示
                  v-bind: 动态绑定数据
                  v-model: 双向绑定数据

            <img src="@img/quest17.png" alt=""> 
            答案：A
                解析：
                    右边是一个空数组，所以a和b的值都是undefined,但是a=1设置了默认值为1

            <img src="@img/quest18.png" alt="">
            答案：A
                解析：
                    全局定义了变量a = 10;
                    立即执行函数里面也定义了一个变量a并且使用var进行定义，所以
                    在函数执行的时候内部a变量被提升并且赋值为undefined,
                    所以执行第一个console.log(a),输出undefined;
                    然后执行a=5,此时内部变量a赋值为5；
                    再执行console.log(window.a),输出全局中的a为10；
                    再执行a=20,函数内变量赋值为20；
                    再执行console.log(a)输出函数内部的a为20

            <img src="@img/quest19.png" alt="">
            答案：C
                解析：
                    promise链式调用，下一个then中resolve和reject函数的执行取决于
                    上一个then中resolve或reject执行返回的值

            <!-- <img src="@img/quest20.png" alt=""> -->
            答案：B
                解析：
                    +true表示把布尔类型转换为number类型，隐式转换+Number(true) => +1 => 1
                    !'Lydia'表示把字符串类型转换成布尔类型，隐式转换!Boolean("Lydia") => !true => false

            <img src="@img/quest21.png" alt="">
            答案：A
                解析：
                    localStorage存储的数据，没有手动删除就一直存在，可以设置定时删除
                    sessionStorage存储的数据，随着浏览器窗口的关闭也删除

            <img src="@img/quest22.png" alt="">
            答案：B
                解析：
                    从document到目标元素的过程叫捕获阶段
                    到达目标元素叫目标阶段
                    从目标元素到document的过程叫冒泡阶段

                应用场景：
                    当点击长列表中的每一项都触发一个事件;
                    利用事件捕获或冒泡只需要给父元素添加一个事件即可，通过点击不同的元素来进行判断从而
                    做出相应的处理
            
                事件冒泡带来的影响：
                    当一个父元素和子元素都有不同的点击事件，当点击子元素触发子元素身上的事件
                    时此时不仅会出发子元素身上的事件父元素身上的事件也会被出发，这就是事件冒
                    泡造成的影响，所以此时需要阻止事件冒泡；
                    w3c的方法是e.stopPropagation()，IE则是使用e.cancelBubble = true

            <!-- <img src="@img/quest23.png" alt=""> -->
            答案： C
                解析：
                    自执行函数立即执行，返回0,sayHi函数执行return 0, typeof 0 => number

            <img src="@img/quest24.png" alt="">
            答案： 错
                解析：
                iframe跨域有以下方案：
                  通过contentWindow.name 修改页面名称获取不同源子页面的数据
                  通过location.hash 修改路径的hash获取不同源子页面的数据
                  通过window.postMessage  双向数据传输

            <img src="@img/quest25.png" alt="">
            答案：对
                解析：
                全局变量是window下的属性
            
            <img src="@img/quest26.png" alt="">
            答案：错
                解析：
                reload方法是window.location对象下的

            <img src="@img/quest27.png" alt="">
            答案：错
                解析：
                NaN不等于任何值

            <img src="@img/quest28.png" alt="">
            答案：错
                解析：
                 在函数内部已经定义了这个变量a,所以在这个作用域中有自己的属性a；
                 const和let定义的变量不能够被提升，因此不能在定义之前就使用，
                 否则会出现暂时性死区，

            <img src="@img/quest29.png" alt="">
            答案：对
                解析：
                数组解构赋值左右两边一一对应

            <img src="@img/quest30.png" alt="">
            答案：错
                解析：
                    组件名首字母要大写

            <img src="@img/quest31.png" alt="">
            答案：错
                解析：
                    div需要闭合

            <img src="@img/quest32.png" alt="">
            答案：错
                解析：
                    需要有一个根元素进行包裹
            
            <img src="@img/quest33.png" alt="">
            答案：错
                解析：
                传递了null,null表示一个空对象，如果需要输出4，则传递undefined,
                undefined表示空值

            <img src="@img/quest34.png" alt="">
            答案：对
                解析：
                typeof Array 返回'object',可以通过instanceof或toString进行获取
                具体的类型

            <img src="@img/quest35.png" alt="">
            答案：对
                解析：
                js中任何对象都继承自Object的原型

            <img src="@img/quest36.png" alt="">
            答案：错
                解析：
                Number(null) => 0
                Number(undefined) => NaN
                Number(false) => 0
                Number("") => 0
                Number(" ") => 0

            <img src="@img/quest37.png" alt="">
            答案：错
                解析：
                undefined

            <img src="@img/quest38.png" alt="">
            答案：错
                解析：
                值可以不用指定，默认是undefined
            
            <img src="@img/quest39.png" alt="">
            答案：错
                解析：
                visibility: hidden; 隐藏元素占据空间
                display: none;不占空间

            <img src="@img/quest40.png" alt="">
            答案：错
                解析：
                使用箭头函数this指向了window,

            <img src="@img/quest41.png" alt="">
            答案：错
                解析：
                getDay()返回一周中的某一天，周日是0

            <img src="@img/quest42.png" alt="">
            答案：对
                解析：
                纯函数：不受函数外部数据的影响，参数相同，返回的结果永远相同，
                       不产生副作用(网络请求，输出控制台，获取时间)

            <img src="@img/quest43.png" alt="">
            答案：对
                解析：
            
            <img src="@img/quest44.png" alt="">
            答案：
                1. 行内样式
                2. style标签内部样式
                3. link外部样式
                4. js动态修改

            <img src="@img/quest45.png" alt="">
            答案：
                标准盒模型：margin + border + padding + content(content = width/height)
                ie盒模型：margin + content(border + padding + width/height)

            <img src="@img/quest46.png" alt="">
            答案：
                == 判断的时候会做隐式类型的转换再进行判断
                === 恒等类型和值都相等才是true

            <img src="@img/quest47.png" alt="">
            答案：
                !import(无穷) > 行内(1000) > id(100) > class(10) > 元素(1) > 通配符(0)

            注意:
                样式的优先级是按照这个值进行累加计算，结果越大优先级越高

            <img src="@img/quest48.png" alt="">
            答案：

            <img src="@img/quest49.png" alt="">
            答案：
                1. clear:both
                2. overflow: hidden

            <img src="@img/quest50.png" alt="">
            答案：
                1. display: flex;
                   justify-content: center;
                   align-items: center;

                2. position: absolute;
                   top: 50%;
                   left: 50%;
                   transform: translate(-50%,-50%);

                3. display: table;
                        display: table-cell;
                        vertical-align: middle;
                        text-align: center;

            <img src="@img/quest53.png" alt="">
            答案：fasle true true true
                instanceof: 查看右边的原型是否在左边实例的原型链上

                a的原型链  a.__proto__ => Object.prototype  
                        Object.prototype.__proto__ => null

                a instanceof Array  
                    上面的原型链上不存在Array的原型 得到false

                a instanceof Object
                    上面的原型链上存在Object的原型 得到true
                
                b的原型
                    b.__proto__ => Array.prototype
                    Array.prototype.__proto__  => Object.prototype  
                    Object.prototype.__proto__ => null

                b instanceof Array
                    上面的原型链上存在Array的原型 得到true

                b instanceof Object
                    上面的原型链上存在Object的原型 得到true

            <img src="@img/quest54.png" alt="">
            答案：报错
                解析：
                    let和const定义的变量，不具有变量提升的作用，只能先定义再使用

            <img src="@img/quest55.png" alt="">
            答案：
                1. arr1.concat(arr2)
                2. arr1 = [...arr1,...arr2]
                3. Object.assign(arr1,arr2)

            <img src="@img/quest56.png" alt="">
            答案：
                pop() 从数组的末尾删除一项
                push() 向数组的末尾添加一项
                unshift() 向数据头部添加一项
                shift() 从数组的头部删除一项

            <img src="@img/quest58.png" alt="">
            答案：
                1. [...new Set([1,3,5,2,2,1,4])] // 利用Set值的唯一性
                2. [1,3,5,2,2,1,4].filter((item,index,arr)=>{ // 利用indexOf从头开始查找当前元素的位置是否等于当前的索引
                     retrun arr.indexOf(item,0) === index
                    })
                3. 利用Object的key的唯一性

            <!-- <img src="@img/quest59.png" alt=""> -->
            答案：
                利用自执行函数具有自己作用域的特点，每次遍历执行都创建自己的作用域，把index传递进入
                函数内部获取到的index都是当前的值

                const list = document.getElementByTagName("li")
                list.forEach((item,index)=>{
                    (function(){
                        list[index].addEventListener("click",function(){
                            console.log(index)
                        })
                    })(index)
                })

            <img src="@img/quest60.png" alt="">
            答案：
                根据题目可以看出，当a==1并且a==2并且a==3的时候就执行console.log(1)

                如果a是一个引用类型，再使用==进行判断的时候首先调用它的valueOf()方法
                转换为基本数据类型，如果转换不成功就调用toString方法转成字符串，因此
                利用这个特点进行入手:

                我们可以在对象身上手动实现valueOf这个方法，那么在 a==1的时候，就会
                调用valueOf方法，我们返回1，那么 1==1成立，再执行a==2,再次调用valueOf方法
                我们返回2，那么2==2成立，就这样下去3==3，if条件成立

                var a = {
                    val: 0,
                    valueOf(){
                        retrun ++this.val
                    }
                }

            <img src="@img/quest61.png" alt="">
            答案：
                splice： 从数组中删除或者替换或插入数据
                arr.splice(1,2,'newVal')

            <img src="@img/quest62.png" alt="">
            答案：
                1. Math.max(...a)
                2. a.sort((a,b)=>a-b)
                   a[a.length-1]

            <img src="@img/quest63.png" alt="">
            答案：

            <img src="@img/quest64.png" alt="">
            答案：
                后面的会覆盖前面的
                { code: null, name: undefined, type: 'number', value: '666'}
            
            <img src="@img/quest67.png" alt="">
            答案：
                只有不传参数或者参数为undefined的时候才会使用默认值，因为undefined表示一个空值
            
            <img src="@img/quest68.png" alt="">
            答案： 错
            解析：
                源码中vue中的生命周期是通过call进行执行，所以不能使用箭头函数

            


      </pre>
  </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>