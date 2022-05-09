<template>
    <div class="img_compress">
        <h1>压缩图片总结</h1>
        <pre>
            原理：
                获取到file或Blob对象转为base64,通过canvas的API进行压缩
        </pre>
        <pre>
            1. file或Blob对象转为base64
            利用FileReader读取文件的构造函数，此构造函数可以异步读取本地文件，通过该构造函数的实例上的
            readAsDataURL方法可以将读取的内容转换为base64
        </pre>
        <pre class="code">
            function fileToBase64(file,callBack){
                return new Promise((res,rej)=>{
                    const readFile = new FileReader()
                    readFile.onload  = function(val){
                        res(val)
                    }
                    readFile.readAsDataURL(file)
                })
            }
        </pre>
        <pre>
            2. file或者Bolb对象转为url
            利用window.webkitURL或window.URL的createObjectURL方法获取到指定对象的url
        </pre>
        <pre class="code">
            function fileToUrl(file,callBack){
                return new Promise((res,rej)=>{
                    const URL = window.webkitURL || window.URL
                    if(URL){
                        const url = URL.createObjectURL(file)
                        const img = new Image()
                        img.onload = function (){
                            res(img)
                            window.revokeObjectURL(url); // 手动释放掉它占用的内存
                        }
                        img.src = url
                    }
                })
                
            }
        </pre>
        <pre>
            3. 使用canvas的toDataURL进行图片压缩
               toDataURL(type, encoderOptions)方法返回一个包含图片展示的data协议的url
               type: 图片的格式，默认为image/png
               encoderOptions: 在指定格式为image/jpeg或image/webp的情况下，可以从0到1
               的区域内设置图片的质量，值越接近1质量越高，超出默认为0.92
        </pre>
        <pre class="code">
            function canvasToImg(img,type,w,h,imgType,quality){
                return new Promise((res)=>{
                    const canvas = document.createElement('canvas')
                    var ctx = canvas.getContext('2d')
                    canvas.width =  w ||img.naturalWidth || 100
                    canvas.height =  h ||img.naturalHeight || 150
                    ctx.drawImage(img,0,0,canvas.width,canvas.height)
                    if (type === 'Blob') { // 转为Blob 否则就是DataURL
                        canvas.toBlob(function(blob) {
                            res(blob)
                        }, imgType || 'image/jpeg', quality || 0.8);
                    }else {
                        const compressImg = canvas.toDataURL(imgType||'image/jpeg',quality||0.8)
                        res(compressImg)
                    }
                })
            }
        </pre>
        <pre>
            4. toDataURL转为Blob
               方法：
                - 获取到toDataURL后面的base64数据
                - 使用window.atob将数据进行解码
                - 遍历解码之后的字符串利用charCodeAt获取到每一个字符的unicode编码
                - 将获取到的编码存储到Uint8Array数组中
                - 使用Blob将Uint8Array数组转为Blob
        </pre>
        <pre class="code">
            function dataURLToBlob(dataURL,type){
                const data = dataURL.split(',')[1] // 获取到base64数据
                const mimePattern = /^data:(.*?)(;base64)?,/;  // 通过正则获取到文件的格式
                const mime = dataURL.match(mimePattern)[1]
                const str = atob(data) // 解码
                const len = str.length
                const arr = new Uint8Array(len)  // 初始化Uint8Array数组

               for(let i = 0; i 《 len; i++){
                   arr[i] = str.charCodeAt(i) // 获取到每个字符的unicode编码
               }
               return new Blob([arr],{type:type||mime}) 
            }
        </pre>
        <pre>
            eg:
        </pre>
        <input type="file" ref='file' @change="selectFile">
        <p>原图片大小： {{ compressedImg.originSize}}</p>
        <p>压缩之后图片大小： {{ compressedImg.compressedSize}}</p>
        <p>压缩比率： {{ compressedImg.ratio}}</p>

        <pre class="code">
            data(){
                return{
                    REGEXPIMAGETYPE: /^image\//, // 匹配是否是图片格式
                    defaultOptions: { // 默认的设置项
                        file: null,
                        quality: 0.6
                    },
                    compressedImg: {} // 压缩之后的数据
                }
            },
            methods: {
                // 上传图片
                selectFile(){
                    console.log(this.$refs.file.files)
                    this.imgCompress({
                        file: this.$refs.file.files[0]
                    }).then(res=>{
                        this.compressedImg = res
                    })
                },
                isFunc(fn){ // 判断是否是函数
                    return typeof fn === 'function'
                },
                isImageType(val){ // 判断是否是图片
                    return this.REGEXPIMAGETYPE.test(val)
                },
                // 图片压缩
                async imgCompress(options){
                    options = {
                        ...this.defaultOptions,
                        ...options
                    }
                    if(!options.file || !this.isImageType(options.file.type)){
                        return
                    }
                    if(!this.isImageType(options.mimeType)){
                        options.mimeType = options.file.type
                    }
                    // 把文件数据转为图片数据
                    const imgData = await this.fileToUrl(options.file)
                    console.log('文件转为图片数据',imgData,imgData.naturalWidth)
                    // 压缩图片
                    const compressedImg = await this.canvasToImg(imgData,'Blob',options.width,options.height,options.file.type,options.quality)
                    // 上传到服务器
                    console.log('compressedImg',compressedImg,compressedImg.size)
                    console.log('压缩之前大小',options.file.size,'压缩之后大小',compressedImg.size,'压缩率', compressedImg.size/options.file.size)
                    return new Promise((res)=>{
                        res({
                            compressedImg,
                            originSize: options.file.size,
                            compressedSize: compressedImg.size,
                            ratio: ((options.file.size - compressedImg.size)/options.file.size).toFixed(2) * 100 + '%'
                        })
                    })
                    
                },
                // 文件转成url获取到图片信息
                fileToUrl(file){
                    return new Promise((res,rej)=>{
                        const URL = window.webkitURL || window.URL
                        if(URL){
                            const url = URL.createObjectURL(file)
                            const img = new Image()
                            img.onload = function (){
                                res(img)
                                window.revokeObjectURL && window.revokeObjectURL(url); // 手动释放掉它占用的内存
                            }
                            img.src = url
                        }
                    })
                },
                // 压缩图片
                canvasToImg(img,type,w,h,imgType,quality, file){
                    return new Promise((res)=>{
                        const canvas = document.createElement('canvas')
                        var ctx = canvas.getContext('2d')
                        canvas.width =  w ||img.naturalWidth || 100
                        canvas.height =  h ||img.naturalHeight || 150
                        ctx.drawImage(img,0,0,canvas.width,canvas.height)
                        if (type === 'Blob') { // 转为Blob 否则就是DataURL
                            canvas.toBlob(function(blob) {
                                res(blob)
                            }, imgType || 'image/jpeg', quality || 0.8);
                        }else {
                            const compressImg = canvas.toDataURL(imgType||'image/jpeg',quality||0.8)
                            const a = dataURItoFile(compressImg, file.name)
                            res(a)
                        }
                    })
                }

                // 
                function dataURItoFile (dataurl, name) {
                    var arr = dataurl.split(',')
                    var mime = arr[0].match(/:(.*?);/)[1]
                    var bstr = atob(arr[1])
                    var n = bstr.length
                    var u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    return new File([u8arr], name, { type: mime })
                }
            }
        </pre>
    </div>
