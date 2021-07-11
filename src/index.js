import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import VoteRedux from "./components/Vote-redux";
import VoteReactRedux from "./components/Vote-react-redux";
import { Provider } from "react-redux";
// import _ from "./selfJSX";

/**
 * react-redux的好处，还是要用到redux的，只不过react-redux就是对如何使用redux做了一个封装，使它用在react组件的时候写起来清晰简单
 * 1. Provider：可以通过这个组件来传递store，其实他就是利用上下文context实现的
 * 2. 使用connect方法、高阶组件、自动将store容器中的状态、dispatch方法映射到组件的props中，
 *    这时候组件就能够调用props.fn来修改store状态，并且能够自动刷新页面
 */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <VoteReactRedux></VoteReactRedux>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
