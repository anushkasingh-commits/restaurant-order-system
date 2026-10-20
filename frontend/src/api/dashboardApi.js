import request from "./apiClient";

export const getDashboard = () => {
    return request('/dashboard')
}