</template>
<script>
export default {
    data(){
        return{
            REGEXPIMAGETYPE: /^image\//, // 匹配是否是图片格式
            defaultOptions: { // 默认的设置项
                file: null,
                quality: 0.6
            },
            compressedImg: {} // 压缩之后的数据
        }
    },
    methods: {
        // 上传图片
        selectFile(){
            console.log(this.$refs.file.files)
            this.imgCompress({
                file: this.$refs.file.files[0]
            }).then(res=>{
                this.compressedImg = res
            })
        },
        isFunc(fn){ // 判断是否是函数
            return typeof fn === 'function'
        },
        isImageType(val){ // 判断是否是图片
            return this.REGEXPIMAGETYPE.test(val)
        },
        // 图片压缩
        async imgCompress(options){
            options = {
                ...this.defaultOptions,
                ...options
            }
            if(!options.file || !this.isImageType(options.file.type)){
                return
            }
            if(!this.isImageType(options.mimeType)){
                options.mimeType = options.file.type
            }
            // 把文件数据转为图片数据
            const imgData = await this.fileToUrl(options.file)
            console.log('文件转为图片数据',imgData,imgData.naturalWidth)
            // 压缩图片
            const compressedImg = await this.canvasToImg(imgData,'Blob',options.width,options.height,options.type,options.quality)
            // 上传到服务器
            console.log('compressedImg',compressedImg,compressedImg.size)
            console.log('压缩之前大小',options.file.size,'压缩之后大小',compressedImg.size,'压缩率', compressedImg.size/options.file.size)
            return new Promise((res)=>{
                res({
                    compressedImg,
                    originSize: options.file.size,
                    compressedSize: compressedImg.size,
                    ratio: ((options.file.size - compressedImg.size)/options.file.size).toFixed(2) * 100 + '%'
                })
            })
            
        },
        // 文件转成url获取到图片信息
        fileToUrl(file){
            return new Promise((res,rej)=>{
                const URL = window.webkitURL || window.URL
                if(URL){
                    const url = URL.createObjectURL(file)
                    const img = new Image()
                    img.onload = function (){
                        res(img)
                        window.revokeObjectURL && window.revokeObjectURL(url); // 手动释放掉它占用的内存
                    }
                    img.src = url
                }
            })
        },
        // 压缩图片
        canvasToImg(img,type,w,h,imgType,quality){
            return new Promise((res)=>{
                const canvas = document.createElement('canvas')
                var ctx = canvas.getContext('2d')
                canvas.width =  w ||img.naturalWidth || 100
                canvas.height =  h ||img.naturalHeight || 150
                ctx.drawImage(img,0,0,canvas.width,canvas.height)
                if (type === 'Blob') { // 转为Blob 否则就是DataURL
                    canvas.toBlob(function(blob) {
                        res(blob)
                    }, imgType || 'image/jpeg', quality || 0.8);
                }else {
                    const compressImg = canvas.toDataURL(imgType||'image/jpeg',quality||0.8)
                    res(compressImg)
                }
            })
            
            
        }
    }
}
</script>
<style lang="less" scoped>
    .img_compress{

    }
</style>