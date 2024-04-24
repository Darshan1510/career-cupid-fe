import commonUtil from "../utils/commonUtil";

const API_BASE = process.env.REACT_APP_API_BASE;
const API_URL = `${API_BASE}/api/v1`;

export interface ISeeker {
  city: string;
  state: string;
  country: string;
  created_at: number;
  job_titles: string[];
  skills: string[];
  experience: number;
  education: string;
  resume: string;
  bio: string;
  profile_picture: string;
}

export const createSeeker = async (seeker: any) => {
  let CC_LOGIN_TOKENS = commonUtil.getLoginTokens();
  const id = CC_LOGIN_TOKENS[0];
  const key = Object.keys(id)[0];

  let method = "GET";
  let url = `${API_URL}/users/${key}`;
  const user: any = await commonUtil.httpRequest(url, method, {}, {});

  seeker.user = key;
  seeker.email = user.email;
  seeker.created_at = Date.now();
  method = "POST";
  url = `${API_URL}/seekers`;
  const response = await commonUtil.httpRequest(url, method, {}, seeker);
  return response;
};

export const getSeekerById = async (seekerId: string) => {
  let method = "GET";
  let url = `${API_URL}/seekers/${seekerId}`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const getSeekersByFilter = async (filters: any) => {
  let method = "GET";
  let url = `${API_URL}/seekers?${filters}`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const updateSeekers = async (seekers: any) => {

  let method = "PUT";
  let url = `${API_URL}/seekers/${seekers._id}`;
  const response = await commonUtil.httpRequest(url, method, {}, seekers);
  return response;
};

// Get job postings (TODO: get only the ones where the seeker did not pply so far)
export const getJobPostings = async () => {
  let method = "GET";
  let url = `${API_URL}/jobPostings`;
  const response = await commonUtil.httpRequest(url, method, {}, {});
  return response;
};

export const applyJob = async (jobId: string) => {
  let CC_LOGIN_TOKENS = commonUtil.getLoginTokens();
  const id = CC_LOGIN_TOKENS[0];
  const key = Object.keys(id)[0];

  let method = "POST";
  let url = `${API_URL}/jobPostings/${jobId}/applicants`;
  const response = await commonUtil.httpRequest(url, method, {}, { applicantId: key });

  return response;
};