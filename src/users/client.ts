import commonUtil from "../utils/commonUtil";

const API_BASE = process.env.REACT_APP_API_BASE;
const API_URL = `${API_BASE}/api/v1`;

enum Role {
  ADMIN = "ADMIN",
  SEEKER = "SEEKER",
  RECRUITER = "RECRUITER",
}

export interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  created_at: number;
  updated_at: number;
  role: Role;
}

export const login = async (user: any) => {
  let method = "POST";
  let url = `${API_URL}/login`;
  const response = await commonUtil.httpRequest(url, method, {}, user);
  return response;
};

export const register = async (user: any) => {
  let method = "POST";
  let url = `${API_URL}/register`;
  const response = await commonUtil.httpRequest(url, method, {}, user);
  return response;
};

export const updateUser = async (user: any) => {
  let method = "PUT";
  let url = `${API_URL}/users/${user._id}`;
  const response = await commonUtil.httpRequest(url, method, {}, user);
  return response;
};

export const getUsersByFilter = async (filters: any) => {
  let method = "GET";
  let url = `${API_URL}/users?${filters}`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const getUserById = async (userId: string) => {
  let method = "GET";
  let url = `${API_URL}/users/${userId}`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const getMyUser = async () => {
  let method = "GET";
  let url = `${API_URL}/user`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const confirmEmail = async (token: string) => {
  let method = "POST";
  let url = `${API_URL}/confirm-email`;
  const response = await commonUtil.httpRequest(url, method, {}, { token: token });
  return response;
};
