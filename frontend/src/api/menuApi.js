import request from "./apiClient";

export const getMenuItem = (filters ={}) => {
    const params = new URLSearchParams()
    if (filters.category) {
        params.append('category', filters.category)
    }
    if (filters.foodType) {
        params.append('foodType', filters.foodType)
    }
    if (filters.search) {
        params.append('search', filters.search)
    }
    const query = params.toString()
    return request(query ? `/menu?${query}` : '/menu')
}
export const getmenuItem = (id) => {
    return request(`/menu?${id}`)
}
export const getAllMenuItems = () => {
    return request('/menu/all')
}
export const createMenuItem = (item) => {
    return request('/menu', 'POST', item)
}
export const updateMenuItem = (id, item) => {
    return request(`/menu?${id}`, 'PUT', item)
}
export const deleteMenuItem = (id) => {
    return request(`/menu?${id}`, 'DELETE')
}