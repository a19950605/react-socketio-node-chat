export const notify = (id, roomId) => async (dispatch) => {
	try {
		dispatch({ type: 'NEW_MESSAGE', payload: { id, roomId } });
	} catch (err) {}
};

export const removeNotify = (id) => (dispatch) => {
	dispatch({
		type: 'REMOVE_NOTIFY',
		payload: { id },
	});
};
