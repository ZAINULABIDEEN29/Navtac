import { createContext, useContext, useEffect, useReducer } from "react";
import { UserService } from "../services/userService";
import { toast } from "react-toastify";

const UserContext = createContext(null);

const initialState = {
    users: [],
    loading: false,
    error: null
};

function userReducer(state, action) {
    switch (action.type) {
        case "FETCH START":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "FETCH SUCCESS":
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };
        case "FETCH ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case "ADD USER":
            return {
                ...state,
                users: [action.payload, ...state.users], 
                loading: false,
                error: null
            };
        case "UPDATE USER":
            return {
                ...state,
                users: state.users.map((user) => user.id === action.payload.id ? action.payload : user),
                loading: false,
                error: null
            };
        case "DELETE USER":
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const fetchUsers = async () => {
        dispatch({ type: "FETCH START" });
        try {
            const rawData = await UserService.getUsers();
            
          
            let apiUsers = [];
            if (Array.isArray(rawData)) {
                apiUsers = rawData;
            } else if (rawData.users && Array.isArray(rawData.users)) {
                apiUsers = rawData.users; 
            } else if (rawData.data && Array.isArray(rawData.data)) {
                apiUsers = rawData.data;
            }

            const normalizedUsers = apiUsers.map(user => ({
                id: user.id,
                name: user.name || `${user.firstName} ${user.lastName}`.trim() || 'Unknown User',
                email: user.email || 'No Email Provided',
                role: user.role || 'User',
                status: user.id % 4 === 0 ? 'Inactive' : 'Active', 
                joined: user.birthDate || 'Unknown Date'
            }));

            dispatch({ type: "FETCH SUCCESS", payload: normalizedUsers });
        } catch (error) {
            console.error("Fetch Error:", error);
            dispatch({ type: "FETCH ERROR", payload: error.message || "Unknown error occurred" });
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const addUser = async (userData) => {
        try {
            const rawUser = await UserService.addUser(userData);
            
            const normalizedUser = {
                id: rawUser.id,
                name: rawUser.name || `${rawUser.firstName || ''} ${rawUser.lastName || ''}`.trim() || 'New User',
                email: rawUser.email || 'No Email',
                role: rawUser.role || 'User',
                status: 'Active',
                joined: 'Just now'
            };
            
            dispatch({ type: "ADD USER", payload: normalizedUser });
            toast.success("User added successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add user");
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const rawUser = await UserService.updateUser(id, userData);
            
            const normalizedUser = {
                id: rawUser.id,
                name: rawUser.name || `${rawUser.firstName || ''} ${rawUser.lastName || ''}`.trim(),
                email: rawUser.email,
                role: rawUser.role || 'User',
                status: 'Active', 
                joined: 'Unknown'
            };

            dispatch({ type: "UPDATE USER", payload: normalizedUser });
            toast.success("User updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update user");
        }
    };

    const deleteUser = async (id) => {
        try {
            await UserService.deleteUser(id);
            dispatch({ type: "DELETE USER", payload: id });
            toast.success("User deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    };

    return (
        <UserContext.Provider value={{ state, dispatch, fetchUsers, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within UserContextProvider");
    }
    return context;
}