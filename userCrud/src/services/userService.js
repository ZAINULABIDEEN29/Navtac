import api from "./api";


export const UserService = {
    getUsers: async () => {
        const response = await api.get("/users");
        return response.data;
    },
    getUserById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
    addUser: async (user) => {
        const response = await api.post("/users/add", user);
        return response.data;
    },
    updateUser: async (id, user) => {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },
}

