## hybrid iframe

### 原理

web -> request -> native -> proxy

### 私有协议

private://

web用到native能力 接入私有协议 多个app 拥有公共私有协议

### 请求方式

* frame

```js
const doc = window.document;
const body = doc.body

const iframe = doc.createElement('iframe')

iframe.style.display = 'none'

iframe.src = "private://settirle?params=1" // 此时还没有开始请求

body.appendChild(iframe) // 开始请求

setTimeout(() => {
  body.removeChild(iframe)
}, 200)
```

客户端还会有一些白名单

比如h5的url是baidu.com

### 客户端拦截协议请求

根据私有协议拦截 解析参数 和相关native操作 然后告诉web 回调

### 处理回调

webview 异步请求

window.addEventListener 和 window.dispatchEvent

业务中

```js
// 业务中
window.setTitle({title: 'title'}, (err, res) => {
  if(err) {
    return err
  }
  // 执行成功， 执行业务逻辑
})
```

JSBride中

```js
let handlerId = 1;

const eventName = `setTitle_${handlerID}`; // 每一个eventName唯一

handlerId++

const event = new Event(eventName);

window.addEventListener(eventName, res => {
  if(res.date.err) return err;
  // 执行成功
})

JsBride.send('private://')

event.date = {errcode: 0};

window.dispatchEvent(event)
```

## 注入api

1. h5 向 native 传递信息

前提：native已经向window注入了各种api web就可以直接调用

比如window.cusWebview = { setTitle: xxx };

```js
window.cusWebview.setTitle(params);
```

2. 准备接收native回调

```js
window['setTitle_callback_1'] = (errcode, res) => {
  console.log(errcode)
}
```

3. native调用回调函数

native执行完成后 如何告诉h5

```js
window.cusWebview.setTitle(params);
```

```js
const callbackName = 'setTitle_callback_1'

window.callbackName.setTitle({
  trigger:callbackName,
  ...params
})

```

```js
window[callbackName] = (errcode, res) => {
  console.llog(errcode)
}
```

保证唯一性 eventname
