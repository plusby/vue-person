<template>
  <div>
    <pre>
      <h2>css面试题汇总</h2>
      <h4>1. css权重</h4>
        !import 最大
        行内样式 1000
        id       100
        class    10
        元素和为元素  1
        通配符        0

        权重会进行相加，权重大的会覆盖权重小的

      <h4>2. css选择器有哪些？</h4>
        id、class、元素、相邻选择器(p+div)、子选择器(ul>li)、后代选择器(li a)、通配符、属性选择器(button[disable=true])、
        伪类选择器(li:nth-child,a:hover)、伪元素选择器(li:before);在css3中区别伪类和伪元素，伪类使用单:,伪元素使用::

      <h4>3. css引入方式有哪些？</h4>
        内嵌通过style引入
        外链通过link引入
        内行样式

      <h4>4. link和@import区别？</h4>
        加载资源的限制
          link不仅可以引入css还可以引入其他类型的文件，import只能引入css
        
        加载方式
          link引入css是在页面加载的时候就同步进行，@import等页面全部加载完成之后

        兼容性
          link是XHTML元素没有兼容性问题，@improt是css2.1中引入的，因此低版本浏览器有兼容性问题

        改变样式
          link可以通过js操作，@import不能

      <h4>5. 浮动元素造成的问题？</h4>
        父元素高度坍塌
        父元素后面的元素结构乱了被浮动元素遮挡

        解决：
          * 给父元素设置固定的高度
          * 给父元素设置overflow:hidden即可清除浮动
          * 用 clear:both样式属性清除元素浮动，如果只有左浮动或只有右浮动，可以单独设置 clear:left或 clear:right，但是设置clear:both则都可以解决，

      <h4>6.position的值分别是相对于哪个位置定位的？</h4>
          * relative 相对自身进行定位
          * absolute 相对外层具有非static的定位元素进行定位，并且脱离文档流，可以设置margin.并且不会和其他元素合并margin
          * fixed    相对于浏览器可视窗口或iframe进行定位，脱离文档流，如果祖先元素具有transform、perspective或filter的属性不为none,那么相当此元素进行定位
          * static   没有定位，默认值。
          * sticky   根据具有滚动属性的祖先元素进行定位(当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时)

      <h4>7. 请说明 position:absolute和float属性的异同。</h4>
        相同点：
          都是的元素脱离了文档流

        不同点：
          float不会覆盖其他具有BFC的元素。可以向左或向右浮动直到碰到其他的浮动元素
          absolute会覆盖其他元素

      <h4>8. CSS的哪些样式可以继承？哪些不可以继承？</h4>
        可继承的font-size、font-family、color、ul、li、dl、dt、dd;
        不可继承的border、padding、margin、width、height;
        和字体相关的样式通常都可以继承，和尺寸相关的不能继承

      <h4>9. HTML是什么？CSS是什么？JavaScript是什么？</h4>
        HTML(Hyper Text Markup Langue)超文本标记语言  结构
        css(cascading style sheet)层叠样式表  样式
        js 行为

      <h4>10. 为什么要初始化CSS？</h4>
        不同浏览器设置的默认值不同，为了在不同浏览器中看到的样式一样，所以要初始化css,
        最简单的就是*{ margin: 0; padding:0;}

      <h4>11. display有哪些值？说明它们的作用。</h4>
        display的值有 block、none, inline、 inline-block、list-item、 table和 inherit。

        block: 把元素设置为块级元素，默认的宽高是父元素的宽和高。可设置宽高；
        none: 让元素不显示，在文档流中不再给它分配空间
        inline: 把元素设置为行内元素，宽高就是内容的宽高，并且不可设置宽高，同行显示
        inline-block: 把元素设置为行内块级元素，宽高默认是内容的宽高，可设置宽高，同行显示
        list-item：把元素设置为块级元素，并且添加了列表的标记样式,一般把一个元素转换为li
          eg: ul div style="display:list-item"
        table: 元素转换为块级表格
        inherit: 从父元素继承display属性
        inline-flex: 行内的flex元素

      <h4>12. 什么是外边距重叠？重叠的结果是什么？</h4>
        重叠结果遵循一下规则：
          * 当相邻的两个元素都为正数的时候，取最大的那个值
          * 当相邻的两个元素都为负数的时候，取绝对值最大的那个
          * 当相邻的两个元素为一正一负的时候，取两则相加的和

      



        

      
    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>