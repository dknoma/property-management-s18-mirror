/* Save state to local Storage */
export const saveState = (state) => {
  try {
    /* Turn object into string and save to localstorage */
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    /* Turn string into an object and update state */
    const newState = JSON.parse(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}
