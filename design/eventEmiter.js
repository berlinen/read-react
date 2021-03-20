// 发布-订阅模型 API 设计思路

// 通过前面的讲解，不难看出发布-订阅模式中有两个关键的动作：事件的监听（订阅）和事件的触发（发布），这两个动作自然而然地对应着两个基本的 API 方法。

// on()：负责注册事件的监听器，指定事件触发时的回调函数。

// emit()：负责触发事件，可以通过传参使其在触发的时候携带数据 。

// off()：负责监听器的删除。

class EventEmitter {
  constructor () {
    // eventmap 用来存储事件和监听函数之间的关系
    this.eventMap = {};
  }
  // 所谓“订阅”，也就是注册事件监听函数的过程。这是一个“写”操作，具体来说就是把事件和对应的监听函数写入到 eventMap 里面去：

  // type 代表事件的名称
  on (type, handler) {
    // handler必须是一个函数，不是之际报错
    if(!(handler instanceof Function)) {
      throw new Error('handler must be a function type')
    }
    // 判断type事件对应的队列是否存在
    if(!this.eventMap[type]) {
      // 若不存在，新建该队列
      this.eventMap[type] = [];
    }
    //若存在，直接往队列里推入handler
    this.eventMap[type].push(handler);
  }

  // 订阅操作是一个“写”操作，相应的，发布操作就是一个“读”操作。发布的本质是触发安装在某个事件上的监听函数，我们需要做的就是找到这个事件对应的监听函数队列，将队列中的 handler 依次执行出队：

  // 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体
  event (type, params) {
    // 假设该事件是有订阅的（对应的事件队列存在）
    if(this.eventMap[type]) {
      // 将事件队列里的 handler 依次执行出队
      this.eventMap[type].forEach(handler => handler(params));
    }
  }
  // 移除相关订阅事件
  off(type, handler) {
    if(this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)
    }
  }
}