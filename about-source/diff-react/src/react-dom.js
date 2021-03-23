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
  const componentDomNode = diffVnodes(componentInstance.base, renderer);

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

  if(componentInstance.base && componentInstance.base.parentNode) {
    // 每次更新之后，把内容渲染到父节点的dom中替换
    componentInstance.base.parentNode.replaceChild(componentDomNode,componentInstance.base);
  }

  componentInstance.base = componentDomNode; // 第一次渲染之后的标记
  componentDomNode.componentInstance = componentInstance; // 标记父组件实例
}

export function render(vnode, container) {
  return diff(null, vnode, container)
}
// diff
function diff(prevnode, vnode, container) {
  const result = diffVnodes(prevnode, vnode);

  if(container) {
    container.appendChild(result);
  }

  return result;
}

function diffVnodes(dom, vnode) {
  let parentNode = dom;
  if(!vnode || typeof vnode === 'boolean') vnode = '';

  if(typeof vnode === 'string' || typeof vnode === 'number') {
    if(dom && dom.nodeType === 3) {
      // 文本节点
      if(dom.textContent !== vnode) {
        dom.textContent = vnode;
      }
    } else {
      // 不是一个文本节点
      parentNode = document.createTextNode(vnode);
      if(dom && dom.parentNode) dom.parentNode.replaceChild(parentNode, dom);
    }
    return parentNode;
  }

  if(typeof vnode.type === 'function') {
    // 组件
    return diffComponent(dom, vnode);
  }
  // 没有原来dom 或者dom类型不同
  if(!dom || !isSameNode(dom, vnode))  {
    parentNode = document.createElement(vnode.type)
    if(dom) {
      Array.from(dom.childNodes).forEach(childNode => {
        parentNode.appendChild(childNode);
      })
      if(dom.parentNode) {
        dom.parentNode.replaceChild(parentNode, dom);
      }
    }
  }

  if((vnode.props.children && vnode.props.children.length > 0) || (parentNode.props.childNodes && parentNode.props.childNodes.length > 0)) {
    diffChildren(parentNode, vnode.props.children);
  }

  diffAttributes(parentNode, vnode);

  return parentNode;
}

function diffAttributes(dom, vnode) {
  const old = {};
  const attrs = vnode.props;

  for(let i = 0; i < dom.attributes.length; i++) {
    const attr = dom.attributes[i];
    old[attr.name] = attr.value;
  }
  // 原来有 更新后没有， 设置为undefined
  for(let name in old) {
    if(!(name in attrs)) {
      setDOMArrtribute(dom, name, undefined);
    }
  }
  // 需要更新的部分，设置为新的值
  for(let name in attrs) {
    if(name === 'children') continue;
    if(old[name] !== attrs[name]) {
      setDOMArrtribute(dom, name, attrs[name])
    }
  }
}

function diffComponent(dom, vnode) {
  let componentInstance = dom && componentInstance;
  let oldDom = dom;

  if(componentInstance && componentInstance.constructor === vnode.type) {
    // 新的组件vnode 它的构造函数没有变化
    // 只需要更新 props
    setComponentProps(componentInstance, vnode.props);
    dom = componentInstance.base;
  } else {
    if (componentInstance) {
      // 需要卸载原来的componentInstance
    }
    componentInstance = createComponent(vnode.type, vnode.props);
    setComponentProps(componentInstance, vnode.props);
    dom = componentInstance.base;
    if(oldDom && dom !== oldDom) {
      oldDom.componentInstance = null;
      removeNode(oldDom);
    }
  }
  return dom;
}

function diffChildren(dom, vChildren) {
  const domChildren = dom.childNodes;
  const children = [];
  const keyMap = {};

  if(domChildren.length > 0) {
    for(let i = 0; i < domChildren.length; i++) {
      const child = domChildren[i];
      const key = child.key;
      // 取props
      if(key) {
        keyMap[key] = child;
      } else {
        // 取children
        children.push(child)
      }
    }
  }

  if(vChildren && vChildren.length > 0) {
    let childrenLength = children.length;
    let min = 0;


    const vChildrenLength = vChildren.length;
    for(let i = 0; i < vChildrenLength; i++) {
      const vChild = vChildren[i];
      const key = vChild.key;
      let child;

      if(key) {
        // 如果组件写了key， 这个props
        if(keyMap[key]) {
          // 在组件的keyMap 中进行查找， 找到了这个组件对应的之前的渲染
          child = keyMap[key];
          keyMap[key] = undefined;
        }
      } else if(min < childrenLength) {
        for(let j = min; j < childrenLength; j++) {
          let currentChild = children[j];

          if(currentChild && isSameNode(currentChild, vChild)) {
            child = currentChild;
            children[j] = undefined;

            if(j === childrenLength - 1) childrenLength--;
            if(j === min) min++;
            break;
          }
        }
      }

      child = diffVnodes(child, vChild);
      const prevDomChild = domChildren[i];
      if (child && child !== dom && child !== prevDomChild) {
        if(!prevDomChild) {
          // 原来没有这个节点，但是更新之后有了
          dom.appendChild(child);
        } else if(child === prevDomChild.nextSibling) {
          removeNode(prevDomChild);
        } else {
          dom.insertBefore(child, prevDomChild);
        }
      }
    }
  }
}

function removeNode(dom) {
  if(dom && dom.parentNode) {
    dom.parentNode.removeChild(dom);
  }
}

function isSameNode (dom, vnode) {
  if(typeof vnode === 'string' || typeof vnode === 'number') return dom.nodeType === 3;
  if(typeof vnode.type === 'string') {
    // 浏览器tag div
    return dom.nodeName.toLowerCase() === vnode.type.toLowerCase();
  }
  return dom && dom.componentInstance && dom.componentInstance.constructor === vnode.type;
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