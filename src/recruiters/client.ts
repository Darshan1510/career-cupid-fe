import commonUtil from "../utils/commonUtil";

const API_BASE = process.env.REACT_APP_API_BASE;
const API_URL = `${API_BASE}/api/v1`;

export interface IRecruiter {
  name: string;
  email: string;
  country: string;
  website: string;
  bio: string;
  profile_picture: string;
  created_at: number;
  updated_at: number;
}

export const createRecruiter = async (recruiter: any) => {
  let method = "POST";
  let url = `${API_URL}/recruiters`;
  const response = await commonUtil.httpRequest(url, method, {}, recruiter);
  return response;
};

export const getRecruitersByFilter = async (filters: any) => {
  let method = "GET";
  let url = `${API_URL}/recruiters?${filters}`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const updateRecruiter = async (recruiter: any) => {
  let method = "PUT";
  let url = `${API_URL}/recruiters/${recruiter._id}`;
  const response = await commonUtil.httpRequest(url, method, {}, recruiter);
  return response;
};

export const approveRecruiter = async (recruiterId: any) => {
  let method = "GET";
  let url = `${API_URL}/recruiters/${recruiterId}/approve`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};
