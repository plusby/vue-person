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
    <h2>平衡二叉树</h2>
    <pre>
      满足两个条件：
        1. 根节点的左节点和右节点的深度相差不能超过1
        2. 每个节点的左节点和右节点的深度相差不能超过1

        作用：
          平衡二叉树在搜索上递归的次数减少，空间复杂度增加，如果一个数的单一侧的节点很深，并且需要搜索，那么先转为平衡二叉树

        判断树是否是平衡二叉树
        思路:
          先获取到根节点的左右子树的深度，如果相差超过1表示不是平衡二叉树，否则
          就递归判断根节点下的子节点是否是平衡二叉树
        <codemirror
        ref="mycode"
        value="
                      a
                  b       c
              d      e  f     g
          h        j

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
          const j = new Node('j')

          a.left = b;
          a.right = c
          b.left = d
          b.right = e
          c.left = f
          c.right = g
          d.left = h
          e.right = j
          
          // 获取树的深度
          function getDeep(root){
            if (root === null) { // 如果是null 返回0
              return 0
            }
            // 获取到左右子树的深度，返回最大的深度
            return Math.max(1 + getDeep(root.left),1 + getDeep(root.right))
          }
          function isBalanceTree(root){
            // 如果节点为null，表示是叶子节点，表示是平衡二叉树
            if (root === null) {
              return true
            }
            // 获取根节点的左右子节点的深度
            const left = getDeep(root.left)
            const right = getDeep(root.right)
            // 如果根节点的左右深度相差超过1直接返回False,否则递归子节点进行判断
            if (Math.abs(left-right) > 1) {
              return false
            } else {
              return isBalanceTree(root.left) && isBalanceTree(root.right)
            }
          }
        "
        :options="cmOptions"
        class="code"/>
      
    </pre>
    <h3>非平衡二叉树转为平衡二叉树</h3>
    <h4>左单旋</h4>
    思路：
      1. 找到新的根节点(根节点的右节点)
      2. 找到要移动的节点(根节点的右节点的左节点)
      3. 把移动的节点作为根节点的右节点
      4. 把根节点作为新根节点的左节点
      5. 返回新根节点
    <pre>
      <codemirror
        ref="mycode"
        value="
            a         进行左单旋    b
              b                 a      d
            c    d                c

            function Node(value){
              this.value = value
              this.left = null
              this.right = null
            }

            const a = new Node('a')
            const b = new Node('b')
            const cc = new Node('c')
            const d = new Node('d')

            a.right = b
            b.left = cc
            b.right = d

          // 左单旋
          function leftRoate(root){
            // 1. 找到新的根节点(根节点的右节点)
            const newRoot = root.right
            // 2. 找到要移动的节点(根节点的右节点的左节点)
            const move = root.right.left
            // 3. 把要移动的节点作为根节点的右节点
            root.right = move
            // 4. 把根节点作为新根节点的左节点
            newRoot.left = root
            return newRoot
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <h4>右单旋</h4>
    思路：
      1. 找到新的根节点(根节点的左节点)
      2. 找到要移动的节点(根节点的左节点的右节点)
      3. 把移动的节点作为根节点的左节点
      4. 把根节点作为新根节点的右节点
      5. 返回新根节点
    <pre>
      <codemirror
        ref="mycode"
        value="
                a         进行左单旋    b
              b                     c      a
            c    d                      d

            function Node(value){
              this.value = value
              this.left = null
              this.right = null
            }

            const a = new Node('a')
            const b = new Node('b')
            const cc = new Node('c')
            const d = new Node('d')

            a.left = b
            b.left = cc
            b.right = d

          // 右单旋
          function rightRoate(root){
            // 1. 找到新的根节点(根节点的左节点)
            const newRoot = root.left
            // 2. 找到要移动的节点(根节点的左节点的右节点)
            const move = root.left.right
            // 3. 把要移动的节点作为根节点的左节点
            root.left = move
            // 4. 把根节点作为新根节点的右节点
            newRoot.right = root
            return newRoot
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>
    <h4>旋转为平衡二叉树</h4>
    思路：
      1. 判断是否是平衡二叉树，是就直接返回
      2. 不是平衡二叉树，判断当前节点的左节点是否存在，存在就递归进行旋转
      3. 判断当前节点的右节点是否存在，存在就递归进行旋转
      4. 获取当前节点的左右子树的深度
      5. 如果左右子树的深度相差不超过1，直接返回
      6. 否则左子树的深度大于右子树的深度，进行右旋返回
      7. 否则左子树的深度小于右子树的深度，进行左旋返回

    通过左右单选存在的问题：
      左右单选无法把要移动的节点并且是唯一的最深分支旋转为平衡二叉树

      eg:
            a 
              b
            c    d 
          e
      
      通过左单选(c和e是要移动的节点并且是唯一的最深分支)
          b 
        a    d 
          c 
        e

    解决这个问题的通过左右双旋或者右左双旋

    左右单旋进行旋转
    <pre>
      <codemirror
        ref="mycode"
        value="
                a         进行左单旋    b
              b                     c      a
            c    d                      d

            function Node(value){
              this.value = value
              this.left = null
              this.right = null
            }

            const a = new Node('a')
            const b = new Node('b')
            const cc = new Node('c')
            const d = new Node('d')

            a.left = b
            b.left = cc
            b.right = d
          
          // 是否是平衡二叉树
          function isBalance(root){
            // 如果为空表示是平衡二叉树
            if(root === null){
              return true
            }
            // 获取当前节点左节点的深度
            const left = getDeep(root.left)
            // 获取当前节点右节点的深度
            const right = getDeep(root.right)
            // 如果左右相差没有超过1表示是平衡的继续判断子节点是否是平衡的
            if (Math.abs(left - right) > 1) {
              return false
            } else {
              return isBalance(root.left) && isBalance(root.right)
            }
          }

          function getDeep(root){
            // 如果为空表示没有返回0
            if(root === null){
              return 0
            }
            // 递归左节点获取左边的深度
            const left = getDeep(root.left) + 1
            // 递归右节点获取右边的深度
            const right = getDeep(root.right) + 1
            // 返回最大的一个值作为深度
            return  Math.max(left,right)
          }

          // 右单旋
          function rightRoate(root){
            // 1. 找到新的根节点(根节点的左节点)
            const newRoot = root.left
            // 2. 找到要移动的节点(根节点的左节点的右节点)
            const move = root.left.right
            // 3. 把要移动的节点作为根节点的左节点
            root.left = move
            // 4. 把根节点作为新根节点的右节点
            newRoot.right = root
            return newRoot
          }

          // 左单旋
          function leftRoate(root){
            // 1. 找到新的根节点(根节点的右节点)
            const newRoot = root.right
            // 2. 找到要移动的节点(根节点的右节点的左节点)
            const move = root.right.left
            // 3. 把要移动的节点作为根节点的右节点
            root.right = move
            // 4. 把根节点作为新根节点的左节点
            newRoot.left = root
            return newRoot
          }

          // 变为平衡二叉树
          function changeTree(root){
            // 是否是平衡二叉树
            if (isBalance(root)) {
              return root
            }
            // 如果存在左节点就平衡左节点, 这里的目的就是实现从叶子层开始平衡二叉树
            if (root.left !== null ) {
              root.left = changeTree(root.left)
            }
            // 如果存在右节点就平衡右节点
            if (root.right !== null ) {
              root.right = changeTree(root.right)
            }
            // 获取左右节点的深度
            const leftDeep = getDeep(root.left)
            const rightDeep = getDeep(root.right)

            // 如果左右节点深度相差小于2表示是平衡二叉树直接返回，否则左节点的深度大于右节点的深度，那么进行右旋，小于就左旋
            if(Math.abs(leftDeep - rightDeep) < 2){
              return root
            } else if(leftDeep < rightDeep){
              return leftRoate(root)
            } else if(leftDeep > rightDeep){
              return rightRoate(root)  
            }
            return root
          }
        "
        :options="cmOptions"
        class="code"/>
    </pre>

    左右双旋或右左双旋
      解决的问题：
        解决左右单旋的时候，要移动的节点的深度是唯一的并且是最深的无法旋转为平衡二叉树

    左右双旋
      1. 如果右节点的深度大于左节点的深度
      2. 如果到要移动节点的深度(根节点的右节点的左节点)大于要移动节点的另个节点的深度(根节点的右节点的右节点)
      3. 大于就先把新根节点进行右旋再把根节点进行左旋，否则直接根节点左旋

    右左双旋
      1. 如果左节点的深度大于右节点
      2. 如果到要移动节点的深度(根节点的左节点的右节点)大于要移动节点的另个节点的深度(根节点的左节点的左节点)
      3. 大于就先把新根节点进行左旋再把根节点进行右旋，否则直接根节点右旋

      出现的问题：
        左右双旋或右左双旋只能解决要移动的节点的深度是唯一的，因此如果出现另一个节点的深度比它深，那么就无法
        旋转为平衡二叉树，需要通过左左双旋或者右右双旋
    
    <pre>
      <codemirror
        ref="mycode"
        value="
                a         进行左单旋    b
              b                     c      a
            c    d                     d
                    e                     e
            function Node(value){
              this.value = value
              this.left = null
              this.right = null
            }

            const a = new Node('a')
            const b = new Node('b')
            const cc = new Node('c')
            const d = new Node('d')
            const e = new Node('e')

            a.left = b
            b.left = cc
            b.right = d
            d.right = e
          
          // 是否是平衡二叉树
          function isBalance(root){
            if(root === null){
              return true
            }
            // 获取当前节点的左右节点的深度
            const leftDeep = getDeep(root.left)
            const rightDeep = getDeep(root.right)

            // 如果左右节点的深度超过1直接返回，否则递归判断左右节点是否是平衡二叉树
            if(Math.abs(leftDeep-rightDeep) > 1){
              return false
            } else {
              return isBalance(root.left) && isBalance(root.right)
            }
          }
          // 获取当前节点的深度
          function getDeep(root){
            if(root === null){
              return 0
            }
            return Math.max(getDeep(root.left),getDeep(root.right)) + 1
          }

          // 左单旋
          function leftChange(root){
            if (root === null) {
              return root
            }
            // 获取到新的根节点(当前节点的右节点)
            const newRoot = root.right
            // 要移动的节点(当前节点的右节点的左节点)
            const move = root.right.left
            // 把要移动的节点放在根节点的右侧
            root.right = move
            // 把根节点放在新根节点的左侧
            newRoot.left = root
            // 返回节点
            return newRoot
          }

          // 右单旋
          function rightChange(root){
            if (root === null) {
              return root
            }
            // 获取到新的根节点(当前节点的左节点)
            const newRoot = root.left
            // 要移动的节点(当前节点的右节点的左节点)
            const move = root.left.right
            // 把要移动的节点放在根节点的左侧
            root.left = move
            // 把根节点放在新根节点的左侧
            newRoot.right = root
            // 返回节点
            return newRoot
          }

          // 进行左右双旋
          function change(root){
            // 判断是否是平衡二叉树
            if (isBalance(root)) {
              return root
            }
            // 如果左节点存在就进行递归平衡左节点
            if(root.left !== null){
              root.left = change(root.left)
            }
            // 如果右节点有值就进行递归平衡右节点
            if(root.right !== null){
              root.right = change(root.right)
            }
            // 获取左右节点的深度
            const leftDeep = getDeep(root.left)
            const rightDeep = getDeep(root.right)

            // 如果左右节点的深度没有超过1表示平衡直接返回当前节点
            if(Math.abs(leftDeep-rightDeep) <= 1){
              return root
            } else if(leftDeep > rightDeep){ // 左边大于右边(右旋)
              // 获取要移动的节点的深度(根节点的左节点的右节点)
              const moveDeep = getDeep(root.left.right)
              // 获取要移动节点的另外一个侧节点的深度(根节点的左节点的左节点)
              const otherDeep = getDeep(root.left.left)
              // 如果大于就先把新根节点进行左旋
              if(moveDeep > otherDeep){
                root.left = leftChange(root.left)
              }
              return rightChange(root)
            } else if(leftDeep < rightDeep){ // 右边大于左边(左旋)
              // 获取到要移动节点的深度(根节点的右节点的左节点)
              const moveDeep = getDeep(root.right.left)
              // 获取到另一个节点的深度(根节点的右节点的右节点)
              const otherDeep = getDeep(root.left.left)
              // 如果大于就先把新根节点进行右旋
              if(moveDeep > otherDeep){
                root.right = rightChange(root.right)
              }
              return leftChange(root)
            }
            return root
          } 

        "
        :options="cmOptions"
        class="code"/>
    </pre>

    左左双旋或右右双旋(转为平衡二叉树的最终方案)
      解决的问题：
        左右双旋或右左双旋只能解决要移动的节点的深度是唯一的，因此如果出现另一个节点的深度比它深，那么就无法
        旋转为平衡二叉树，需要通过左左双旋或者右右双旋

      在左右双旋的基础上，把新的节点的右节点进行递归平衡，再把新的节点进行递归平衡
      在右左双旋的基础上，把新的节点的左节点进行递归平衡，再把新的节点进行递归平衡
    
    <pre>
      <codemirror
        ref="mycode"
        value="
               旋转之前

                        b
                    b
                c       d
            e              f

            右単旋变化的分支4和6的高度是2，比旋转节点1的右侧的高度超过了2所以旋转之后也不平衡

            旋转之后
                    b
                c      a
            e       d
                        f

            通过左左或右右双旋
                  b
                c   f
              e   d    a

            function Node(value){
              this.value = value
              this.left = null
              this.right = null
            }

            const a = new Node('a')
            const b = new Node('b')
            const cc = new Node('c')
            const d = new Node('d')
            const e = new Node('e')
            const f = new Node('f')

            a.left = b
            b.left = cc
            b.right = d
            cc.left = e
            d.right = f
          
          // 是否是平衡二叉树
          function isBalance(root){
            if(root === null){
              return true
            }
            // 获取当前节点的左右节点的深度
            const leftDeep = getDeep(root.left)
            const rightDeep = getDeep(root.right)

            // 如果左右节点的深度超过1直接返回，否则递归判断左右节点是否是平衡二叉树
            if(Math.abs(leftDeep-rightDeep) > 1){
              return false
            } else {
              return isBalance(root.left) && isBalance(root.right)
            }
          }
          // 获取当前节点的深度
          function getDeep(root){
            if(root === null){
              return 0
            }
            return Math.max(getDeep(root.left),getDeep(root.right)) + 1
          }

          // 左单旋
          function leftChange(root){
            if (root === null) {
              return root
            }
            // 获取到新的根节点(当前节点的右节点)
            const newRoot = root.right
            // 要移动的节点(当前节点的右节点的左节点)
            const move = root.right.left
            // 把要移动的节点放在根节点的右侧
            root.right = move
            // 把根节点放在新根节点的左侧
            newRoot.left = root
            // 返回节点
            return newRoot
          }

          // 右单旋
          function rightChange(root){
            if (root === null) {
              return root
            }
            // 获取到新的根节点(当前节点的左节点)
            const newRoot = root.left
            // 要移动的节点(当前节点的右节点的左节点)
            const move = root.left.right
            // 把要移动的节点放在根节点的左侧
            root.left = move
            // 把根节点放在新根节点的左侧
            newRoot.right = root
            // 返回节点
            return newRoot
          }

          // 进行左右双旋
          function change(root){
            // 判断是否是平衡二叉树
            if (isBalance(root)) {
              return root
            }
            // 如果左节点存在就进行递归平衡左节点
            if(root.left !== null){
              root.left = change(root.left)
            }
            // 如果右节点有值就进行递归平衡右节点
            if(root.right !== null){
              root.right = change(root.right)
            }
            // 获取左右节点的深度
            const leftDeep = getDeep(root.left)
            const rightDeep = getDeep(root.right)

            // 如果左右节点的深度没有超过1表示平衡直接返回当前节点
            if(Math.abs(leftDeep-rightDeep) <= 1){
              return root
            } else if(leftDeep > rightDeep){ // 左边大于右边(右旋)
              // 获取要移动的节点的深度(根节点的左节点的右节点)
              const moveDeep = getDeep(root.left.right)
              // 获取要移动节点的另外一个侧节点的深度(根节点的左节点的左节点)
              const otherDeep = getDeep(root.left.left)
              // 如果大于就先把新根节点进行左旋
              if(moveDeep > otherDeep){
                root.left = leftChange(root.left)
              }
              // 获取到右旋的结果
              const newsRoot =  rightChange(root)
              // 再把右节点进行左右双旋或者右左双旋
              newsRoot.right = change(newsRoot.right)
              // 再把新的节点进行左右双旋或右左双旋
              return change(newsRoot) 
            } else if(leftDeep < rightDeep){ // 右边大于左边(左旋)
              // 获取到要移动节点的深度(根节点的右节点的左节点)
              const moveDeep = getDeep(root.right.left)
              // 获取到另一个节点的深度(根节点的右节点的右节点)
              const otherDeep = getDeep(root.left.left)
              // 如果大于就先把新根节点进行右旋
              if(moveDeep > otherDeep){
                root.right = rightChange(root.right)
              }
              // 获取到右旋的结果
              const newsRoot =  leftChange(root)
              // 再把右节点进行左右双旋或者右左双旋
              newsRoot.left = change(newsRoot.left)
              // 再把新的节点进行左右双旋或右左双旋
              return change(newsRoot) 
            }
            return root
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