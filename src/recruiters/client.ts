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
    // TODO: Fetch the ID of the logged-in user
    recruiter.user = "60f3b3b3b3b3b3b3b3b3b3b3";
    recruiter.created_at = Date.now();
    recruiter.approved = false;
    let method = "POST";
    let url = `${API_URL}/recruiters`;
    const response = await commonUtil.httpRequest(url, method, {}, recruiter);
    return response;
};