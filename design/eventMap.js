class EventEmitter {
  constructor () {
    this.eventMap = new Map();
  }

  on(type, handler) {
    if(!(handler instanceof Function)) {
      throw new Error('handler must be a function type');
    }
    if(!this.eventMap.has(type)) {
      this.eventMap.set(type, []);
    }
    this.eventMap.set(type, [...this.eventMap.get(type), handler]);
    console.log(this.eventMap);
  }

  emit(type, params) {
    if(this.eventMap.has(type)) {
      for (let handler of this.eventMap.get(type)) {
        handler(params);
      }
    }
  }

  off (type, handler) {
    if(this.eventMap.has(type)) {
      this.eventMap.get(type).splice(this.eventMap.get(type).indexOf(handler) >>> 0, 1)
    }
  }
}

// 实例化组件
const myEvent = new EventEmitter();

// 写一个简单的handler

const testHandler = function (params) {
  console.log(`test事件被触发了，testHandler 接收到的入参是${params}`);
}

const testHandler2 = function (params) {
  console.log(`2test事件被触发了，testHandler 接收到的入参是${params}`);
}

// 监听test事件
myEvent.on("test", testHandler);
myEvent.on("test", testHandler2);
//  在触发 test 事件的同时，传入希望 testHandler 感知的参数
myEvent.emit("test", 'newState');