import { RemainTimeDate } from './countDown'

export enum EventName {
  CountdownStart = 'CountdownStart',
  CountdownStop = 'CountdownStop',
  CountdownPause = 'CountdownPause',
  Countdown = 'Countdown'
}

// 事件名和参数之间的关系
export interface EventCallbackMap {
  [EventName.CountdownStart]: [];
  [EventName.CountdownStop]: [];
  [EventName.CountdownPause]: [];
  [EventName.Countdown]: [RemainTimeDate];
}

export class EventEmitter<T extends EventName = any> {
  eventStore: Map<any, any>;

  constructor () {
    this.eventStore = new Map();
  };

  emit(type: T, ...args: EventCallbackMap[T]) {
    const handler = this.eventStore.get(type);

    if(!handler) {
      return false;
    }

    if(Array.isArray(handler)) {
      // 同一个事件存在多个回调函数
      for(let func of handler) {
        if(args.length > 0) {
          func.apply(this, args)
        } else {
          func.call(this)
        }
      }
    } else {
      // 只有一个监听函数
      if(args.length > 0) {
        handler.apply(this, args)
      } else {
        handler.call(this)
      }
    }
  }

  on(type: T, fn: (...args: EventCallbackMap[T]) => void) {
    if(!(fn instanceof Function)) {
      throw new Error('fn must be a function')
    }
    const handler = this.eventStore.get(type);
    if(!handler) {
      // 当前没有事件监听
      this.eventStore.set(type, fn)
    } else if(handler && typeof handler === 'function') {
      // 当前只有一个事件监听
      this.eventStore.set(type, [handler, fn])
    } else {
      // 当前有多个事件监听
      handler.push(fn);
    }
  }

  remove(type: T, fn: (...args: EventCallbackMap[T]) => void) {
    let handler = this.eventStore.get(type);
   if(handler && typeof handler === 'function') {
     this.eventStore.delete(type)
   } else {
     handler.splice(handler.indexOf(handler) >>> 0, 1)
   }
  }
}

