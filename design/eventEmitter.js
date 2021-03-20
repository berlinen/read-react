class EventEmitters {
  constructor (maxListeners) {
    this.events = {};
    this.maxListeners = maxListeners || 10;
  }

  on(type, cb) {
    if(!this.events[type]) {
      this.events[type] = []
    }
    if(this.events[type].length >= this.maxListeners) {
      console.warn(`${event} length max is ${this.maxListeners}`)
      return this;
    }
    this.events[type].push(cb);
    return this
  }

  emit(type, ...args) {
    const cbs = this.events[type];

    if(!cbs) {
      console.warn(`has no this type func`)
    } else {
      cbs.forEach(func => func.apply(this, args))
    }
  }

  off (type, cb) {
    if(!cb) {
      console.warn(`${cb} is required`)
    } else {
      this.events[type] = this.events[type].filter(func => func !== cb);
    }
    return this
  }

  once(type, cb) {
    const func = (...args) => {
      this.off(type, cb);
      cb.apply(this, args);
    }
    this.on(type, func);
    return this;
  }
}