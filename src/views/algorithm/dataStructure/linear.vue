<template>
    <div>
        <h1>线性数据结构(一维数据结构)</h1>
        <h3>什么是线性数据结构？</h3>
        <pre>
        一个位置存储一个值，一对一的关系，
        线性数据结构中有两种不同的存储结构：
            1. 顺序存储，顺序存储的线性表称为顺序表，顺序表中数据是连续存储的
            2. 链式存储，链式存储的线性表称为链表，链表中数据是可以不连续存储的，链表中存储着当前数据和
            相邻数据的地址
        </pre>
        <h3>顺序存储</h3>
        <pre>
        在内存中找一块地址连续的空间，依次存放数据，用这种方式存储的线性表就是顺序表其特点就是存储得相邻数据
        其内存地址也是相邻的，比如数组，在js中无需指定数组的长度，因为js引擎会自动分配大小，但是当存储的大小
        不够的时候，操作系统会自动扩充内存然后把之前的数据复制到新的内存中，这种操作是非常消耗性能，因此，如果
        知道数组存储数据的长度就给数组在初始化的时候指定长度，这样可以大大提高性能
        优点：
            根据连续存储的特点，查找数据效率高，可以根据地址进行偏移查询
        缺点：
            1.插入或删除其中的数据，为了确保数据的连续性后面的所有数据都要进行向后或者向前移位，从而消耗了性能
            2.不希望存储大量的数据，根据连续存储的特点如果空间碎片较多会因为存储空间不足而
              无法存储大量的数据(空间碎片是指内存中不连续的存储内存)
        </pre>
        <h3>链表存储(链式存储)</h3>
        <pre>
        存储数据的时候，每存储一条数据都会存储一下当前数据和下一条数据的地址，这样在查找的时候只需要从头遍历链表，这种
        存储结构叫做单向链表存储，其中存储数据的叫做数据域，存储下一条数据的地址叫做引用域。根据存储的下一条地址很容易
        找到下一条数据，但是当查找上一条数据的时候就没法查找，因此为了解决这个问题，使用之前的做法，在当前数据中存储下
        上一条数据的地址，把这种存储方式被称为双向链表存储；
        优点：
            向链表中插入或者删除数据效率很高，因为链表存储无需连续性，只需要修改相邻元素的地址引用和数据域即可
        缺点：
            查找效率低，因为每次查找都会从头开始根据上一个元素的引用域进行查找下一个元素
        </pre>
        <h3>顺序存储和链表存储应用场景</h3>
        <pre>
            如果只进行查询不进行删除和插入操作就可以使用顺序存储，如果需要进行删除和插入操作，或者进行大量的数据存储
            可以使用链式存储
        </pre>

        <h3>数组和链表</h3>
        <pre>
            1. 数组
            每个数组只有一个引用地址。指向一个块，这个块在物理空间上必须是连续的

            特性：
                1. 存储在物理空间上是连续的
                2. 在物理空间中数组的长度是固定不可变化的，每次添加一项，如果长度超出了它的存储空间，那么都需要重新开辟一个能够
                   存在的新的空间
                3. 只有一个引用地址，指向数组的第一个元素的位置

            有点：
                查找速度快，适合查找，因为它的存储空间是连续的，通过地址偏移就可以快速查找到

            缺点:
                1.不适合添加和删除数据，因为新添加的数据超过此时数组的空间大小的时候，那么它就会重新去找一个连续的能够放下整个数据的空间
                2.因为存储空间必须是连续的，因为如果没有一个连续的大小空间，那么容易导致数组存储不下
                
            提示：
                在初始化数组的时候应该指定数组的长度

            3. 链表
                3.1 单向链表
                由一个个节点组成，每个节点中包含一个值和一个指向下一个节点的引用，它是链式的因此就是链表
                
                特性：
                    1. 存储在物理空间上可以不是连续的
                    2. 没存放一个值，都需要多开销一个空间用来存放下一个节点的引用

                优点:
                    1.删除和添加很快，因为它的存储空间不是连续的
                    2.只要存储空间够就可以存下，不用担心多碎片空间问题
                    
                缺点:
                    1.查找比较慢，因为需要重第一项开始根据每项的引用向下查找
                    2.需要增加额外的空间
                    3.不能逆向查找

                使用场景：
                    当存储的数据比较大的时候，在每个节点存的数据多，可以减少内存的开销，并且频繁的删除和插入

                3.2 双向链表
                每一个节点都有两个地址引用，分别指向上一个节点和下一个节点

                特性：
                    1. 存储在物理空间上可以不是连续的
                    2. 没存放一个值，都需要多开销两个空间用来存放下一个节点和上一个的引用

                优点：
                    可以逆向查找

            // 单项链表
            function Node(val, next){
                this.value = val
                this.next = next || null
            }
            
            const a = new Node(1)
            const b = new Node(2)
            a.next = b

            // 1. 链表遍历1 - 循环遍历性能好
            function getVal(root){
                let curr = root
                while(curr){
                    console.log(curr.val)
                    curr = curr.next
                }
            }

            // 2. 链表遍历2递归遍历  有些场景需要使用
            function getVal2(root){
                if(root === null){
                    return
                }
                console.log(root.value)
                getVal2(root.next)
            }

            // 3. 逆制链表1 递归逆置
            /*
                1. 递归的出口：如果是最后一个节点，最后两个节点进行逆置，返回最后一个节点
                2. 否则 进行递归下个节点  把当前节点和下个节点进行逆置，当前节点的下个节点指向null
                3. 返回 最后一个节点

            */
            function reverse(root){
                if (root.next.next === null) {
                    root.next.next = root
                    return root.next
                } else {
                    const result = reverse(root.next)
                    root.next.next = root
                    root.next = null
                    return result
                }
            }

            // 4. 逆置链表2  循环逆置
            /*
                当前节点赋值为下个节点
                当前节点的下个节点赋值为上个节点
                上个节点为当前节点

             */
            function reverse2(root){
                let prev = null
                let curr = root
                while(curr){
                    // 存储下个节点
                    const next = curr.next
                    // 下个节点应该是指向上个节点
                    curr.next = prev
                    // 上个节点和当前节点进行逆置
                    prev = curr
                    // 当前节点应该是下个节点
                    curr = next
                }
            }

            /**
            4.4 逆置列表并且生成一个新的链表
                不改变原有链表
                
             */

            function reverse3(root){
                let list = null
                while (root) {
                    // 最关键的在Node构造函数内部，node的next在构造函数内部传递，这样node1对象可以作为新node2对象的next,也可以把node2替换成node1
                    list = new Node(root.val, list)
                    root = root.next
                }
                return list
            }
            console.log(reverse3(a)) // 2, 1
            console.log(a) // 1, 2

            1. list指向null

            <img src="@img/linear/reverse1.png" alt="">

            2. 创建一个新的node2值为2，node2的next指向null,最后让list指向node2

            <img src="@img/linear/reverse2.png" alt="">

            3. 创建一个新的node1值为1, node1的next指向list也就是指向node2，最后让list指向当前的node1

            <img src="@img/linear/reverse3.png" alt="">

            4. 创建一个新的node3值为3, node3的next指向list也就是指向node1，最后让list指向当前的node3

            <img src="@img/linear/reverse4.png" alt="">

            5. 输出list,就实现了链表的逆置

            // 5. 获取链表的长度
            /*
                通过递归遍历整个链表，出口返回0，递归的时候加1
             */
            function getLen(root){
                function _getLen(root){
                    if (root === null) {
                        return 0
                    }
                    return 1 + _getLen(root.next)
                }
               return _getLen(root)
            }

            // 6. 获取链表指定位置的值
            /*
                递归遍历整个链表，传递一个索引，每次遍历索引就加1，通过索引和传递的位置进行比较
                如果相等则返回值，否则递归
             */
            function getValByIndex(root,index){
                function _getValByIndex(root,i){
                    if (root === null) {
                        return null
                    }
                    if(i === index){
                        return root.value
                    }
                    return _getValByIndex(root.next,i+1)
                }
                return _getValByIndex(root,0)
            }


            // 7. 设置指定索引的值
            function setValByIndex(root,index,val){
                function _setValByIndex(root,i){
                    if (i === index) {
                        root.value = val
                        return true
                    }
                    if (root === null) {
                        return false
                    }
                    return _setValByIndex(root.next, i + 1)
                }
                return _setValByIndex(root, 0)
            }

            // 8. 向指定索引添加一项
            function addItemByIndex(root,index,item){
                function _addItemByIndex(root,i){
                    if(root === null){
                        return false
                    }
                    if(index === i){
                        item.next = root.next
                        root.next = item
                        return true
                    }
                    return _addItemByIndex(root,i+1)
                }
                return _addItemByIndex(root, 0)
            }

            // 9. 删除链表中的某一项
            function removeItem(root,val){
                function _removeItem(root){
                    if(root === null){
                        return null
                    }
                    // 如果值相等直接返回下一个节点
                    if (root.value === val) {
                        return root.next
                    }
                    // 把返回的值赋值给下一个节点
                    root.next = _removeItem(root.next)
                    return root // 一定要返回当前节点
                }
                return _removeItem(root)
            }

            // 10. 双向链表
            function Node(val){
                this.value = val
                this.next = null
                this.prev = null
            }

            const n1 = new Node(1)
            const n2 = new Node(2)
            const n3 = new Node(3)
            const n4 = new Node(4)

            n1.next = n2
            n2.next = n3
            n2.prev = n1
            n3.next = n4
            n3.prev = n2
            n4.next = n3

            console.log(n1)


            
        </pre>

        <h3>链表的面试题</h3>
        <pre>
            给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
            请你将两个数相加，并以相同形式返回一个表示和的链表。
            你可以假设除了数字 0 之外，这两个数都不会以 0 开头
            eg:
                输入：l1 = [2,4,3], l2 = [5,6,4]
                输出：[7,0,8]
                解释：342 + 465 = 807.

                输入：l1 = [0], l2 = [0]
                输出：[0]

                输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
                输出：[8,9,9,9,0,0,0,1]

            function ListNode(val, next) {
                this.val = (val===undefined ? 0 : val)
                this.next = (next===undefined ? null : next)
            }
            const a = new ListNode(3)
            const b = new ListNode(4,a)
            const c = new ListNode(2,b)

            const d = new ListNode(4)
            const e = new ListNode(6,d)
            const f = new ListNode(5,e)

            /**
            * @param {ListNode} l1
            * @param {ListNode} l2
            * @return {ListNode}
            */
            var addTwoNumbers = function(l1, l2) {
                let dummy = new ListNode(-1);
                let list = dummy
                let n = 0 // 进位值
                while(l1 || l2 || n){
                    let val = 0
                    if (l1) {
                        val += l1.val
                        l1 = l1.next
                    }
                    if (l2) {
                        val += l2.val
                        l2 = l2.next
                    }
                    val += n
                    n = Math.floor(val/10)
                    list.next = new ListNode(val%10)
                    list = list.next
                }
                return dummy.next
            }
            addTwoNumbers(c,f) // 7 0 8

            解析：按顺序生成新的链表
            已有链表
            <img src="@img/linear/addTwoNumbers5.png" alt="">
            
            1. 创建一个新的节点node1,定义两个变量list,dummy分别指向node1

                <img src="@img/linear/addTwoNumbers1.png" alt="">

            2. 创建一个新的节点node2,让node1的next指向node2,让list指向node2
                <img src="@img/linear/addTwoNumbers2.png" alt="">

            3. 创建一个新的几点node3,让node2的next指向node3,让list指向node3
                <img src="@img/linear/addTwoNumbers3.png" alt="">

            4. 创建一个新的几点node4,让node3的next指向node4,让list指向node4
                <img src="@img/linear/addTwoNumbers4.png" alt="">

            5. 输出dummy.next便是新链表
        </pre>

        <h3>二分搜索(二分查找法)</h3>
        <pre>
            首先数组需要从小到大进行排序
            二分搜索适合进行查找一个数，不适合插入和删除一个数，
            因为通过二分搜索查找一个数是非常快，时间复杂度O(log2n),
            而删除或者插入一个数，删除或插入之后的位置之后的数都需要重新排列非常耗时，
            因此删除和插入就使用二叉树
            
            平衡二叉树和红黑树的由来：
            二分法搜索和平衡二叉树搜索的时间复杂度是一样的，
            但是平衡二叉树的每次插入和删除都要不断的去左旋或右旋保持平衡也是非常消耗时间，
            因此就有了红黑树，因为红黑树不是时刻保持平衡的，所以删除或插入节点之后不会马上
            进行平衡操作，所以节省了时间。

            二分搜索、平衡二叉树和红黑树的使用场景
            1. 只有搜索就用二分查找法,
            2. 如果既有搜索又有少量的插入和删除就用平衡二叉树
            3. 如果有少量的搜索大量的插入或删除就用红黑树
        </pre>

        <h3>搜索二叉树</h3>
        <pre>
            根节点的左节点比根节点要小，右节点比根节点要大，
            因此查找一个数的时候，只需要和根节点比较再，如果小于
            根节点就和左边的子节点比较，如果大于根节点就和右边的子节点
            进行比较，知道找到这个数，如果找不到这个数最大寻找次数就是
            当前二叉树的深度，因此时间复杂度就是O(h)

            eg:
                        12
                    6        17
        
                3      8   15   19
            2

            通过上面的二叉树进行搜索2
            第一步：2和12进行比较，2小于12因此需要左节点6进行比较
            第二步：2和6进行比较，2小于6，因此需要和6的左节点3进行比较
            第三步：2和3进行比较，2小于3，因此需要和3的左节点进行比较
            第四步：2和2进行比较，2和2相等找到
            因此最多需要搜索四次也就是整个数的深度

        </pre>

        <h3>平衡二叉树</h3>
        <pre>
            每个根节点的左右子树的深度不能超过1

            平衡二叉树出现的原因:
            非平衡二叉树可能是线性树(线性树的深度就是节点的数量)，那么搜索的时间复杂度就是所有节点的大小O(n)
            eg:
                线性数
                9
                 8
                  7
                   4
                    3
                     2

            因此需要把非平衡二叉树变为平衡二叉树再次搜索，
            eg:
                        12
                    6        17
        
                3      8   15   19
            2

            第一层有一个节点
            第二层有两个节点
            第三层有四个节点
            第四层最多应该有八个节点
            那么第h层就有2的(h-1)次方个节点（n = 2(h-1)）
            那么h = (log2n)+1
            那么所有的节点数量就是 1+2+4+...+2的(h-1)次方 = 1 * (1-2的h次方)/(1-2)

            所以平衡二叉树的所搜时间复杂度为O(log2n + 1)
            
        </pre>
        <h3>非平衡二叉树变为平衡二叉树</h3>
        <pre>
            左旋
            右侧的节点多于左侧的节点，那么就需要右侧的节点进行左旋
            <img src="../../../assets/img/s1.png" alt="">
            因为c要左旋，a需要放在C的左侧，但是c的左侧已经有节点d，所以需要把C的左侧的节点d取下来，把a放在c的左侧，
            再把d放在a的右侧
            总结：
            a为根节点，c为要移动的节点
            1. 把根节点作为要移动节点的左子节点
            2. 把要移动的节点的之前的左子节点放到根节点的右节点上

            右旋
            左侧的节点数多于右侧的节点数，那么就需要左侧的节点进行右旋
            <img src="../../../assets/img/s2.png" alt="">
            因为b节点需要右旋，a节点要放在b的右节点上，但是b的右节点已经有节点e了，所以需要把e取下来，把a放在b的右侧
            再把e放在a的左侧
            总结：
            a为根节点，b为要移动的节点
            1. 把根节点作为要移动节点的右子节点
            2. 把要移动的节点的之前的右子节点放到根节点的左节点上
        </pre>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>