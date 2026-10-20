import request from "./apiClient";

export const getTables = () => {
    return request('/tables')
}
export const createTable = (table) => {
    return request('/tables', 'POST', table)
}
export const updateTable = (id, table) => {
    return request(`/table/${id}`, 'PUT', table)
}
export const deleteTable = (id) => {
    return request(`/table/${id}`, 'DELETE')
}