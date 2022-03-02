<template>
  <div>
    <pre>
      <h5>移动端适配方案</h5>
      基本概念
        1. 屏幕尺寸
          屏幕对角线的长度，1英尺 = 2.54cm
          屏幕尺寸 = 屏幕斜边像素/PPI(像素密度)

          iphone6: 4.7英寸

        2. 物理(设备)像素
          屏幕的物理像素，任何设备屏幕的物理像素在出厂的时候就已经固定不可变了，单位是pt(点)

        3. 屏幕分辨率
          屏幕上纵向和横向的物理像素点数，一般表示方式是纵向物理像素*横向的物理像素，属于硬件，出厂之后无法改变

        4. css像素
          前端的测量单位，属于软件，可变,值是相对的并不是绝对的

        5. 像素密度ppi(pixels per inch)
          一英寸上显示的物理像素的数量，像素密度和屏幕尺寸、屏幕分辨率有关，屏幕分辨率不变的情况下，屏幕尺寸越小
          像素密度越大，屏幕尺寸不变，分辨率越高像素密度越大
          PPI = 屏幕斜边的像素 / 屏幕尺寸

        6. 设备像素比DPR
          DPR = 设备像素/css像素
          一个css像素中占用了几个设备像素
          获取： window.devicePixelRatio

        7. viewport
          width: 视口的宽度
           数字或字符串，不建议设置为数字，有些安卓手机不支持，如果不设置宽度，那么页面默认的宽度就是980,有些手机默认值不一样，从750-1080之间

          height: 视口的高度

          user-scalable 是否允许用户进行页面缩放,no或yes,如果设置为no或者不设置，那么在移动端会把整个网页进行缩放
            全部显示在屏幕上，比如750的宽度，在375的手机上，那么就会缩小一倍，设置yes就不会自动缩放，
            只显示了750的一半

          注意： ios10不支持user-scalable=no,可以通过阻止document的touchstart的默认行为解决

          initial-scale 页面初始缩放值，值为一个数字，可以是小数， 缩放的结果=css像素/这个数字
            initial-scale=1相当于width=device-width，如果这两个值同时存在，那么取结果最大的值，例如：
            375的屏幕，设置width=device-width,initial-scale=0.5,那么最终html的宽度为375/0.5 = 750

            缩放比 = css像素/ viewport宽度

          minimum-scale 页面最小能够缩放的比例，值为一个数字，可以是小数
          maximun-scale 页面最大能够缩放的比例，值为一个数字，可以是小数

          目前移动端主流的viewport 
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximun-scale=1,minimum-scale=1,user-scalable=no">
            同时设置initial-scale=1.0, maximun-scale=1,minimum-scale=1,可以避免一些不兼容的问题，有些第三方功能可以破坏initial-scale，
            比如给老年机设置字体放大的工具

      适配：
        在不同尺寸的手机设备上，页面相对性的达到合理的展示(自适应)或者保持统一效果的等比缩放

        适配的元素
            字体
            宽高
            间距
            图像
        
        适配方法
            百分比适配
            viewport适配
            rem适配
            vw,vh适配


      适配方案
        1. 百分比适配
          适合固定高度的布局，宽度用百分比比较方便些
          高度也需要适配可以使用百分加上其他的适配方案比如百分比加em或者rem
          
          缺点：计算可能不是很精准，会有误差, 根据父级需要大量的计算

        2. viewport缩放适配
            把所有机型的屏幕宽度的css像素设置为一致(html宽度设置成一致的),
            手机的设备像素不能改变，但是Css像素可以改变，可以让css为375的屏幕设置为css大小为414，
            就是设置html的宽度
            viewport需要通过js动态的设置
            通过设置比例，把宽度缩放成一致

            缩放比 = css像素/目标像素(375)

            (function(){
                // 获取可视区域的宽度
                var curWidth = document.documentElement.clientWidth
                // 缩放成目标宽度
                var target = 375
                // 缩放比例
                var scale = curWidth/target
    
                // 获取meta的viewport
                var viewport = document.getElementById('viewport')
                // 设置viewport缩放比，这三个属性要一起设置，否则浏览器默认会让整个页面的内容显示出来，并且不能设置width, 因为浏览器默认选择最大的宽度，如果width比缩放的值大，那么缩放无效果
                viewport.content = `initial-scale=${scale},user-scable=no,minimum-scale=${scale},maximum-scale=${scale}`
            })()

            缺点：
              1. 计算出来的缩放比例可能是无穷的小数，会有误差
              2. 通过缩放，图片可能看不清晰

        3. rem
          rem是相对于根元素的字体大小的单位，根据不同的屏幕大小通过设置根元素的字体大小来达到适配的效果

          原理：
            把屏幕分成指定的份数，然后通过设计稿测量计算出一个元素占用多少份，不同屏幕分成的份数是一样的
            一个元素占用的份数也是一样的，这样就达到了不同屏幕的适配效果，大屏幕元素显示的大一点，小屏幕
            元素显示的小一点；
            eg:
              iphone6的屏幕大小为375,那么把它分成100份，每份的大小就是根元素的字体大小37.5也就是1rem;
              那么给定的设计稿宽度为750,测量出一个元素的宽度为75px,那么css应该就是75/1rem=75/37.5=2rem
              也就是75占用两份；如果在iphone5上显示，那么它的屏幕大小是320,分成100份，每份是32px,1rem=32px
              那么2rem=2*32px=64px,所以在iphone5上的这个元素的宽度显示为64px比iphone6上的75px小,从而达到
              了缩放的效果进行适配

            具体的计算公式：
              1. 屏幕宽度为cw，设计稿为750px;
              2. 把屏幕分成750份，每份n = cw/750
              3. 把根元素的字体大小设置为npx,那么1rem = npx;
              4. 假设设计稿上测量出一个div的宽度为rw(px)
              5. 需要计算的css宽度为w
              6. 则 w/cw = rw / 750 => w = (rw/750)*cw => w = n * rw => w = 1rem * rw

            结论：当我们设置的根元素的字体大小为屏幕宽度/设计稿宽度时，那么代码中写入的css
                  大小就是从设计稿测量出来的大小，无需进行计算
              
            缺点:
              有些浏览器存在最小字体，谷歌的最小字体为12px,所以当设置根元素的字体大小小于12px
              时可能就会出问题，所以需要把它进行放大比例进行计算

            改进：把第六步w = 1rem * cw 放大100倍，w = 1rem * cw * 100，那么在设计稿中测量
                 出来的元素都要再除以100,设计稿测量出一个元素的宽度为100px,那么就是100/100 = 1rem
                
            结论: 当我们设置html的font-szie为 (屏幕宽度/设计稿宽度)*100 的px 时 当我们在设计稿上测
                  得的 px 单位值,直接将值除以100换为 rem单位写到代码里面即可
 
          代码实现：
            (function(doc, win, designWidth){
                const html = doc.documentElement
                const refreshRem = () => {
                    const clientWidth = html.clientWidth
                    if (clientWidth >= designWidth) { // 当前屏幕的宽度大于设计稿的宽度
                      html.style.fontSize = '100px' // 设置固定值不随屏幕的变化而变化
                    } else {
                      html.style.fontSize = 100 * (clientWidth/designWidth) + 'px'
                    }
                }
                doc.addEventListener('DOMContentLoaded', refreshRem) // dom加载完之后执行
            })(document, window, 750)

          以上的适配方案适合在没有使用任何框架的情况下使用

          目前经常使用的上面这种适配，根据给定的设计稿选择相应的基准机型，把设计稿的尺寸传递为
          第三个参数，通过设计稿量出元素的大小除以100即可


        4. lib-flexible
          
          在使用vue或者React和webpack的情况下，使用淘宝已经封装好的第三方插件lib-flexible进行适配，再加上postcss-plugin-px2rem插件
          就不需要去手动计算，直接使用设计稿上测量出的结果

          要把index.html里面的<meta name='viewport'>标签删除;因为lib-flexible会自动添加

          postcss-plugin-px2rem 是把px自动转rem

          postcss.config.js中配置如下
            module.exports = {
              plugins:{
                  'postcss-pxtorem': {
                      // rootValue: 37.5, // Vant 官方根字体大小是 37.5
                      rootValue({file}) {
                          return file.indexOf('vant') !== -1 ? 37.5 : 37.5 // 这里一般是37.5，因为lib-flexible里是375/10
                      },
                      propList: ['*'],
                      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
                  }
              },
            }

          注意： 
            dom结构里的行内样式(style属性)以及通过js代码动态设置的单位不会自动转换


        5. vw适配
            vw的全称是viewport`s width
            vh的全称是viewport`s height

            原理：
                浏览器会把屏幕分成100份，1vw就是1份

            vmin 取vw和vh中的最小值
            vmax 取vw和vh中的最大值

            兼容情况：
                ios: 必须要大于等于ios 8
                安卓： 大于等于4.4的版本

            应用：
                根据给定的设计稿，如果不是2倍设计稿，那么直接使用给定设计稿的宽度/100,得到1vw的大小，
                再根据设计稿测量出来的大小除以这个值，得到的就是要要写的css大小，如果拿到的是2倍设计稿
                那么使用设计稿的宽度/2/100,再进行计算

            缺点：
                每次都需要手动去计算css的大小。可以使用scss或less定义函数自动计算

            scss:
                @function vw($px) {
                    @return $px/(750 / 100) * 1vw
                }

            less：
              .vw(@px) {
                @val: @px/(750 / 100) * 1vw
              }
    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>