export default function (state = { history: [] }, action) {
  switch (action.type) {
    case "add":
      return {
        history: [action.payload, ...state.history],
      };

    case "remove":
      return {
        history: [],
      };

    default:
      return state;
  }
}
