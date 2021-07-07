import React from "react";
import ReactDOM from "react-dom";
// import _ from "./selfJSX";

let state; // 用一个全局变量来记录状态，不然没有记忆性是实现不了功能的
function useState(initState) {
  let state = !state ? initState : state,  // 第一次useState才用initState，后面都用记忆的state
    dispatchAction = function (newState) {
      state = newState;
      // render()  => 渲染组件
    };

  return [state, dispatchAction];
}

function App() {
  let [count, setCount] = ff;
}

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById("root")
);
