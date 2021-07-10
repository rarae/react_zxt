/**
 * 每个reducer都管理自己的状态
 */
import * as TYPES from "../action-types";

const initState = {
  name: "hyp",
  age: 24,
};

export default function (state = initState, action) {
  /**
   * 进来先浅克隆一份state，修改state的堆内存地址
   * 也可以用JSON.parse的方法来做简单的深克隆
   */
  state = { ...state };
  switch (action.type) {
  }
  return state;
}
