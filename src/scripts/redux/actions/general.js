// here we respond to an action from the UI, process, and dispatch results to handled in reducer
import ActionTypes from "./actionTypes";

export function getListOfNames() {
  return function(dispatch, state) {
    dispatch({
      type: ActionTypes.GET_NAMES,
      payload: {}
    });
  };
}

export function saveName(name) {
  return function(dispatch, state) {
    dispatch({
      type: ActionTypes.SAVE_NAMES,
      payload: name
    });
  };
}
