import request from "./apiClient";

export const createOrder = (tableId, items) => {
    return request('/orders', 'POST', {tableId, items})
}
export const getMyOrders = () => {
    return request('/orders/mine')
}
export const getOrder = (id) => {
    return request(`/orders/${id}`)
}
export const cancelOrder = (id) => {
    return request(`/orders/${id}/cancel`, 'PATCH')
}
export const getAllOrders = (status = '') => {
    return request(status ? `/orders?status=${status}` : '/orders')
}
export const updateOrderStatus = (id, status) => {
    return request(`/orders/${id}/status`, 'PATCH', {status})
}