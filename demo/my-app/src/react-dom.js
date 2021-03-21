export const createComponent = (ClassComponentConstructor, props, vnode) => {
  return new ClassComponentConstructor(props);
}

export const setComponentProps = (componentInstance, props) => {
  // 判断生命周期
  if(componentInstance.base) {
    // 已经执行了首次渲染
    if(componentInstance.componentWillReceiveProps) {
      componentInstance.componentWillReceiveProps(props, componentInstance.state);
    }
  } else {
    if(componentInstance.componentWillMount) componentInstance.componentWillMount();
  }


  renderComponent(componentInstance);
}

export function renderComponent(componentInstance) {
  if(componentInstance.base && componentInstance.componentWillUpdate) {
    componentInstance.componentWillUpdate();
  }

  const renderer = componentInstance.render();
  const componentDomNode = render(renderer);

  if(componentInstance.base) {
    // 更新阶段
    if(componentInstance.componentDidUpdate) {
      componentInstance.componentDidUpdate();
    }
  } else {
    // 初始化第一次挂载
    if(componentInstance.componentDidMount) {
      componentInstance.componentDidMount();
    }
  }

  componentInstance.base = componentDomNode; // 第一次渲染之后的标记
  componentDomNode.componentInstance = componentInstance; // 标记父组件实例
}
/**
 * render
 * @param {*} vnode
 * @param {*} container
 * @returns
 */
export const render = (vnode, container) => {
  // console.log('vnode>>>>>', vnode)

  if(typeof vnode === 'string' || typeof vnode === 'number') {
    const textNode = document.createTextNode(vnode);
    if(container) return container.appendChild(textNode);
    return textNode;
  }

  // Componet
  if(typeof vnode.type === 'function') {
    const component = createComponent(vnode.type, vnode.props, vnode);
    setComponentProps(component, vnode.props);
    if(container) {
      container.appendChild(component.base);
    }
    return component.base;
  }

  const dom = document.createElement(vnode.type);

  if(vnode.props) {
    Object.keys(vnode.props).forEach(key => {
      if(key === 'children') return;
      const value = vnode.props[key];
      setDOMArrtribute(dom, key, value);
    })
  }

  if(vnode.props.children) {
    if(Array.isArray(vnode.props.children)) {
      // array children
      vnode.props.children.forEach(child => render(child, dom))
    } else {
      // 单个children
      render(vnode.props.children, dom);
    }
  }


  if(container) return container.appendChild(dom)

  return dom;
}

function setDOMArrtribute (dom, key, value) {
  if(key === 'className') key ='class';

  if(/^on/.test(key)) {
    dom[key.toLowerCase()] = value;
    // console.log('event')
  } else if(key === 'style') {
    // 样式配置，处理驼峰样式的属性，处理单位
  } else {
    // console.log('key', key, ':', value)
  }
}


export default {
  render
}