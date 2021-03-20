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
  }
}

export default {
  createElement,
  Component
}