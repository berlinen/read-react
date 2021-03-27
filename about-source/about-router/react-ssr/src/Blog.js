// import React from 'react';
const React = require("react")
class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: props.res || (window && window.__INIT_DATA__ &&  window.__INIT_DATA__.res) || ""
    }
  }
  componentDidMount() {
    console.log('>>>>this.sttae>>>>', this.state)
    if(this.state.res) return null
    fetch("http://localhost:3003/api/data")
      .then(res => res.json())
      .then(({ res }) => {
        this.setState({ res })
      })
  }

  render() {
    const { res } = this.state;
    if(!res) return React.createElement('div', null, "loading....")
    return (
      React.createElement('p', { children: res })
    )
  }
}
// ==export default Blog;

module.exports = Blog;

