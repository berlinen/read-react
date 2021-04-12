let ReactCurrentDispatcher = { current: null };
let workInProgressHook = null;
let currentlyRenderingFiber; // 当前正在使用的fiber
const HookDispatcherOnMount = {
  useReducer: mountReducer
}

export function useReducer(reducer, initialState) {
  return ReactCurrentDispatcher.current.useReducer(reducer, initialState);
}

// 不同阶段useReducer有不同的实现
export function renderWithHooks(current, workInProgress, Component) {
  currentlyRenderingFiber = workInProgress;
  ReactCurrentDispatcher.current = HookDispatcherOnMount;
  let children = Component();
  currentlyRenderingFiber = null;
  workInProgressHook = null;
  return children;
}

function mountWorkInProgressHook() {
  // 创建一个hook对象
  let hook = {
    memoizedState: null, // 自己的状态
    queue: null, // 自己的更新队列， 环形链表
    next: null
  }

  // 说明这是我们的第一个hook
  if(workInProgressHook === null) {
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

function dispatchAction(currentlyRenderingFiber, queue, action) {
  const update = { action, next: null }; // 创建一个update对象
  const pending = queue.pedding;
  if(pedding === null) {
    update.next = update; // 让自己和自己构建城一个循环链表，环状链表
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pedding = update;
  console.log('queue.pending',queue.pending);
}

function mountReducer(reducer, initialState) {
  // 构建hooks单向链表
  let hook = mountWorkInProgressHook();
  hook.memoizedState = initialState;
  const queue = (hook.queue = { pedding: null }); // 更新队列
  // 每次绑定都会返回一个新的函数 fiber 和 queue 每个hook的队列都不一样
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
  return [hook.memoizedState, dispatch];
}

