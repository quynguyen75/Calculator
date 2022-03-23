import React from "react";
import classes from "./CalculatorButton.module.css";

export default function CalculatorButton({ content, type, color, dispatch }) {
  const buttonClickHandler = () =>
    dispatch({
      type,
      content,
    });
  return (
    <button
      className={`${classes.button} ${classes[color]}`}
      onClick={buttonClickHandler}
    >
      {content}
    </button>
  );
}
