import { CREATE_EVENTS } from "../actions/types";

const INITIALSTATE = {};

const createEvents = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case CREATE_EVENTS:
      output = { ...state, createEvents: action.payload };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default createEvents;
