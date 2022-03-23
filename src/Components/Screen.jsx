import React from "react";

import classes from "./Screen.module.css";

export default function Screen({
  calculator: { operand1, operand2, operator, result },
}) {
  return (
    <div className={classes.screen}>
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
