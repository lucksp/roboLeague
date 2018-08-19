// here we respond to an action from the UI, process, and dispatch results to handled in reducer
import ActionTypes from "./actionTypes";
import { hasDuplicate, FLAGS, overLimits } from "../reducers/helper";

export function saveName(name) {
  return function(dispatch, state) {
    const thisState = state().general.names;
    if (hasDuplicate(thisState, name, FLAGS.NAME)) {
      return dispatch({
        type: ActionTypes.DUPE_NAME,
        payload: "You have already entered this player name."
      });
    }
    if (hasDuplicate(thisState, name, FLAGS.SCORE)) {
      return dispatch({
        type: ActionTypes.DUPE_SCORE,
        payload:
          "This Player has the same total attribute score as another player on your roster."
      });
    }
    let overLimit = overLimits(thisState, name);
    if (overLimit) {
      return dispatch({
        type: overLimit.type,
        payload: overLimit.payload
      });
    }
    return dispatch({
      type: ActionTypes.SAVE_NAMES,
      payload: name
    });
  };
}

export function over100() {
  return function(dispatch, state) {
    return dispatch({
      type: ActionTypes.OVER100,
      payload: "This Player has a score greater than 100."
    });
  };
}

export function clearError() {
  return function(dispatch, state) {
    return dispatch({
      type: ActionTypes.CLEAR_ERROR
    });
  };
}
