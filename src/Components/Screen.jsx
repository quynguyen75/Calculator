import React from "react";

import classes from "./Screen.module.css";

export default function Screen({
  calculator: { operand1, operand2, operator, result },
  displayHistory,
}) {
  return (
    <div className={classes.screen}>
      <div className={classes["watch-history"]} onClick={displayHistory}>
        <i className="fa-solid fa-clock-rotate-left"></i>
      </div>
      <div>
        <div className={classes.history}>
          <span>{operand1 === null ? "" : operand1}</span>{" "}
          <span>{operator}</span>{" "}
          <span>{operand2 === null ? "" : operand2}</span>
        </div>
        <h2 className={classes.result}>{result}</h2>
      </div>
    </div>
  );
}
