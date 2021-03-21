import { renderComponent } from './react-dom';


export const createElement = (tag, props, ...children) => {
  return {
    tag,
    props,
    children
  }
}

class Component {
  constructor() {
    this.props = {}
    this.state = {}
    this.render = this.render.bind(this)
    this.setState = this.setState.bind(this)
  }

  setState(newState) {
    if(typeof newState === 'function') {
      const newStateObj = newState(this.state);
      Object.assign(this.state, newStateObj);
    } else {
      Object.assign(this.state, newState);
    }
    console.log(this.state)
    // 调用renderComponent进行渲染
    renderComponent(this);
  }

  render() {

  }
}

export default {
  createElement,
  Component
}