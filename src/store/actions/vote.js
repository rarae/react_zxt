/**
 * 存储当前板块需要派发行为的action对象
 */
import * as TYPES from "../action-types";

export default {
  changeSupNUM() {
    return {
      type: TYPES.VOTE_CHANGE_SUPNUM,
    };
  },
  changeOppNUM() {
    return {
      type: TYPES.VOTE_CHANGE_OPPNUM,
    };
  },
};
