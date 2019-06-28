export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            // return {...state, loginId: action.state.loginId, password: action.state.password} ;
            return state;
        case 'LOGOUT':
            return state;
        default:
            return state;
    }
};