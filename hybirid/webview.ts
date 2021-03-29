
const BufferClass = require('buffer').Buffer;

interface WebviewParams {
  callback?: Function;
  [key: string]: any
}

const UID_PREFIX = Date.now().toString();

let uid = 1;

const isNotApp = !/Private/.test(window.navigator.userAgent);

class Webview {
  // 执行
  public exec (name: string, params: WebviewParams) {
    this.addApi(name)[name](params);
  }

  // 用于处理一些后期的更新或者变动
  // 比如内置了好多api，后期用于增加其他api
  // webview.addApi('setTitle')
  public addApi(name: string) {
    if(!this[name]) {
      this[name] = (params) => {
        if(isNotApp) {
          return this;
        }
        return this.run(name, params)
      }

      // this.setTitle = params => {
      //   if(!isNotApp) {
      //     return this
      //   }

      //   return this.run('setTitle', params)
      // }
    }

    return this;
  }

  private getUid(name: string):string {
    return name + UID_PREFIX + (++uid);
  }

  private run(apiName: string, params: WebviewParams = {}) {
    const callback = params.callback;

    if(typeof callback === 'function') {
      const callbackName = this.getUid(callback.name);

      // 在window上注册的回调函数，需要接收base64string参数的函数
      window[callbackName] = this.convertReceiveBase64(callback);

      params.trigger = callbackName;
    }
    // privateWebview webview 组件名称
    let messageHandler: Map<any, any> = window['privateWebview'];

    if(!messageHandler[apiName]) {
      console.error(`without ${apiName}, warning!!!`);
      return;
    }

    const encodeParams = (new BufferClass(JSON.stringify(params))).toString('base64');

    messageHandler[apiName](encodeParams);

    //链式调用
    return this;
  }

  private base64ToString(base64String: string):string {
    const newStr = base64String.replace(/[- ]/g, function(m0) {
      return m0 === '-' ? '+' : '/'
    }).replace(/[^A-Za-z0-9]+/g, '');

    return new BufferClass(newStr, 'base64').toString();
  }
  // 将传进来的callback参数转换为base64执行
  private convertReceiveBase64(callback: Function) {
    return base64String => {
      let data = {};
      if(base64String) {
        try {
          data = JSON.parse(this.base64ToString(base64String));
        } catch (e) {
          const msg = e.message || 'webview parse error';
          data = msg;
        }
      }
      // apply的第一个参数是null， 代表将是执行环境的全局变量来执行callback
      callback.apply(null, data);
    }
  }
}

const webView = new Webview();
webView.exec('setTitle', {
  title: 'setTitle',
  callback: errcode => {

  }
})

// convertReceiveBase64

// (errcode) => console.log(errcode);

// base64 => {}