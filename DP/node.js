
const list = {
  head: {
      value: 6,
      next: {
          value: 10,
          next: {
              value: 12,
              next: {
                  value: 3,
                  next: null
                  }
              }
          }
      }
  }

  class ListNode {
    constructor (ele) {
      this.ele = ele;
      this.next = null
    }
  }

  class LinkedList {
    constructor(head = null) {
      this.head = new ListNode(head);
    }

    find (item) {
      let curNode = this.head;
      while( curNode.ele !== item) {
        curNode = curNode.next;
      }
      return curNode;
    }

    insert(ele, item) {
      let newNode = new ListNode(ele);
      let curNode = this.find(item);
      newNode.next = null;
      curNode.next = newNode;
    }

    // 显示链表
    display() {
      let curNode = this.head;
      while (curNode.next !== null) {
        console.log( curNode.next.ele );
        curNode = curNode.next;
      }

    }

    //查找带删除节点的前一个节点
    findPrev (item) {
      let curNode = this.head;
      while(curNode.next !== null && curNode.next.ele !== item) {
        curNode = curNode.next;
      }
      return curNode
    }

    remove(item) {
      let prevNode = this.find(item);
      if(prevNode.next !== null) {
        prevNode.next = prevNode.next.next
      }
    }
  }

  // 查找上一个节点
  // findPrev(item) {

  // }

  const tets = new LinkedList('head');
  tets.insert('b', 'head')
  console.log(tets.display())

  // console.log('tets', tets)
  // console.log('tets', tets.find('b'))