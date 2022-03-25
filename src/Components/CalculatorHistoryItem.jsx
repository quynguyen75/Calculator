import React from "react";
import classes from "./CalculatorHistoryItem.module.css";

export default function CalculatorHistoryItem({
  operand1,
  operand2,
  operator,
  result,
}) {
  return (
    <div className={classes.item}>
      <span>{operand1}</span> <span>{operand2 && operator}</span>{" "}
      <span>{operand2 && operand2}</span> ={" "}
      <h6 className={classes.result}>{result}</h6>
    </div>
  );
}
