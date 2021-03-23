import React from './react';
import ReactDom from './react-dom';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  componentWillMount () {
    console.log('will mount')
  }

  componentWillUpdate() {
    console.log('will update')
  }

  componentDidMount () {
    console.log('did mount')
  }

  componentDidUpdate () {
    console.log('did update')
  }

  componentWillReceiveProps(props, state) {
    console.log('props', props)
    console.log('state', state)
  }

  onClickAdd() {
    this.setState({
      count: this.state.count + 1
    })
  }

  onClickSub() {
    this.setState(prev => ({count: prev.count - 1}))
  }

  render() {
    return (
      <div className="h1" onEvent="event" prop1="prop1" prop2={{a: 1}}>
       <h1>
        现在的count值是
        {this.state.count}
       </h1>
      <button onClick={() => this.onClickAdd()}>+增加</button>
      <button onClick={() => this.onClickSub()}>-减少</button>
      </div>
    )
  }
}

ReactDom.render(
  <Counter />,
  document.getElementById('root')
)
