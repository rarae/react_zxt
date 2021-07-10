import { createStore } from "redux";
import reducer from "./reducers";

// 创建全局store容器，里面存储了状态和事件
const store = createStore(reducer);

export default store;
