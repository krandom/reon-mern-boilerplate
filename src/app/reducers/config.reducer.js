import initialState from './initialState';

export default (state = initialState.config, action) => {
  const { payload } = action;
  switch (action.type) {
    default:
      return state;
  }
}