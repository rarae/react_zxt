import { connect } from "react-redux";
import "./index.scss";
import actions from "../../store/actions";

function Vote({ supNum, oppNum, changeSupNUM, changeOppNUM }) {
  console.log(1);
  return (
    <div className="Vote">
      <h2>能不能拿到tx的工作</h2>
      <div className="VoteShow">
        <p>支持人数：{supNum}</p>
        <p>反对人数：{oppNum}</p>
      </div>
      <div className="VoteClick">
        <button onClick={changeSupNUM}>支持</button>
        <button onClick={changeOppNUM}>反对</button>
      </div>
    </div>
  );
}

/**
 * mapStateToProps 的意思就是将store中的状态应用到该组件上，挂在组件的props上面
 * 可以简写成
 * (state) => state.vote // state就是store中的所有状态值
 */

function mapStateToProps(state) {
  return {
    ...state.vote,
  };
}

/**
 * mapDispatchToProps 就是将dispatch派发映射到props上，给组件的调用
 * 可以简写成
 * actions.vote
 */

function mapDispatchToProps(dispatch) {
  return {
    addSupNum() {
      dispatch(actions.vote.changeSupNUM);
    },
    addOppNum() {
      dispatch(actions.vote.changeOppNUM);
    },
  };
}

/**
 * 下面就是简写哦
 * connect就是一个代理，可以理解为就是一个装饰器，使得Vote组件能够使用公共状态管理
 */
export default connect((state) => state.vote, actions.vote)(Vote);
