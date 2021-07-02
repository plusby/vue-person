<template>
  <div class="http-wrap">
    <pre>
      <h1>ajax实现原理</h1>
      基本步骤：
        1. 创建XmlHttpRequest实例
        2. 设置请求方式和请求地址
        3. 设置请求头
        4. 发送请求
        5. 监听接收请求

      // 1. 创建XmlHttpRequest实例
      const xml = new XmlHttpRequest()
      // 2. 设置请求方式和请求地址
      xml.open('get', 'www.baidu.com')
      // 3. 设置请求头
      xml.setRequestHeader('content-type','application/x-www-from-urlencoded')
      // 4. 发送请求
      xml.send()
      // 5. 接收请求 readyState发生变化的时候执行
      xml.onreadystatechange = function(){
        // 请求成功
        if(xml.readyState === 4 && xml.status === 200){
          // 返回响应数据
          return xml.responseText
        }
      }

      说明：
        onreadystatechange：
          当 readyState 属性发生变化时执行

        readyState： 代表请求的状态码

        status： 代表请求的响应状态

        response：
          返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应实体

        statusText：代表请求的响应状态,返回完整的状态 eg: '200 OK'

        timeout: 设置该请求的最大请求时间

        XMLHttpRequestEventTarget.ontimeout
          当请求超时调用的

        upload: 上传进度

        withCredentials：
          一个布尔值 (en-US)，用来指定跨域 Access-Control 请求是否应当带有授权信息，如 cookie 或授权 header 头。

        主要考察的是服务器响应的readyState 5个状态

            0: 请求未初始化（代理被创建，但尚未调用 open() 方法）
            1: 服务器连接已建立（open方法已经被调用）
            2: 请求已接收（send方法已经被调用，并且头部和状态已经可获得）
            3: 请求处理中（下载中， responseText 属性已经包含部分数据）
            4: 请求已完成，且响应已就绪（下载操作已完成）

    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>