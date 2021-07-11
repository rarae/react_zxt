import { useEffect, useState } from "react";
import "./index.scss";
import actions from "../../store/actions";
import store from "../../store";  // 一般是通过父组件向子组件传递store来实现的，不用import

export default function ({}) {
  /**
   * 从store里面拿到状态，然后显示到页面中，注意此时要绑定一个组件重新渲染的方法，不然组件是不会渲染的
   */
  let {
      vote: { supNum, oppNum },
    } = store.getState(),
    [_, render] = useState((_) => {
      return 0;
    });

  useEffect(() => {
    store.subscribe(() => {  // 这里订阅事件的时候没有区分模块吗，那别的模块是不是也能触发？
      // 这里的state一定要取最新值，不然如果state一直是相同值的话，视图是不会重新渲染的
      // 这里把两个加起来的意思就是如果有一个改变，那么跟之前的值一定不一样，从而导致整个视图的刷新
      render(store.getState().vote.supNum + store.getState().vote.oppNum);
    });
  }, []);

  return (
    <div className="Vote">
      <h2>能不能拿到tx的工作</h2>
      <div className="VoteShow">
        <p>支持人数：{supNum}</p>
        <p>反对人数：{oppNum}</p>
      </div>
      <div className="VoteClick">
        <button
          onClick={(ev) => {
            store.dispatch(actions.vote.changeSupNUM());
          }}
        >
          支持
        </button>
        <button
          onClick={(ev) => {
            store.dispatch(actions.vote.changeOppNUM());
          }}
        >
          反对
        </button>
      </div>
    </div>
  );
}
