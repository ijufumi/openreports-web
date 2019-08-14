export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_REQUESTED':
            console.log("FETCH_REQUESTED received.");
            return state;
        case 'LOGOUT':
            return state;
        default:
            return state;
    }
};