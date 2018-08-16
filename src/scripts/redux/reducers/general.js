// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";

const initialState = {
  name: "Phil"
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_NAMES:
      var allInfo = {
        ...state
      };
      return {
        ...allInfo
      };
    // case ActionTypes.ADD_NAMES:
    //   var allInfo = {
    //     ...state
    //   };
    //   return {
    //     ...allInfo
    //   };
    default:
      return state;
  }
}
