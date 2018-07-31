export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    /* Turn string into an object */
    const newState = JSON.parse(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

/* Save state to local Storage */
export const saveState = (state) => {
  try {
    /* State should be serializable. Turn object back into string */
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
}
