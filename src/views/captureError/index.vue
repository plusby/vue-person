<template>
  <div>
    <h2>前端监控</h2>
    <pre>
      为什么要进行前端监控？
      上线之后，代码报错，或者卡顿或兼容性导致用户无法操作的偶然的异常，有时候都无法复现，尤其是移动端，因此需要设置前端监控。
      监控代码中的各种错误，监控卡顿的页面，监控用户的行为进行错误分析；从而不断优化代码增强用户体验，同时也是第一时间
      可以发现错误从而修复错误

      需要监听的内容
        1. 代码错误
          js代码错误、未处理的promise的报错、静态资源加载错误、
        2. 网络监控
        3. 性能上报
        4. 白屏上报
        5. 用户行文上报

      <p>捕获js错误</p>
        可以通过addEventListener的error或window.onerror来监听错误的发生
          let lastEvent = ''
        window.addEventListener('error', function (event) {
            const err = {
                kind: 'js', // 监控指标的大类
                type: 'error', // 小类
                errorType: 'jsError', // 错误类型
                url: location.href, // 报错路径
                message: event.message, // 错误信息
                filename: event.filename, // 报错文件
                position: `${event.lineNo}:${event.columnno}`, // 报错位置
                stack: event.error.stack, // 报错栈
                selector: lastEvent.ele, // 触发的元素
                userAgent: navigator.userAgent, // 用户设备信息
                title: document.title, // 标题
                eventType: lastEvent.type, // 事件类型
                lineno: event.lineno, // 报错行
                colno: event.colno, // 报错列
                time: new Date() // 报错时间
            }
            console.log(err)
        })

        // 找到当前元素在父级元素下是第几个子元素
        function getChildIndex (ele) {
              let childs = ele.parentNode.children
              let index = null
              for (let i = 0; i < childs.length; i ++) {
                  if (childs[i] === ele) {
                      index = i
                      break
                  }
              }
              return ele.tagName.toLocaleLowerCase() + `[${index}]`
          }
          // 获取操作的元素的路径
          function getPath (target) {
              let curr = target
              let path = ''
              while(curr !== document){
                  path = getChildIndex(curr) + '/' + path
                  curr = curr.parentNode
              }
              return path.substring(0, path.length - 1)
          }

        // window.onerror = function(message, source, lineno, colno, error) {
        //   console.log('捕获到异常：',{message, source, lineno, colno, error});
        //   return true;
        // }

        // 监听所有的事件，获取到报错的具体事件
        const arr = ['click']
        arr.forEach(eventType => {
            document.addEventListener(eventType, (event) => {
                let path = getPath(event.target)
                lastEvent = {
                    ele: path,
                    type: event.type
                }
            },{
                capture: true, // 是否冒泡
                passive: true, // 是否阻止默认事件
            })
        })

        window.onerror 和window.addEventListener('error',function(event){})的区别？
        window.onerror
          无法监听到资源加载的错误
          返回true可以阻止默认事件处理函数的执行
        addEventListener
          可以监听到资源加载的错误
          比window.onerror先触发
          不能阻止默认事件处理函数的执行

        为什么window.onerror无法监听资源的加载错误而addEventListener可以？
          因为资源加载错误会触发当前元素的onerror函数，这些error事件不会向上冒泡，因此可以在捕获阶段被捕获
          addEventListener可以设置冒泡和捕获

       2. 监听Promise的错误
        Promise中没有处理的错误是会直接报错，因此务必在Promise中通过try catch或错误的回调函数来处理错误，
        通过unhandledrejection来监听Promise的错误，可以监听到代码错误，也可以监听到reject抛出的错误，通过event.reason进行区分

        window.addEventListener('unhandledrejection', (event) => {
          let filename = ''
          let line = 0
          let column = 0
          let stack = ''
          let reason = event.reason
          let errorType = 'PromiseError'
          console.log('event', event)
          if (typeof reason === 'string') { // 通过reject抛出的错误
            message = reason
            errorType = 'PromiseRejectError'
          } else if(typeof reason === 'object') { // 是promise回调函数代码的错误
            if (reason.stack) {
              let match = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
              filename = match[1]
              line = match[2]
              column = match[3]
            }
            message = reason.message
          }
          const err = {
            kind: 'js', // 监控指标的大类
            type: 'error', // 小类
            errorType, // 错误类型
            url: location.href, // 报错路径
            message: message, // 错误信息
            stack: reason.stack, // 报错栈
            filename: filename, // 报错文件
            lineno: line, // 报错行
            colno: column, // 报错列
            // stack: event.error.stack, // 报错栈
            selector: lastEvent.ele, // 触发的元素
            userAgent: navigator.userAgent, // 用户设备信息
            title: document.title, // 标题
            eventType: lastEvent.type, // 事件类型
          }
          console.log('err', err)
          // 错误上传
        })

        3. 监控资源错误
          图片，link,script等的资源加载错误
            window.addEventListener('error', function (event, e) {
              console.log('err', event, e)
              // 资源加载错误
              if (event.target && (event.target.src || event.target.href)) {
                const err = {
                  kind: 'js', // 监控指标的大类
                  type: 'error', // 小类
                  errorType: 'resourceError', // 错误类型
                  url: location.href, // 报错路径
                  message: '图片引入错误', // 错误信息
                  src: event.target.src || event.target.href, // 报错文件
                  lineno: event.lineno, // 报错行
                  colno: event.columnno, // 报错列
                  // stack: event.error.stack, // 报错栈
                  selector: getPath(event.target), // 触发的元素
                  userAgent: navigator.userAgent, // 用户设备信息
                  title: document.title, // 标题
                  eventType: lastEvent, // 事件类型
                }
                console.log('err1', err)
              }
           }, true)

        4. 网络监控
           可以在请求拦截器进行存储需要的数据，在响应拦截器进行上报

            function xhttp () {
                let XMLHttpRequest = window.XMLHttpRequest
                let oldOpen = XMLHttpRequest.prototype.open 
                // 重写open方法进行请求前的拦截
                XMLHttpRequest.prototype.open = function (method, url, async) {
                    debugger
                    if (url.indexOf('/logData')) { // 去除发送日志的接口 否则死循环
                        // 存储想要的数据
                        this.logData = { method, url, async }
                    }
                    return oldOpen.apply(this, arguments)
                }

                let oldSend = XMLHttpRequest.prototype.send
                // 重写send方法进行，监听load，error和abort事件进行上报
                XMLHttpRequest.prototype.send = function (body) {
                    debugger
                    if (this.logData) {
                        let startTime = Date.now()
                        let handler = (type) => (event) => {
                            let duartion = Date.now() - startTime
                            let status = this.status // 状态码
                            let statusText = this.statusText
                            let obj = {
                                kind: 'js', // 监控指标的大类
                                type: 'error', // 小类
                                errorType: 'xhrError', // 错误类型
                                url: location.href, // 报错路径
                                path: this.logData.url, // 请求路径
                                method: this.logData.method,
                                async: this.logData.async,
                                data: body || '', // 参数
                                duartion, // 持续时间
                                time: Date.now(), // 时间
                                response: this.response ? JSON.stringify(this.response) : '', // 响应内容
                                status,
                                statusText,
                                userAgent: navigator.userAgent, // 用户设备信息
                            }
                            console.log('obj', obj)
                        }
                        this.addEventListener('load', handler('load'), false)
                        this.addEventListener('error', handler('error'), false)
                        this.addEventListener('abort', handler('abort'), false)
                    }
                    return oldSend.apply(this, arguments)
                }
            
            }
            xhttp()

        5. 监控白屏
           方法一：
            获取指定的元素来判断
          
            function blankScreen (selector) {
              if (document.readyState === 'complete') {
                callBack()
              } else {
                window.addEventListener('load', callBack)
              }
              const callBack = () => {
                const element = document.querySelector(selector)
                if (!element) {
                  // 通过canvas截屏并且上传
                  let img = ''
                  const obj = {
                    kind: 'js', // 监控指标的大类
                    type: 'error', // 小类
                    errorType: 'BlankScreenError', // 错误类型
                    url: location.href, // 报错路径
                    img,
                    userAgent: navigator.userAgent, // 用户设备信息
                  }
                  // 上传数据
                }
              }
            }
            方法二：
              把屏幕分成多个点，获取每个点的元素，通过判断指定的元素(一般是最外层元素)出现的次数来判断白屏，如果
              出现的次数大于总点数的80%就是白屏，否则就不是白屏，

              eg: 获取18个点上的元素，如果这些元素都是html，那么一定是白屏，否则就不是白屏

              elementsFromPoint具有兼容性
            // eleArr = ['html', 'body']
            function blankScreen (eleArr) {
              let count = 0
              // 获取屏幕中18个点的元素
              for (let i = 1; i <= 9; i ++) {
                // 横坐标上的元素
                let xEle = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2)
                // 纵坐标上的元素
                let yEle = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10)
                isWrapper(xEle[0])
                isWrapper(yEle[0])
              }

              if (count > 8) {
                // 通过canvas截屏并且上传
                let img = ''
                const obj = {
                  kind: 'js', // 监控指标的大类
                  type: 'error', // 小类
                  errorType: 'BlankScreenError', // 错误类型
                  url: location.href, // 报错路径
                  img,
                  userAgent: navigator.userAgent, // 用户设备信息
                  screen: window.innerWidth  + '*' + window.innerHeight,
                  time: new Date(),

                }
                // 上传数据
              }

              function isWrapper (element) {
                let selector = getSelector(element)
                // 判断当前元素是否包含在指定元素中，如果包含就记录次数
                if (eleArr.indexOf(selector) !== -1) {
                  count++
                }
              }
              // 获取每个元素身上的id或class或元素本身
              function getSelector (element) {
                if (element.id) {
                  return '#' + element.id
                } else if (element.className) {
                  return '.' + element.className.split(' ').filter(item => !!item).join('.')
                } else {
                  return element.nodeName.toLowerCase()
                }
              }
            }

        6. 性能监控
          通过performance.timing获取相关的性能数据
          performance的文档 https://developer.mozilla.org/zh-CN/docs/Web/API/Performances

          function performanceLog() {
            const {
                connectStart, // 开始连接时间
                connectEnd, // 链接结束时间
                requestStart, // 请求开始时间
                responseStart, // 响应开始时间
                responseEnd, // 响应结束时间
                domLoading, // dom加载时间
                domInteractive,
                domContentLoadedEventStart, // 内容加载时间
                domContentLoadedEventEnd, // 内容加载完毕时间
                fetchStart, // 开始请求时间
                loadEventStart,
                domainLookupEnd, // DNS结束解析
                domainLookupStart, // DNS开始解析
                secureConnectionStart, // ssL开始链接
            } = performance.timing


            let FMP = ''
            let LCP = ''
            // 监听页面中有意义的元素开始加载的时间， 需要给元素添加elementtiming:meaningful属性，这个元素才有意义，才能被监听到
            new PerformanceObserver((entryList, observer) => {
                let perfEntries = entryList.getEntries()
                FMP = perfEntries[0] // 获取开始时间
                observer.disconnect() // 结束观察
            }).observe({
                entryTypes: ['element']
            })

            // 监听页面中最大元素的绘制时间
            new PerformanceObserver((entryList, observer) => {
                let perfEntries = entryList.getEntries()
                LCP = perfEntries[0] // 获取开始时间
                observer.disconnect() // 结束观察
            }).observe({
                entryTypes: ['largest-contentful-paint']
            })

            const obj = {
                kind: 'js', // 监控指标的大类
                type: 'performanceLog', // 小类
                url: location.href, // 报错路径
                userAgent: navigator.userAgent, // 用户设备信息
                TCPconnectTime: connectEnd - connectStart, // TCP链接时间
                ttfbTime: responseStart - requestStart, // 响应时间
                responseTime: responseEnd - responseStart, // 响应的读取时间
                parseDomtime: loadEventStart - domLoading, // dom解析时间
                domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
                TTI: domInteractive - fetchStart, // 可交互时间
                dnsTime: domainLookupEnd - domainLookupStart, // DNS解析时间
                SSLtime: connectEnd - secureConnectionStart, // ssL链接时间
                FMP, // 首次有意义元素的加载时间
                LCP, // 最大内容加载时间
                FPS: performance.getEntriesByName('first-paint')[0], // 页面首次绘制时间
                FCP: performance.getEntriesByName('first-contentful-paint')[0], // 页面内容首次绘制的时间
            }
            console.log('obj1', obj)
            // 发送请求

            // 监听页面中用户首次操作的时间 FID
            new PerformanceObserver((entryList, observer) => {
                let perfEntries = entryList.getEntries()
                let firstInput = perfEntries[0] // 获取开始时间
                if (firstInput) {
                    let inputDelay = firstInput.processingStart - firstInput.startTime
                    let duration = firstInput.duration
                    if (inputDelay > 0 || duartion > 0) {
                        const obj = {
                            kind: 'js', // 监控指标的大类
                            type: 'firstInputperformance', // 小类
                            url: location.href, // 报错路径
                            userAgent: navigator.userAgent, // 用户设备信息
                            FID: inputDelay, // 延迟时间
                            duration, // 处理时间
                            FIS: firstInput.startTime, // 触发时间
                            selector: lastEvent, // 操作的元素
                        }
                        console.log('obj2', obj)
                        // 发送请求
                    }
                }
                observer.disconnect() // 结束观察
            }).observe({
                type: 'first-input',
                buffered: true
            })
            
            
        }
        setTimeout(() => {
            performanceLog()
        },3000)

        7. 反编译
          项目往往通过打包工具进行打包编译并且压缩之后才放到服务器，因此此时的代码都是编译压缩之后的代码，
          报错展示的行和列是无法阅读的，因此需要反编译进行还原代码
          
          source-map插件
            打包编译之后的包中一定要.map.js文件

        8. 用户行为上报
          function listenUser () {
            // 找到当前元素在父级元素下是第几个子元素
            function getChildIndex (ele) {
                let childs = ele.parentNode.children
                let index = null
                debugger
                for (let i = 0; i < childs.length; i ++) {
                    if (childs[i] === ele) {
                        index = i
                        break
                    }
                }
                return ele.tagName.toLocaleLowerCase() + `[${index}]`
            }
            // 获取操作的元素的路径
            function getPath (target) {
                let curr = target
                let path = ''
                while(curr !== document){
                    path = getChildIndex(curr) + '/' + path
                    curr = curr.parentNode
                }
                return path.substring(0, path.length - 1)
            }
            
            const handler = type => event => {
                // 可以根据当前元素身上的属性进行过滤要监听的元素，并不一定所有的元素都要被监听到
                let target = event.target
                if (target === document.body.parentNode) {
                    return
                }
                let path = getPath(target)
                const obj = {
                    kind: 'js', // 监控指标的大类
                    type: 'userPath', // 小类
                    url: location.href, // 报错路径
                    userAgent: navigator.userAgent, // 用户设备信息
                    path, // 触发元素路径
                    time: new Date(), // 触发时间
                    eventType: type,
                }
                console.log('obj', obj)
                // 上传
            }

            // 监听事件功能
            let events = ['click']
            events.forEach(type => {
                document.addEventListener(type,handler(type),false)
            })
        }

        9. vue错误上报
          vue errorHandler
          原理也是使用try catch封装了nextTick,$emit, watch,data等

        9. 上传监听到的数据
          1. 通过ajax的post请求
          2. 通过创建图片，把数据传递到后端
            new Image('https:xxx.a.png?data=data')
          通过web worker启动一个线程去发送请求，不影响主线程的执行

        10. 成熟的第三方开源框架sentry
            sentry把所有的回调函数使用try catch封装一层

    </pre>
    

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>