/**
 * 每个reducer都管理自己的状态
 */
import * as TYPES from "../action-types";

const initState = {
  supNum: 10,
  oppNum: 5,
};

export default function (state = initState, action) {
  /**
   * 进来先浅克隆一份state，修改state的堆内存地址
   * 也可以用JSON.parse的方法来做简单的深克隆
   */
  state = { ...state };
  switch (action.type) {
    case TYPES.VOTE_CHANGE_SUPNUM:
      state.supNum++;
      break;
    case TYPES.VOTE_CHANGE_OPPNUM:
      state.oppNum++;
      break;
  }
  return state;
}
