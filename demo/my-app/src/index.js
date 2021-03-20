import React from './react';
import ReactDom from './react-dom';

class Log extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    console.log('will mount')
  }

  componentDidMount () {
    console.log('did mount')
  }

  componentWillReceiveProps(props, state) {
    console.log('props', props)
    console.log('state', state)
  }

  render() {
    return (
      <div className="h1" onEvent="event" prop1="prop1" prop2={{a: 1}}>
        现在时间：
        {new Date().getTime()}
        <p>p-tag</p>
      </div>
    )
  }
}

ReactDom.render(
  <Log />,
  document.getElementById('root')
)
