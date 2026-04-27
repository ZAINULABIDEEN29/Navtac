import React, { useReducer } from "react";
import { UserContext } from "./UserContext";
import { reducer, initialState } from "./user";

export default function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}
