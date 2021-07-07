import React from "react";
import ReactDOM from "react-dom";
import _ from "./selfJSX";

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    // 就算在constructor什么都不传,react还是会帮我们将props挂载到当前实例上
    console.log(this.props);
    return <div></div>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App index={1}></App>
  </React.StrictMode>,
  document.getElementById("root")
);
