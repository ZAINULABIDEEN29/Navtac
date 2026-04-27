import { apiClient } from "./apiClient"

export const authService = {

    login: async (email,password)=>{

        const response = await apiClient.post("auth/login",{email,password});
        return response;
    },

    register: async (userData)=>{
        const response = await apiClient.post("auth/register",userData);
        return response;
    },

    logout:async ()=>{
        await apiClient.post("auth/logout");
    }
}