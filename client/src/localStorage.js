export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    console.log(serializedState);
    const newState = JSON.parse(serializedState);
    console.log(newState);
    console.log(newState.property);
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
    /* State should be serializable */
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
}
