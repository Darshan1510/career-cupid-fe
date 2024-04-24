import commonUtil from "../utils/commonUtil";

const API_BASE = process.env.REACT_APP_API_BASE;
const API_URL = `${API_BASE}/api/v1`;

export interface IJobPosting {
  company: string;
  title: string;
  description: string;
  city: string;
  state: string;
  country: string;
  salary: number;
  industry: string;
  openings: number;
  remote: boolean;
  hybrid: boolean;
  full_time: boolean;
  created_at: number;
  updated_at: number;
  skills: string[];
  experience: number;
}

export const updateJobPosting = async (jobPosting: any) => {
  let method = "PUT";
  let url = `${API_URL}/jobPostings/${jobPosting._id}`;
  const response = await commonUtil.httpRequest(url, method, {}, jobPosting);
  return response;
};

export const getJobPostingById = async (jobId: string) => {
  let method = "GET";
  let url = `${API_URL}/jobPostings/${jobId}`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const getAllJobPostings = async (queryParams: any) => {
  let method = "GET";
  let url = `${API_URL}/jobPostings`;
  const response = await commonUtil.httpRequest(url, method, {}, queryParams);
  return response;
};

export const createJobPosting = async (jobPosting: any) => {
  let method = "POST";
  let url = `${API_URL}/jobPostings`;
  const response = await commonUtil.httpRequest(url, method, {}, jobPosting);
  return response;
};

export const deleteJobPosting = async (jobId: string) => {
  let method = "DELETE";
  let url = `${API_URL}/jobPostings/${jobId}`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const getJobPostingsByFilter = async (filters: any) => {
  let method = "GET";
  let url = `${API_URL}/jobPostings?${filters}`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const shortlistSeeker = async (seekerId: any, jobPostingId: any) => {
  let method = "POST";
  let url = `${API_URL}/jobPostings/${jobPostingId}/shortlist-applicants`;
  const response = await commonUtil.httpRequest(url, method, {}, { applicantId: seekerId });
  return response;
};
