import React from "react";
import CalculatorHistoryItem from "./CalculatorHistoryItem";
import classes from "./CalculatorHistory.module.css";

import store from "../store/store";
import { connect } from "react-redux";

function CalculatorHistory({ hideHistory, history }) {
  const removeHistory = () => {
    store.dispatch({
      type: "remove",
    });
  };

  return (
    <div className={classes.history}>
      <div
        className={`${classes.close} ${classes.button}`}
        onClick={hideHistory}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>

      <div
        className={`${classes.remove} ${classes.button}`}
        onClick={removeHistory}
      >
        <i className="fa-solid fa-trash-can"></i>
      </div>
      <div className={classes["history__list"]}>
        {history.length === 0 && (
          <span className={classes["history__message"]}>
            There's no history yet
          </span>
        )}

        {history.map((item) => (
          <CalculatorHistoryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const history = state.historyReducer.history;
  return { history };
};

export default connect(mapStateToProps)(CalculatorHistory);
