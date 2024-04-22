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
    // TODO: Fetch the ID of the logged-in user from the session
    seeker.user = "662461aec443feceb60432b1";
    seeker.created_at = Date.now();
    let method = "POST";
    let url = `${API_URL}/seekers`;
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
  
