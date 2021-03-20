export const render = (vnode, container) => {
  console.log(vnode)
  if(typeof vnode === 'string' || typeof vnode === 'number') {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
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

  return container.appendChild(dom)
}

function setDOMArrtribute (dom, key, value) {
  if(key === 'className') key ='class';

  if(/^on/.test(key)) {
    // event
    console.log('event')
  } else if(key === 'style') {
    // 样式配置，处理驼峰样式的属性，处理单位
  } else {
    console.log('key', key, ':', value)
  }
}


export default {
  render
}