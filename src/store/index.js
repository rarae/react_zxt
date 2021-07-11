import {
  createStore,
  combineReducers,
  applyMiddleware,
  bindActionCreators,
  compose,
} from "redux";
import reducer from "./reducers";

/**
 * 创建全局store容器，里面存储了每个模块的数据和事件，当容器中的数据发生更改，会通知对应的事件执行
 * 为了保证公共状态发生改变，组件能够重新渲染，我们把组件渲染的方法添加到事件池中
 * 比如：store.vote.subscribe(fn)
 */
const store = createStore(reducer);

export default store;
