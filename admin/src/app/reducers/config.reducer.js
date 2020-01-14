import initialState from './initialState';

export default (state = initialState.config, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
