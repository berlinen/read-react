class EventEmitter {
  constructor () {
    this.eventMap = {};
  }
  /**
   *
   * @param {*} type 订阅名称
   * @param {*} handler  =订阅处理函数
   */
  on (type, handler) {
    if(!(handler instanceof Function)) {
      throw new Error('handler must be a functon type');
    }
    if(!this.eventMap[type]) {
      this.eventMap[type] = [];
    }
    this.eventMap[type].push(handler)
  }
  /**
   *
   * @param {*} type 触发 名称
   * @param {*} params 执行函数参数
   */
  emit(type, params) {
    if(this.eventMap[type]) {
      this.eventMap[type].forEach(handler => handler(params));
    }
  }
  /**
   *
   * @param {*} type 移除订阅名称
   * @param {*} handler
   */
  off(type, handler) {
    if(this.eventMap[type]) {
      this.eventMap[type].spice(this.eventMap[type].indexOf(handler) >>> 0, 1);
    }
  }
}

// 下面我们对 myEventEmitter 进行一个简单的测试，创建一个 myEvent 对象作为 myEventEmitter 的实例，然后针对名为 “test” 的事件进行监听和触发：

// 实例化组件
const myEvent = new EventEmitter();

// 写一个简单的handler

const testHandler = function (params) {
  console.log(`test事件被触发了，testHandler 接收到的入参是${params}`);
}

// 监听test事件
myEvent.on("test", testHandler);
//  在触发 test 事件的同时，传入希望 testHandler 感知的参数
myEvent.emit("test", 'newState');

