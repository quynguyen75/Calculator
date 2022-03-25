import React, { useReducer, useState } from "react";
import Screen from "./Screen";
import CalculatorButtons from "./CalculatorButtons";
import calculateFromString from "../utils/calculateFromString";

import store from "../store/store";

import classes from "./Calculator.module.css";
import CalculatorHistory from "./CalculatorHistory";

const MAX_LENGTH_NUMBER = 16;

const initialValue = {
  operand1: null,
  operand2: null,
  operator: null,
  result: 0,
};

function checkMaxLength(str = "") {
  if (str.length === MAX_LENGTH_NUMBER) {
    return true;
  }
  return false;
}

function addToHistory(item, store) {
  const historyItem = {
    ...item,
    result: calculateFromString(
      `${item.operand1} ${item.operator} ${item.operand2}`
    ),
    id: store.getState().historyReducer.history.length + 1,
  };

  store.dispatch({
    type: "add",
    payload: historyItem,
  });
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
        // add to history
        addToHistory(prevState, store);

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
      // add to history

      addToHistory(prevState, store);

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

    case "memory":
      if (action.content === "M+" || action.content === "M-") {
        store.dispatch({
          type: action.content,
          payload: prevState.result,
        });
      }

      if (action.content === "MR") {
        return {
          operand1: null,
          operand2: null,
          operator: null,
          result:
            store.getState().memoryReducer.result !== null
              ? store.getState().memoryReducer.result
              : 0,
        };
      }

      if (action.content === "MC") {
        store.dispatch({
          type: "MC",
        });
      }

    default:
      return {
        ...prevState,
      };
  }
};

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [isDisplayHistory, setIsDisplayHistory] = useState(false);

  const displayHistory = () => setIsDisplayHistory(true);

  const hideHistory = () => setIsDisplayHistory(false);

  console.log(store.getState().memoryReducer);

  return (
    <div className={classes.calculator}>
      <Screen calculator={state} displayHistory={displayHistory} />
      <CalculatorButtons dispatch={dispatch} />
      {isDisplayHistory && <CalculatorHistory hideHistory={hideHistory} />}
    </div>
  );
}
