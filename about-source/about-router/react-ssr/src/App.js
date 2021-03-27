const React = require("react");

function App() {
  return React.createElement('div', {
    onClick() {
      console.log("hello wrold")
    },
    style: {
      fontSize: 26
    }
  }, "hello world")
}

module.exports = App;
