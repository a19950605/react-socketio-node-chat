export const newMsgReducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_MESSAGE':
			return [...state, action.payload];
		case 'REMOVE_NOTIFY':
			return (
				(state.newMsg &&
					state.newMsg.filter((x) => x.roomId === action.payload.id)) ||
				null
			);
		default:
			return state;
	}
};
