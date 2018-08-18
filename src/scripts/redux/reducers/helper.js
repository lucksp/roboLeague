export const hasDuplicate = (state, newName) => {
  //
  if (!state.length) return false;

  const compareName = (state, newName) => {
    return state.find(name => {
      return (
        name.name_first + name.name_last ===
        newName.name_first + newName.name_last
      );
    });
  };
  return compareName(state, newName);
};
