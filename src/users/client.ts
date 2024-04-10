import { httpRequest } from "../utils/commonUtil";

const API_BASE = process.env.REACT_APP_API_BASE;
const API_URL = `${API_BASE}/api/v1`;

export const login = async (user: any) => {
  const response = await httpRequest(`${API_URL}/login`, "POST", {}, {}, user);
  return response.data;
};

export const register = async (user: any) => {
  const response = await httpRequest(`${API_URL}/register`, "POST", {}, {}, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await httpRequest(`${API_URL}/users/${user._id}`, "PUT", {}, {}, user);
  return response.data;
};

export const getUsersByFilter = async (filters: any) => {
  const response = await httpRequest(`${API_URL}/users`, "GET", {}, filters, {});
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await httpRequest(`${API_URL}/users/${userId}`, "GET", {}, {}, {});
  return response.data;
};
