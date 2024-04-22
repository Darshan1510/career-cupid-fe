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

    seeker.user = key;
    seeker.created_at = Date.now();
    let method = "POST";
    let url = `${API_URL}/seekers`;
    const response = await commonUtil.httpRequest(url, method, {}, seeker);
    return response;
};