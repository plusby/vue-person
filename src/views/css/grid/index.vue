<template>
<div>
  <div class="wrap">
      <div class="items items-1">1</div>
      <div class="items items-2">2</div>
      <div class="items items-3">3</div>
      <div class="items items-4">4</div>
      <div class="items items-5">5</div>
      <div class="items items-6">6</div>
      <div class="items items-7">7</div>
      <div class="items items-8">8</div>
      <div class="items items-9">9</div>
      <div class="items items-9">10</div>
  </div>
  <pre>
    grid栅格布局
    给容器元素添加栅格布局
    display: grid/inline-grid;

    一. 容器上的属性
        1. grid-template-columns
            设置列的大小和数量

            1.1 grid-template-columns: 100px 100px;
                设置列数为两列，每列元素的宽度都是100px
            
            1.2 grid-template-columns: repeat(列数，每列的宽度)
                repeat(3, 100px)
                通过repeat设置列数为三列，每一列的宽度为100px

                repeat(2, 100px 20px 80px);
                两列，每一列有三个元素，宽度分别是100px,20px,80px

            1.3 grid-template-columns: repeat(auto-fill，每列的宽度)
                auto-fill
                表示根据指定的列的宽度，列数为自动填充剩下空间的数量，
                grid-template-columns: repeat(auto-fill，100px)
                每一列的宽度是100px;数量是自动填充满整个容器的宽度，放不下自动换行

            1.4  grid-template-columns: 1fr 1fr;
                fr
                指定每列所占的比列
                grid-template-columns: 150px 1fr 2fr;
                3列，第一列的宽度为150px,第二列占据剩下空间的三分之一，第三轮占据剩下空间的三分之二

            1.5 grid-template-columns: 100px minmax(150px, 1fr) 100px;
                minmax(val1,val2)
                指定列的最小和最大宽度

                第一列宽度是100px,第二列的最大宽度是1fr占据剩下的空间最小宽度是150px，第三列是100px

            1.6 grid-template-columns: 100px auto 100px;
                auto自动填充剩下的空间
                第一列宽度是100px，第二列宽度是填满剩余空间，第三列是100px

                圣杯模式：
                    grid-template-columns: 200px auto;

                第一列是200px,第二列沾满剩下的空间

            1.7 grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
                [名称]
                指定具有名称的网格线

        2. grid-column-gap/column-gap: 20px;
            设置列之间的间距为20px

        3. grid-row-gap/row-gap: 20px；
            设置行之间的间距为20px

        4. grid-gap/gap: grid-row-gap grid-column-gap;
            grid-gap: 10px 20px;
            设置行之间的间距是10px，列之间的间距是20px;

        5. grid-auto-flow: column / row (dense);
            指定元素排列的方式，默认是row先行后列，column先列后行;
            dense表示紧密排列，如果前面有间隙。并且后面的元素放不下，那么会从后面找一个放得下的元素来填充

        6. justify-items: start | end | center | stretch;
            设置单元格中的内容在水平方向上的对齐方式
            stretch：拉伸，占满单元格的整个宽度（默认值）。

        7. align-items: start | end | center | stretch;
            设置单元格中的内容的垂直方向上的对齐方式
            stretch：拉伸，占满单元格的整个宽度（默认值）。

        8. place-items: align-items justify-items;

        9. justify-content:  start | end | center | stretch | space-around | space-between | space-evenly;
            设置容器中整个内容区域的水平方向上的对齐方式

        10. align-content: start | end | center | stretch | space-around | space-between | space-evenly;
            设置容器中整个内容区域的垂直方向上的对齐方式
            space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

        11. place-content: align-content justify-content>

        12. grid-auto-columns
            当子元素的个数超出设置的行和列中的个数的时候，通过grid-auto-columns给多余的子元素设置宽度
            <img src="@img/grid2.png" alt="">
            没有设置grid-auto-columns中沾满剩余空间
            <img src="@img/grid3.png" alt="">

        13. grid-auto-rows
            当子元素的个数超出设置的行和列中的个数的时候，通过grid-auto-columns给多余的子元素设置高度
            
        14. grid-template
            grid-template属性是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式。

        15. grid
            grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、
            grid-auto-flow这六个属性的合并简写形式。

        16. grid-template-areas
            grid-template-areas: 'a a a'
            指定区域，使得列和行占用不通的区域

    二. 项目属性 

        1. grid-column-start
            指定项目列开始的起始网格线
            指定第一个项目元素从第二个网格线开始
            <img src="@img/grid4.png" alt="">

        2. grid-column-end
            指定项目列结束的网格线
             指定第一个项目元素从第二个网格线开始,再第四个网格线结束
            <img src="@img/grid5.png" alt="">

        3. grid-row-start
            指定项目行开始的起始网格线

        4. grid-row-end
            指定项目行结束的起始网格线
        
        5. grid-column-start/grid-column-end/grid-row-start/grid-row-end
            这四个属性的值可以是网格线的条数，也可以是网格线的名称，还可以使用span num来执行直接跨越几个网格线

            第二个项目元素行直接跨2个网格
            <img src="@img/grid6.png" alt="">

            使用这四个属性，如果产生了项目的重叠，则使用z-index属性指定项目的重叠顺序。

        6. grid-column
            属性是grid-column-start和grid-column-end的合并简写形式

        7. grid-row
            属性是grid-row-start属性和grid-row-end的合并简写形式。
            eg:
                .item-1 {
                    grid-column: 1 / 3;
                    grid-row: 1 / 2;
                }
                /* 等同于 */
                .item-1 {
                    grid-column-start: 1;
                    grid-column-end: 3;
                    grid-row-start: 1;
                    grid-row-end: 2;
                }

        8. grid-area
            属性指定项目放在哪一个区域。
            把第三个项目放在a区域 grid-area: a;
            <img src="@img/grid7.png" alt="">
            <img src="@img/grid8.png" alt="">

            grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。
            grid-area: row-start / column-start / row-end / column-end;

        9. justify-self: start | end | center | stretch;
            属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。

        10. align-self: start | end | center | stretch;
            属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。

        11. place-self
            属性是align-self属性和justify-self属性的合并简写形式。
            place-self: align-self justify-self;
  </pre>
  <h4>注意： grid兼容性，不兼容ios10.3,有的iphone6和iphone7都是这个版本的ios</h4>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.wrap{
    display: grid;
    // grid-template-columns: 100px 100px 100px;
    grid-template-columns: repeat(3,100px);
    grid-template-rows: repeat(3,100px);
    grid-auto-rows: 50px;
    width: 400px;
    height: 500px;
    border: 2px solid red;
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h t';
}
.items{
    background: red;
}
.items-1{
    background: #cccc;
    grid-column-start: 1;
    grid-column-end: 4;

}
.items-2{
    background: rgb(207, 247, 162);
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: span 2;
}
.items-3{
    background: rgba(44, 217, 248, 0.8);
    grid-area: a;
    justify-self: end;
}
.items-4{
    background: rgba(69, 31, 206, 0.8);
}
.items-5{
    background: rgba(188, 226, 16, 0.8);
}
.items-6{
    background: rgba(136, 45, 163, 0.8);
}
.items-7{
    background: rgba(156, 13, 20, 0.8);
}
.items-8{
    background: rgba(21, 159, 223, 0.8);
}
.items-9{
    background: rgba(204, 204, 204, 0.8);
}
</style>