/**
 * 合并reducer
 */
import { combineReducers } from "redux";
import vote from "./vote";
import personal from "./personal";

export default combineReducers({
  vote,
  personal,
});
/**
 * 合并的结果像这样
 * {
 *    vote: {},
 *    personal: {},
 * }
 */
