export const random3 = () =>
  Math.random()
    .toString(4)
    .slice(-3);

export const randomLetter = () => {
  const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";
  for (var i = 0; i < 3; i++) {
    var randomNum = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomNum, randomNum + 1);
  }
  return randomString;
};

export const insertItem = (origArray, addItem) => {
  let newArray = origArray.slice();
  newArray.splice(origArray.length, 0, addItem);
  return newArray;
};

// export const removeItem = (array, action) => {
//   let newArray = array.slice();
//   newArray.splice(action.index, 1);
//   return newArray;
// };
