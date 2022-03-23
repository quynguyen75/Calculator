import React from "react";
import CalculatorButton from "./CalculatorButton";

import buttonData from "../data/buttons";

import classes from "./CalculatorButtons.module.css";

export default function CalculatorButtons({ dispatch }) {
  return (
    <div className={classes["calculator-buttons"]}>
      {buttonData.map((button) => (
        <CalculatorButton
          key={button.content}
          color={button.color}
          content={button.content}
          type={button.type}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}
