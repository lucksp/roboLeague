// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";

const initialState = {};

const insertItem = (origArray, addItem) => {
  let newArray = origArray.slice();
  newArray.splice(origArray.length, 0, addItem);
  return newArray;
};

// const removeItem = (array, action) => {
//   let newArray = array.slice();
//   newArray.splice(action.index, 1);
//   return newArray;
// };

export default function data(state = state ? state : initialState, action) {
  switch (action.type) {
    case ActionTypes.SAVE_NAMES:
      let newState = [...state];

      const name = action.payload;
      const random3 = () =>
        Math.random()
          .toString(4)
          .slice(-3);

      const randomLetter = function() {
        const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomString = "";
        for (var i = 0; i < 3; i++) {
          var randomNum = Math.floor(Math.random() * charSet.length);
          randomString += charSet.substring(randomNum, randomNum + 1);
        }
        return randomString;
      };

      let savedName = {
        ...name,
        uniqueID: randomLetter() + random3(),
        selected: true
      };

      newState = insertItem(newState, savedName);

      return [...newState];
    default:
      return state;
  }
}
