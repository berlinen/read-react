import React from 'react';
import { IndeterminateComponent } from './react-worktag'
import { render } from './react-fiber-wookloop';
import { useReducer } from './react-fiber-hooks';

//redux 接收老状态和动作，返回新状态
const reducer = (state, action) => {
  if(action.type === 'add') {
    return state + 1;
  } else {
    return state;
  }
}

// 函数组件
function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);
  return (
    <div onClick={() => {
      dispatch({type: 'add'});
      dispatch({type: 'add'});
      dispatch({type: 'add'});
    }}>
      { number }
    </div>
  )
}

debugger;

let counterFiber = {
  tag:IndeterminateComponent, //Fiber的类型 函数组件在初次渲染的时候对应的类型 是IndeterminateComponent
  type:Counter,//此组件的具体 类型是哪个组件
  alternate:null //上一个渲染的fiber
}

render(counterFiber);


