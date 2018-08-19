import ActionTypes from "../actions/actionTypes";

export const FLAGS = {
  NAME: "NAME",
  SCORE: "SCORE",
  STARTER: "STARTER",
  SUB: "SUB"
};

export const hasDuplicate = (state, newName, flag) => {
  //
  if (!state.length) return false;

  const compareName = (state, newName) => {
    return state.find(name => {
      if (
        name.name_first + name.name_last ===
        newName.name_first + newName.name_last
      ) {
        return true;
      }
    });
  };

  const compareScore = (state, newName) => {
    const newScore = newName.speed + newName.strength + newName.agility;
    return state.find(name => {
      if (name.agility + name.speed + name.strength === newScore) {
        return true;
      }
    });
  };

  if (flag === FLAGS.NAME) return compareName(state, newName);
  if (flag === FLAGS.SCORE) return compareScore(state, newName);
};

export const overLimits = (state, name) => {
  let countStarter = 0;
  let countSub = 0;
  let combinedLimit = 7; //TODO - set to 15
  let limit;

  if (state.length >= combinedLimit) {
    return {
      type: ActionTypes.ROSTER_LIMIT,
      payload: "You may not select more than 15 combined players."
    };
  }

  if (name.type === FLAGS.STARTER.toLowerCase()) {
    // add new name to counter
    countStarter++;

    //now check for limit
    limit = 10;
    state.forEach(starter => {
      if (starter.type === FLAGS.STARTER.toLowerCase()) countStarter++;
    });

    if (countStarter > limit) {
      return {
        type: ActionTypes.OVER_STARTERS,
        payload: "You may not select more than 10 starters."
      };
    }
  } else if (name.type === FLAGS.SUB.toLowerCase()) {
    // add new name to counter
    countSub++;

    //now check for limit
    limit = 5;
    state.forEach(starter => {
      countSub++;
    });
    if (countSub > limit) {
      return {
        type: ActionTypes.OVER_SUBS,
        payload: "You may not select more than 5 subs."
      };
    }
  }

  return false;
};
