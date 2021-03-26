import React from 'react';
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';

const history = createBrowserHistory();

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