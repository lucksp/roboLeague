// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";
import { randomLetter, random3, insertItem } from "../../helpers";

const initialState = {
  names: [],
  error: ""
};

export default function data(state = state ? state : initialState, action) {
  switch (action.type) {
    case ActionTypes.SAVE_NAMES:
      let newState = [...state.names];

      const name = action.payload;

      let savedName = {
        ...name,
        uniqueID: randomLetter() + random3(),
        selected: true
      };

      newState = insertItem(newState, savedName);

      return {
        ...state,
        names: newState
      };
    case ActionTypes.DUPE_NAME:
    case ActionTypes.OVER100:
    case ActionTypes.DUPE_SCORE:
      return {
        ...state,
        error: action.payload
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: initialState.error
      };
    default:
      return state;
  }
}
