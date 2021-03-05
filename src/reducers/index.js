import { combineReducers } from "redux";
import addEventsReducer from "./reducer_create_events";

export default combineReducers({
  // event reducers
  addEvent: addEventsReducer,
});
