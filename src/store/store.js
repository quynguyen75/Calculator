import { createStore, combineReducers } from "redux";
import historyReducer from "../reducers/historyReducer";
import memoryReducer from "../reducers/memoryReducer";

const reducer = combineReducers({
  historyReducer,
  memoryReducer,
});
const store = createStore(reducer);

export default store;
