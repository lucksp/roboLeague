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

  if (flag === "name") return compareName(state, newName);
  if (flag === "score") return compareScore(state, newName);
};
