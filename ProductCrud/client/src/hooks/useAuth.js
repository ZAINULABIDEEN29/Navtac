import { useMutation } from "@tanstack/react-query"
import { useUser } from "../context/UserContext";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


export const useLogin = () => {
    const { state, dispatch } = useUser();
    // console.log("user state: ",state)
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userData) => authService.login(userData.email, userData.password),
        onSuccess: (response) => {
            if (response.user) {
                dispatch({
                    type: "LOGIN",
                    payload: response.user
                })
                localStorage.setItem("user", JSON.stringify(response.user))
                queryClient.invalidateQueries({ queryKey: ["current-user"] })
            }
            toast.success("Login successful")
            navigate("/dashboard")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useRegister = () => {
    const { state, dispatch } = useUser();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userData) => authService.register(userData),
        onSuccess: (response) => {
            if (response.user) {
                dispatch({
                    type: "LOGIN",
                    payload: response.user
                })
                localStorage.setItem("user", JSON.stringify(response.user))
                queryClient.invalidateQueries({ queryKey: ["current-user"] })
            }
            toast.success("User registered successfully")
            navigate("/dashboard")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useLogout = () => {
    const { state, dispatch } = useUser();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            dispatch({ type: "LOGOUT" })
            localStorage.removeItem("user")
            queryClient.invalidateQueries({ queryKey: ["current-user"] })
            navigate("/")
        },
        onSettled: () => {
            // Force logout locally even if request fails
            dispatch({ type: "LOGOUT" })
            localStorage.removeItem("user")
            navigate("/")
        },
        onError: (error) => {
            console.error("Logout error:", error)
        }
    })
}
