import { beginWork } from './react-filber-beginwork';

let workInProgress = null;

// 每一个fiber都是一个工作单元
function performUnitOfWork(unitoOfWork) {
  let current = unitoOfWork.alternate;
  return beginWork(current, unitoOfWork);
}

function workLoop() {
  //每个fiber是一个工作单元，每完成一个fiber,会看看有没有剩余时间，如果有接着干下一个，如果没有就
  //退出循环
  while (workInProgress !== null) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}

//正常来说我们需要根节点一下向下构建，Counter

export function render(fiber) {
  workInProgress = fiber;
  workLoop();
}

