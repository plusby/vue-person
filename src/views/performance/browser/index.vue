<template>
  <div>
    <h2>浏览器原理</h2>
    <h4>问题1：在浏览器中从输入url到页面的展示都经历了什么？</h4>
    <pre>
      1. 查看域名是否在浏览器缓存中被缓存过并且本地(hosts)是否记录过，没有缓存或记录过，就调用解析器去向DNS服务端查询IP, 将域名解析成ip + 端口号(DNS是基于UDP)
      2. 如果请求的是https协议，还会进行SSL(TLS)协商
      3. 创建Tcp链接，用于传输数据(属于传输层)(三次握手)
      4. tcp链接成功，开始进行请求(请求包括：请求行、请求头、请求体)
      5. 如果是http1.1或http2.0(h2)默认会进行长连接(keep-alive),下一次传输的时候会使用上一次创建的链接
      6. 服务端返回响应数据(响应行、响应头、响应体)
      7. 服务端如果返回301或302，会进行重定向(比如http定向到https)
      8. 服务器返回304就去浏览器缓存中获取
      9. 浏览器收到数据之后，根据Content-type进行相应的解析
      10. 如果Content-Type: text/html; charset=UTF-8，则
          11.1 解析html转换为dom树
              从远程下载 Byte，并根据相应的编码 (如 utf8) 转化为字符串，通过 AST 解析为 Token，生成 Node，最后生成Dom树。
              <img src="@performance/10.png" alt="">
          11.2 解析Css为CSSOM
          11.3 根据CSSOM和dom树，计算出dom树中每个节点的具体样式(Attachment)
              <img src="@performance/11.png" alt="">
          11.4 创建渲染树。将可见的元素添加到渲染树中，并计算元素相应的位置渲染到页面上(布局)
              <img src="@performance/12.png" alt="">
              <img src="@performance/13.png" alt="">
          11.5 根据渲染树进行绘制并显示在页面上
              <img src="@performance/14.png" alt="">
          <img src="@performance/1.png" alt="">

      详解每个知识点：
        域名的组成：
          主机名.权威域名.com/cn等.root
          eg:
            www.baidu.com
            www: 主机名,主机名还有mail,member,space
            baidu: 权威域名
            com域名，cn域名，net域名等
            .root就是根域名可以简写成.，因为是根域名已经是顶端了所以可以不写
            <img src="@performance/4.png" alt="">
        浏览器获取到域名对应的ip地址的过程(DNS域名解析的过程)：
          解析器就是应用程序
          1. 解析器会向DNS服务器发送请求，而DNS服务器的地址就是在电脑本地，可以通过网络设置进行设置，如果没有这个地址或这个地址是错误的，那么我们
              可能遇到的现象就是微信,QQ可以正常聊天，而浏览器无法访问，因为聊天都是直接用的ip地址访问服务器。这个DNS服务器就是在本地的服务器
          2. 本地服务器会咨询根服务器获取到com域名服务器地址
          3. 本地服务器再去咨询com域名服务器获取到要查询的域名的服务器地址
          4. 本地服务器再去咨询查询的域名的服务器获取到对应的ip地址
          5. 本地服务器再去把对应的ip地址返回给解析器
          6. 解析器再返回给浏览器，浏览器再去请求
          注意： DNS是基于UDP
          <img src="@performance/3.png" alt="">

        前端对DNS的优化：
          可以在html头部添加dns缓存的域名：
            meta http-equiv='x-dns-prefetch-control' content='on'
            link rel='dns-perfetch' href='www.XXX.com'
        
        DNS的优点：
          不用记忆较长的ip地址
          ip地址没有暴露出来因为有效的防止了DDos攻击

      面试题：
        1. 为什么css放在header中，而js放在body底部？
          1. 因为Css的加载并不会阻塞html的加载，
            如果css放在底部，页面的渲染是从上到下的，边解析边渲染，等到Css解析的时候dom树已经渲染一部分，当再次解析css的时候会引起回流和重绘重新
            12.3的步骤，因此比较消耗性能，并且页面开始展示的是dom结构没有样式，然后再展示出正常的样式，有个
            闪动的效果，体验也不好，css放在顶部不会造成这个问题
          2. js在没有设置defer或ansyc的时候，它的加载和执行都会阻塞页面的渲染，因此会影响页面的展示给用户
            的体验不好

        2. defer和async的区别？
          defer在html解析的时候并行加载，不会阻塞html解析，等到dom解析完成之后才执行
          async在html解析的时候并行加载，不会阻塞html解析，等到js加载完成之后就开始执行，并且阻塞html的解析
          注意：
            使用async，脚本无法按照顺序执行，因为哪个先加载完成就执行哪个，如果脚本之间有依赖关系，就使用defer,
            如果同时设置了这两个属性，那么默认会采取async
          <img src="@performance/2.png" alt="">
        3. DOMContentLoaded和load的区别？
          DOMContentLoaded:是html解析渲染完成之后就执行
          load: 在html解析渲染完成之后还要等到页面中所有的资源(图片，音频和视频)加载完成之后才会执行
          因此load是在DOMContentLoaded之后执行，jquery的ready就是DOMContentLoaded

        4. 什么是重绘？什么是回流？怎么避免回流？
          重绘: 元素的样式发生变化(color, background-color,visibility)
          回流：元素的大小，位置发生变化，就会触发重新布局，重新生成渲染数，浏览器窗口的变化也会引起回流
          注意：回流一定会触发重绘，重绘不一定会回流
          避免(优化)：
            1. 使用文档碎片fragment去批量操作dom
            2. 使用class等去批量操作css
            3. 分离读写，操作dom的就放在一起，读取的放在一起(现在浏览器都有渲染队列的机制)
              eg:
                不应该
                 a.style.width = '100px'
                 const h = a.style.height
                 a.style.color = 'red'
                应该：
                 // 写
                 a.style.width = '100px'
                 a.style.color = 'red'
                 // 读
                 const h = a.style.height
                 浏览器解析完第一行之后不会立马去修改，而是等待一会解析完下一行看看是否也是操作dom,
                 如果是就再解析下一行，如果不是就立马修改
            4. 动画应该放在position:absolute或fixed的元素上从而脱离文档流
            5. css3硬件加速器(GPU加速)
                tranform、opacity等会触发硬件加速，不会引起回流和重绘，但是不能过多的使用，过多的使用会占用大量的内存，造成性能负担
            6. 避免使用Table布局和css表达式

        5. TCP
            网络体系OSI模型：
              七层： 应用层(http,FTP...)、表示层(TSL\SSL)、会话层、传输层(TCP/UDP)、网络层(IPV4,IPV6)、数据链路层(以太网，无线)和物理层(光纤，无线设备)
              五层： 应用层、传输层、网络层、数据链路层和物理层
            
            传输层：
              负责端到端的链接，链接成功就可以通信了
              TCP: 是全双工，可以互发信息,并且是面向字节流的
              四大特性: 可靠传输，流量控制，拥塞控制，连接管理
              TCP的三次握手：
                TCP报文中有SYN(Synchronization同步),ACK(acknowledgment确认)，FIN(finish结束)
                1. 客户端向服务端发送TCP报文
                  报文中携带SYN=1表示要和服务端进行数据同步，还有随机生成的序号   
                2. 服务端接受到客户端的报文后，向客户端返回报文进行确认
                  报文中携带SYN=1和ACK=1表示确认同步，还有随机生成的序号和确认号，确认号就是客户端发来的序号+1
                3. 客户端接收到服务端发来的报文之后，客户端还需要向服务端进行确认，如果不确认的话，服务器不知道自己响应的数据是否被接收到
                  报文中携带序号和确认号和ACK=1表示确认，这里的序号就是服务器的确认号，这里的确认号就是服务器的序号+1
                
              TCP的四次挥手：
                客户端或服务端需要断开链接
                以客户端为例：
                1. 客户端向服务端发送报文表示要确认结束
                   报文中携带FIN=1、ACK=1、序号和确认号表示确认结束链接
                2. 服务端接收到数据之后，向客户端发送ACK表示确认，此时客户端还不能断开链接，因此服务端可能还会发送数据
                  报文中携带ACK=1、序号和确认号，确认号为客户端发来的序号+1，序号为客户端发来的确认号
                3. 服务端向客户端发送FIN和ACK表示最终的确认结束
                  报文中携带FIN=1、ACK=1、序号和确认号(步骤2中的序号和确认号)
                4. 客户端接收到数据之后，向服务端发送ACK表示确认
                  报文中携带ACK=1、序号和确认号，确认号为服务端发来的序号+1，序号为服务端发来的确认号
                
                为什么要四次挥手，不是三次？
                  因为服务端向客户端发送ACK确认之后，可能还存在为未发送完的数据，因此需要服务端再次确认结束
                  <img src="@performance/6.png" alt="">
                  <img src="@performance/8.png" alt="">

        5. Tcp和UDP区别？
          TCP: 
            需要三次握手进行确认
            分段传输
            优点：
              安全可靠
            缺点：
              因为需要握手建立链接所以相对比较耗时

          UDP:
            无需确认
            不进行分包
            优点：
              创建链接快
            缺点:
              不安全，会丢包
            应用场景：
              直播，聊天

        socket:
          是封装化的TCP

        6. http0.9、http1.0、http1.1、http2.0
          http0.9：最早负责传输html,没有请求头和响应头
          http1.0: 可以设置请求头和响应头，根据请求头处理不同的资源返回
          http1.1: 默认开启了长连接(keep-alive),可以复用创建的链接，管线化，但是服务器响应只能一个一个处理响应(队头阻塞)
          http2.0：多路复用(多条并发请求使用同一个TCP链接来发送数据，一个域名一个TCP),头部压缩，服务器可以主动推送数据给客户端
          http3.0: 解决了TCP队头阻塞问题，QUIC协议，采用了UDP协议

        http
          超文本传输协议,是无状态的
          http请求和响应报文的格式：
            起始行：描述请求或响应的基本信息(请求行：请求方式 请求路径 协议版本号\响应行：协议版本号 状态码 原因)
            头信息：头信息的key不能有_符号，不能有空格
            空行
            请求体：

        怎么解决http的无状态？
          cookie: 是服务端发送给客户端的数据，客户端在下次访问的时候会在请求头中携带cookie。
              如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束；如果在浏览器中设置了
              cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失
              读写cookie:
                客户端通过document.cookie属性来读写当前网页的Cookie,以key:value的形式
              删除cookie：
                通过设置过期时间从而达到删除，max-age:将要过期的最大秒数设置为-1即可删除，document.cookie="a=3;max-age=-1";
              过期时间：
                如果没有设置max-age或expires就是会话级别，关闭当前窗口就过期了
              cookie有哪些字段：
                name: cookie名称
                value: cookie的值
                Domian：当前页面的域名
                path： 路径
                Expires/max-age： 过期时间，Expires必须转为toGMTString
                httpOnly: js无法读取操作cookie
                secure: 只允许在https下使用
                sameSite: Node任何情况下都会向第三方网站请求发送cookie
                          Lax(默认)只有导航到第三方网站的get链接才会发送cookie,图片和iframe和form不会发送
                          Strict任何情况下都不会向第三方网站请求发送cookie

            缺点：客户端每次请求都要携带cookie，影响性能，cookie的存储大侠为4k左右
          
          sessionStorage:
            会话存储，关闭当前窗口就清空存储，只能存储字符串类型的值，同源下不同标签页sessionStorage不会共享

          localStorage:
            永久存储，只能存储字符串类型的值，同源下不同标签页localStorage会共享

            如果在指定时间删除localStorage的存储
              重写setItem和getItem方法，在setItem的时候传递过期时间并存取起来，再get的时候获取到对应的存储时间，和当前时间进行比较，
              如果超过这个时间就删除存储返回空，否则就返回存储的数据
              function initLocalStorage() {
                localStorage.setItem = function (key, value, time = 1000) {
                  const expiresTime = Date.now() + time * 1000;
                  const payload = {
                    __data: value,
                    __expiresTime: expiresTime,
                  };
                  Storage.prototype.setItem.call(localStorage, key, JSON.stringify(payload));
                };
                localStorage.getItem = function (key) {
                  const value = Storage.prototype.getItem.call(localStorage, key);
                  if (typeof value === "string") {
                    const jsonVal = JSON.parse(value);
                    if (jsonVal.__expiresTime) {
                      if (jsonVal.__expiresTime >= Date.now()) {
                        return JSON.stringify(jsonVal.__data);
                      } else {
                        return null;
                      }
                    }
                  }
                  return value;
                };
              }
              initLocalStorage();

            监听存储的数据的变化通过window.onstorage= fn

          三者之间的区别？
            cookie存储空间小，webStorage存储空间大
            cookie可以被服务器设置，而webStorage只能在浏览器设置
            sessionStorage关闭当前标签页就清空了，而localStorage需要手动清除

        7. https
            http + ssl/TLS(目前浏览器都用TLS)
            ssl/TLS： 加密安全协议
            1. 客户端向服务端发送请求，携带TLS版本，加密套件，随机数1
            2. 服务端收到客户端的消息后，响应客户端，携带TLS版本，加密套件，随机数2，证书和公钥
            3. 客户端使用服务端的公钥对预主密钥进行加密，把加密之后的密文和随机数3发送给服务端
            4. 服务端使用私钥对接收到的密文进行解密得到预主密钥
            5. 客户端和服务端都使用随机数1、随机数2、随机数3加上预主密钥形成会话密钥，后面的数据传输都是通过会话密钥加解密，而会话密钥是对称的

            注意：
              公钥和私钥是非对称的，而会话密钥是对称的，通过非对称加密获取到对称的会话密钥，因为非对称加解密比较消耗性能，
              使用随机数就是为了防止数据被篡改，非对称和对称加密都被SSL/TLS使用到了，https的默认端口是443
          <img src="@performance/5.png" alt="">

        8. CDN
            content-Delivery-network 内容分发网络
            作用：缓存源服务的资源，加快用户访问速度
            优点：1. 用户不用直接访问源服务器，所以源服务器可以防止dDOS攻击
                  2. 根据负载均衡，通过最近的CDN服务器返回给用户，加快了用户访问的速度
                  3. 减轻了源服务器的压力和减少了源服务器的带宽 

            访问CDN缓存流程：
            1. 浏览器向DNS服务器发起域名解析的时候，如果有CDN,DNS服务器把解析权交给CNAME指向的CDN专用DNS服务器
            2. CDN的DNS服务器把CDN的负载均衡设备的ip地址返回给浏览器
            3. 浏览器向负载均衡服务器发起请求，它会选择一个适合的CDN缓存服务器进行提供服务,并把这个服务器ip返回给浏览器
                选择依据：1. 选择出距离用户最近的一台
                         2. 选择出具有用户访问资源的一台
                         3. 选择出负载最小的一台
            4. 浏览器向CDN缓存服务器发起请求，服务器有缓存就返回缓存，没有就去源服务器请求并返回给浏览器
            <img src="@performance/15.png" alt="">

            CDN缓存策略：
              CDN 节点缓存策略一般都会遵循HTTP协议
              1. 先根据源服务响应头中的缓存字段进行判断是否需要缓存，有以下字段是不进行缓存，否则就缓存
                 s-maxage = 0,no-cache,no-store,private,max-age=0
              2. 如果响应头中没有缓存相关的，那么就会从CDN配置的缓存规则进行缓存，如果配置了缓存规则就要遵循以下优先级，否则走CDN默认缓存
                 权重 > 后缀名 > 目录
              3. CDN默认缓存,根据不同的运营商有不同的默认缓存规则
                 

            注意:  1. CDN 仅会对于 GET 请求进行缓存
                   2.CDN缓存只针对于静态资源
                   3. 当源服务器资源更新后，如果 CDN 节点上缓存数据还未过期，用户访问到的依旧是过期的缓存资源，
                      因此需要手动刷新相关资源，使 CDN 缓存保持为最新的状态。
        
        9. IPV4和子网掩码
            ip: 是网络号加主机号组成
                网络号：表示同一个网络区域
                主机号：通过主机号表示不同的地址

                是四组八位二进制表示
                xxxxxxxx.xxxxxxxx.xxxxxxxx.xxxxxxxx 总共为32位，每组的二进制最低为00000000转为十进制0，最高为11111111转为十进制为255
                因此每一组的十进制范围是0-255，每组有256个号码

            子网掩码：
              用来划分网络号和主机号的，它表示是在同一个网络

              某一局域网下的ip有：
                192.168.0.0, 192.168.0.1, 192.168.0.2, 192.168.0.3四个ip地址
                分别转化为二进制：
                  192.168.0.0 -> 11000000.10101000.00000000.00000000
                  192.168.0.1 -> 11000000.10101000.00000000.00000001
                  192.168.0.2 -> 11000000.10101000.00000000.00000010
                  192.168.0.3 -> 11000000.10101000.00000000.00000011

                那么如何计算出子网掩码？
                  1. 从ip地址的二进制中从左往右查找，直到找到不同项为止
                  2. 四个地址中的11000000.10101000.00000000.000000都是相同的，后两位不同
                  3. 相同项都取1得到，不同项取0，得到11111111.11111111.11111111.11111100
                  4. 再转化为十进制255.255.255.252就是这个局域网的子网掩码
                
                网络号：这片局域网中的所有ip前面相同的部分就是网络号(192.168.0)
                主机号：这片局域网中的所有ip后面不相同的部分就是主机号(0,1,2,3)

                那么192.168.0.4就不属于这个局域网中的ip.因为转化为二进制11000000.10101000.00000000.00000110，得到的子网掩码就是255.255.255.251

                <img src="@performance/7.png" alt="">

              子网掩码的表示方式：
                因为子网掩码太长，所以可以用CIDR的方法来表示，二进制的子网掩码为11111111.11111111.11111111.11111100，共有30个1，所以可以
                表示为192.168.0.0/30，要以起始的ip作为/左边的值

              给出ip地址和对应的子网掩码计算出网络号和主机号
                ip: 192.168.50.10
                子网掩码：255.255.192.0
                子网掩码转换为二进制：11111111.11111111.11000000.00000000
                从前面的1可以看出网络号应该就是192.168,主机号就是50.0
                那么用CIDR表示就是192.168.0.0/18
        10. 说说前端缓存
            前端缓存分为强缓存和协商缓存
            1. 强缓存
              强缓存中主要使用Expires和cache-control两个头字段，如果两者同时存在，那么就采用cache-control，它的优先级最高，
              当命中缓存，客户端不在请求，直接从缓存中读取内容，返回状态码为200

              Expires(终止，到期)
                服务端响应头中会携带Expires，表示资源的过期时间，如果在这个时间内再次获取这个资源就直接从缓存中读取

                优点：
                  根据时间设置缓存的过期与否，为用户节省流量

                缺点：
                  过了缓存时间，不管资源是否变化都会从服务器再次获取
                  缓存时间依赖于客户端的时间，如果时间不准确或被改动过就会影响到缓存
              
              Cache-control
                请求头和响应头中都有这个字段
                为了让强缓存更精确，在http1.1添加了这个字段

                响应头中Cache-control的值：
                  max-age: 在多少秒内有效，是相对时间
                  s-maxage: 缓存服务器上的缓存有效时间，并只针对于public,优先级高于max-age
                  no-cache: 不使用本地缓存，使用缓存协商
                  no-store: 禁止浏览器缓存数据
                  public: 被所有用户缓存，比如代理服务器，客户端
                  private：只能被终端浏览器缓存

                请求头中的Cache-control的值：
                  max-stale: 5 客户端到代理服务器上获取缓存，即使过期了也没事，到过期时间后的5s内就可以
                  min-fresh: 5 在缓存到期前的5s前可以拿到缓存
                  only-if-cached: 客户端只接受代理服务器上的缓存，不接收源服务器上的缓存，如果代理服务器缓存无效，直接返回504

            2. 协商缓存
               协商缓存中主要使用四个字段，并且它们是两两组合一起使用，
                If-Modified-Since和Last-Modified
                Etag和If-None-Match
                如果两组同时存在，会采用Etag和If-None-Match，如果命中协商缓存，那么直接返回状态码304.浏览器会本地缓存中获取

                If-Modified-Since：资源最近修改的时间，在请求头中，值就是上一次服务器返回的Last-Modified的值
                Last-Modified： 资源最近修改的时间，在响应头中
                Etag: 资源标识，在响应头中
                If-None-Match: 资源标识，在请求头中，就是服务器上一次返回的Etag

                If-Modified-Since和Last-Modified：
                  当客户端第一次访问服务器的时候，服务器返回的响应头中会携带Last-Modified标准时间精确到秒，当客户端再次请求的时候
                  会在请求头中携带If-Modified-Since此时的值就是服务端返回的Last-Modified，服务端接收到请求之后，会对比这两个值是
                  否一样，一样就直接返回304，让客户端从缓存中获取，不一样就返回新的数据并且更新响应头中的Last-Modified

                  优点:
                    当缓存有效的时候，直接从缓存中读取，节省了流量和服务端的压力

                  缺点：
                    有效时间精确到了秒。如果在同一秒获取的时候修改了文件，那么还是获取的缓存中的数据

                Etag和If-None-Match：
                  为了解决文件修改时间只能精确到秒的问题，设计出了Etag。Etag是由文件大小和文件修改时间计算而成。只要有一种变化Etag
                  就改变了
                  当客户端第一次访问服务器的时候，服务器返回的响应头中携带Etag，客户端再次访问的时候，会在请求头中携带If-None-Match
                  这个值就是服务器返回的Etag,服务器接收到之后会对比这两个值是否相等，相等就返回304,客户端从缓存中获取，否则返回新的数据
                  并更新Etag的值
                
                  优点：
                    当缓存有效的时候，直接从缓存中读取，节省了流量和服务端的压力
                    解决了同一秒获取和修改文件，而不能获取到最新数据的问题

            3. 缓存失效问题
                有时候修改了文件，访问到的还是旧文件，强缓存中也会有这个问题。
                解决：
                  给访问文件路径上添加时间搓
                
            4. from memory cache、from disk cache、from ServiceWorker
                缓存的文件会缓存在这三个地方
                from memory cache：
                  内存中的缓存，先从内存中获取再去硬盘中获取
                from disk cache(http cache)
                  硬盘缓存，是存在于文件中的缓存，持久存储，相同的资源可以在跨会话，跨站点使用
                from ServiceWorker
                  永久性缓存，我们可以直接在浏览器中进行操作(浏览器中Application找到Service Workers)，而上面两个都是浏览器内部判断不允许用户操作

              本地缓存命中顺序，内存缓存 => Service Worker 缓存 => HTTP 缓存(磁盘缓存) => HTTP/2 Push 缓存
                  
             <img src="@performance/8.png" alt="">  

             缓存过程：
              浏览器请求资源的时候，浏览器根据请求头判断是否有强缓存，如果有强缓存并且命中强缓存，就直接从缓存中读取资源，如果没有命中就去请求服务器
              服务器根据请求头中的字段判断是否有协商缓存，如果有并且命中了协商缓存，那么直接返回304，浏览器会从缓存中获取数据，如果没有命中就直接返回
              数据

             5. URI和URL
                URI: 用字符串标识资源
                URL: 资源的地点
                URL是URI的子集 

              
          问题：并发优化，发送N个请求，但是服务只能同时处理三个请求，封装一个函数,不断的发送发送完N个请求(实现 promise.map，限制 promise 并发数)
              class Map {
                constructor (list, n) {
                    // 存储实际请求的数量
                    this.origLen = list.length
                    // 存储请求
                    this.list = [...list]
                    // 一次最多发送的条数
                    this.len = n
                    // 当前发送了几条
                    this.index = 0
                    // 存储返回结果
                    this.result = []
                }
                // 开始执行
                start () {
                    return new Promise(res => {
                        // 首次执行n次
                        for (let i = 0; i < this.len; i ++) {
                            this.doNext(res)
                        }
                    })
                }
                // 执行每个请求
                async doNext (resolve) {
                    // 如果当前下标小于最大请求个数，并且请求列表有值
                    if (this.index < this.len && this.list.length) {
                        // 下标加1
                        this.inde++
                        // 拿出一项
                        const p = this.list.shift()
                        // 执行请求 错误信息也要返回
                        const r = await p().catch(e => e)
                        // 请求返回之后下标-1
                        this.inde--
                        // 执行下一个请求
                        this.doNext(resolve)
                        // 结果存储起来
                        this.result.push(r)
                    }
                    // 全部请求完成之后返回resolve
                    if (this.origLen === this.result.length) {
                        resolve(this.result)
                    }
                }
            }
            function a () {
                return new Promise(res => {
                    console.log('执行了1')
                    setTimeout(() => { res(1) }, 3000)
                })
            }
            function b () {
                return new Promise((res,rej) => {
                    console.log('执行了2')
                    setTimeout(() => { rej(2) }, 1000)
                })
            }
            function c () {
                return new Promise(res => {
                    console.log('执行了3')
                    setTimeout(() => { res(3) }, 100)
                })
            }
            const map = new Map([a,b,c], 2)
            map.start().then(res => {
                console.log(res) // [2,3,1]
            })

          说说垃圾回收机制？如何优化？
            作用：
              防止页面占用内存过大，引起卡顿

            v8引擎的垃圾回收机制的组成：
              两大部分堆和栈
               垃圾回收主要在堆内存中
               堆的组成部分
                1. New Space(新生代)
                  由Semi space From和Semi space to组成
                  并且这两块的空间都是严格对半分
                  存储暂时的变量和对象
                  占用空间大小
                    64位操作系统中占用空间是64MB
                    32位操作系统中占用空间是32MB
                  使用的算法：
                    Scavenge(新生代互换)：
                      当Semi space From中的内存达到一定程度的时候，继续往里添加变量，
                      此时就会删除掉一些没有被引用的变量
                      把剩下引用的变量复制到Semi space To中，然后把新的变量添加进去，把Semi space To变为Semi space From,
                      Semi space From变为Semi space To
                      如果存储再次到达一定程序就再次重复以上步骤


                2. Old Space(老生代)
                  由Old pointer space和Old data Space组成
                  是连续的空间
                  Old pointer space存放引用类型的对象
                  Old data Space存放基本数据类型
                  存储持久性的变量和对象，如果新生代执行过一次垃圾回收并且Semi space to空间已经使用了25%,就会晋升到老生代
                  占用空间大小
                    64位操作系统中占用空间是1400MB
                    32位操作系统中占用空间是700MB
                  使用的算法：
                    Mark-Sweep(标记清除法)
                    Mark-Compact(标记整理法)
                    
                    Mark-Sweep(标记清除法)：
                      老生代中有个根
                      1. 会先进行广度扫描，把根引用的对象一层一层进行标记
                      2. 垃圾进行回收的时候没有引用的变量进行清空
                      缺点：
                        空间具有碎片化
                      优点:
                        解决了引用计数法的循环引用问题，虽然两个对象之间相互引用，但是没有被根对象引用标记就会被清除掉

                    Mark-Compact(标记整理法)：
                      老生代中有个根
                      1. 会先进行广度扫描，把根引用的变量进行标记
                      2. 把标记的变量进行整理，整理在一起占据连续的空间
                      3. 垃圾进行回收的时候剩下的连续空间中的变量被清除

                      注意：v8引擎之前用的是全停顿标记法，现在用的增量标记和三色标记法
                        全停顿标记： 
                              垃圾回收执行的时候会把根引用的变量全部找到并且进行标记
                          缺点：
                            相对增量标记和三色标记法比较消耗时间
                        增量标记和三色标记法：
                              相对于全停顿标记，垃圾回收会比较频繁的执行，
                              第一次执行的时候会找到根的下一层的引用，并且标记为黑色
                              当执行到第二次的时候会从黑色的开始查找，找到黑色的下一层引用标记为黑色把当前层标记灰色
                              执行第三次的时候从黑色开始找到下一层引用并且标记为黑色，把当前的黑色标记为灰色，把上一
                              层的灰色标记为白色
                              往后的执行都是重复上面的步骤
                          优点：
                            相对全停顿标记虽然执行垃圾回收机制的频率比较多，但是用户五感官，再清除的时候相对比较快
                        <img src="@performance/17.png" alt="">
                      优点：
                        剩余的空间为连续的空间，便于存下更大的数据

                      之前使用的是引用计数法：
                        对象没有被其他对象引用的时候就是零引用可以被清除
                        缺点：
                          两个对象的循环引用无法被清除

                  3. 查看浏览器内存的情况
                      window.performance

                3. Large object space(大对象空间)
                4. code space(代码空间)
                5. cell space(单元空间)
                6. Property Cell Space(属性单元空间)
                7. Map space

              调整node运行内存：
                node max-old-space-size = 内存大小 (最大运行内存一般是空闲内存的75%)

            <img src="@performance/16.png" alt="">

            优化:
              1. 深层对象引用最好深拷贝或者用完之后直接销毁
              2. 尽量避免使用全局变量
              3. 使用完之后的对象，赋值清空









                  

                








               
        

    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>