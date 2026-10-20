import request from "./apiClient";

export const registerUser = (name, email, password) => {
  return request("/auth/register", "POST", { name, email, password });
};

export const loginUser = (email, password) => {
  return request("/auth/login", "POST", { email, password });
};