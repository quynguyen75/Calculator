import React, { useReducer } from "react";
import Screen from "./Screen";
import classes from "./Calculator.module.css";
import CalculatorButtons from "./CalculatorButtons";

const MAX_LENGTH_NUMBER = 16;

const initialValue = {
  operand1: null,
  operand2: null,
  operator: null,
  result: 0,
};

function calculateFromString(str) {
  return new Function("return " + str)();
}

function checkMaxLength(str = "") {
  if (str.length === MAX_LENGTH_NUMBER) {
    return true;
  }
  return false;
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case "number":
      // operand1
      if (prevState.operand1 === null && prevState.operand2 === null) {
        return {
          ...prevState,
          operand1: action.content === "." ? "0." : action.content,
        };
      }

      // operand1
      if (prevState.operand1 !== null && prevState.operator === null) {
        if (checkMaxLength(prevState.operand1)) {
          return {
            ...prevState,
          };
        }

        return {
          ...prevState,
          operand1: prevState.operand1 + action.content,
        };
      }

      // operand2
      if (prevState.operator !== null) {
        if (prevState.operand2 !== null && checkMaxLength(prevState.operand2)) {
          return {
            ...prevState,
          };
        }

        return {
          ...prevState,
          operand2:
            prevState.operand2 === null
              ? action.content === "."
                ? "0."
                : action.content
              : prevState.operand2 + action.content,
        };
      }

    case "operator":
      if (action.content === "+/-") {
        if (prevState.operand2 !== null) {
          return {
            ...prevState,
            operand2: `${prevState.operand2 * -1}`,
          };
        }

        if (prevState.operand1 !== null) {
          return {
            ...prevState,
            operand1: prevState.operand1 * -1,
          };
        }
      }

      // have 2 operand
      if (prevState.operand1 !== null && prevState.operand2 !== null) {
        const result =
          calculateFromString(
            `${prevState.operand1} ${prevState.operator} ${prevState.operand2}`
          ) + "";
        return {
          ...prevState,
          operand1: result,
          operand2: null,
          operator: action.content,
          result,
        };
      }

      // haven't operand2
      if (prevState.operand2 === null) {
        return {
          ...prevState,
          operator: action.content,
        };
      }

    case "equal":
      // have 2 operand
      if (prevState.operand1 !== null && prevState.operand2 !== null) {
        return {
          ...prevState,
          result: calculateFromString(
            `${+prevState.operand1} ${
              prevState.operator
            } ${+prevState.operand2}`
          ),
        };
      }

      // haven't operand2
      if (
        (prevState.operand2 === null && prevState.operator !== null) ||
        prevState.operand1
      ) {
        return {
          ...prevState,
          result: prevState.operand1,
          operator: null,
        };
      }

    case "clear":
      if (action.content === "AC") {
        return {
          operand1: null,
          operand2: null,
          operator: null,
          result: 0,
        };
      }

      if (action.content === "⌫") {
        // operand2
        if (prevState.operand2 !== null) {
          const newOperand =
            prevState.operand2 && prevState.operand2.slice(0, -1);

          return {
            ...prevState,
            operand2: Number(newOperand) ? newOperand : null,
          };
        }

        // operator
        if (prevState.operator !== null) {
          return {
            ...prevState,
            operator: null,
          };
        }
        const newOperand =
          prevState.operand1 && prevState.operand1.slice(0, -1);

        // operand 1
        return {
          ...prevState,
          operand1: Number(newOperand) ? newOperand : null,
        };
      }

    default:
      return {
        ...prevState,
      };
  }
};

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  console.log(state.operand1, state.operand2, state.operator);

  return (
    <div className={classes.calculator}>
      <Screen calculator={state} />
      <CalculatorButtons dispatch={dispatch} />
    </div>
  );
}
