class EventEmitter {
  constructor (maxListeners) {
    this.eventsMap = {};
    this.maxListeners = maxListeners || 10;
  }

  on(type, cb) {
    const cbs = this.eventsMap[type];
    if(!cbs) {
      this.eventsMap[type] = [];
    }
    if(this.eventsMap[type].length >= this.maxListeners) {
      console.warn(`${type} events has already override`);
      return this;
    }
    this.eventsMap[type].push(cb);
  }

  emit(type, ...args) {
    if(!this.eventsMap[type]) {
      console.warn(`${type} does not exist in EventEmitters`);
      return this;
    } else {
      this.eventsMap[type].forEach(cb => cb.apply(this, args));
    }
  }

  once(type, cb) {
    const func = (...args) => {
      this.off(type, func);
      cb.apply(this, args);
    }
    this.on(type, func);
    return this;
  }

  off(type, cb) {
    if(!this.eventsMap[type]) {
      console.warn(`${type} does not exist in EventEmitters`);
    } else {
      this.eventsMap[type] = this.eventsMap[type].filter(func => func !== cb);
    }
    return this;
  }
}

const event = new EventEmitter(2);

const log = (a, b) => console.log('a', a, 'b', b);
const getname = name => console.log('name', name);
const getnames = name => console.log('name', name);
const getnamess = name => console.log('name', name);


event.on('log', log);
event.on('name', getname);
event.on('name', getnames);
event.on('name', getnamess);

event.emit('log', 'aaa', 'bbbb')
event.once('once', getname)
event.emit('once', 'wei')
event.emit('once', 'wei')
event.emit('once', 'wei')
