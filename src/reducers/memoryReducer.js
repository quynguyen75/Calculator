import calculateFromString from "../utils/calculateFromString";

export default function (state = { result: null, operator: null }, action) {
  switch (action.type) {
    case "M+":
    case "M-":
      const operator = action.type === "M+" ? "+" : "-";

      if (state.operator !== null) {
        return {
          result: calculateFromString(
            `${state.result} ${state.operator} ${action.payload}`
          ),
          operator,
        };
      }

      return {
        result: action.payload,
        operator,
      };

    case "MC":
      return {
        result: null,
        operator: null,
      };
    default:
      return state;
  }
}
