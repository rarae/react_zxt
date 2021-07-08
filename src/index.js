import React from "react";
import ReactDOM from "react-dom";
// import _ from "./selfJSX";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {}

  render() {
    return <div></div>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById("root")
);
