

const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

export const initialState = {
    user: user,
    isAuthenticated: !!user,
}

export function reducer (state,action){
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        default:
            return state
    }
}