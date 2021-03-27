const React = require("react")

module.exports = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: props.res || ""
    }
  }
  componentDidMount() {
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