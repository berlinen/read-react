import React from 'react';
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';

const history = createBrowserHistory();

function matchPath(path) {
  return path === window.location.pathname;
}

export class Route extends React.Component {
  componentWillMount() {
    const unlisten = history.listen((location, action) => {
      console.log(location, history);
      this.forceUpdate();
    });
    this.unlisten = unlisten;
  }

  componentWillUnmount () {
    this.unlisten && this.unlisten();
  }

  render () {
     const { path, children, componet: ChildComponent, render } = this.props;

     const match = matchPath(path);

     if(!match) return null;

     if(ChildComponent) {
       return  <ChildComponent />
     }

     if(render && typeof render === 'function') {
       return render({a: 1})
     }

     return children;
  }
}

export class Link extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    const { to } = this.props;
    history.push(to);
  }

  render () {
    const { children } = this.props;

    return (
      <a onClick={this.handleClick}>{ children }</a>
    )
  }
}