import axios from "axios";
import { decryptResponse } from "../utils/decryptorUtil";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

// countryId = 254 for US and 113 for India

const TOP_COMPANIES =
  "https://api.levels.fyi/v1/stats/job-family/{{JOB_TITLE}}/topCompanies?countryId=254";
const COMPANY_SEARCH = "https://api.levels.fyi/v2/search/entity/company";
const JOB_SEARCH = "https://api.levels.fyi/v1/job/search";
const SALARY_DATA_TEMPLATE = `https://www.levels.fyi/_next/data/dOB9gm4vLf6jxolu0SqnV/companies/{{COMPANY_SLUG}}/salaries.json`;
//const LOCATION_DATA = "https://www.levels.fyi/_next/data/dOB9gm4vLf6jxolu0SqnV/locations.json";
//const TITLE_DATA = "https://www.levels.fyi/_next/data/dOB9gm4vLf6jxolu0SqnV/t.json";
//const INDIVIDUAL_TITAL_DATA =
//"https://www.levels.fyi/_next/data/dOB9gm4vLf6jxolu0SqnV/t/{{JOB_TITLE}}.json";

export const getSalaryDataURL = (providedSlug: string) => {
  // Replace the placeholder with the provided slug
  const salaryDataURL = SALARY_DATA_TEMPLATE.replace("{{COMPANY_SLUG}}", providedSlug);
  return salaryDataURL;
};

export const getTitleDataUrl = (url: string, providedTitle: string) => {
  // Replace the placeholder with the provided slug
  const titleDataUrl = url.replace("{{JOB_TITLE}}", providedTitle);
  return titleDataUrl;
};

export const getTopCompanies = async (
  jobTitle: string = "software-engineer",
  filters: any = {}
) => {
  const response = await axios.get(getTitleDataUrl(TOP_COMPANIES, jobTitle), {
    params: filters,
    ...axiosConfig,
  });
  const decryptedRes = decryptResponse(response.data);
  return decryptedRes;
};

export const getCompanySearches = async (searchText: string) => {
  const response = await axios.get(COMPANY_SEARCH, {
    params: { searchText: searchText },
    ...axiosConfig,
  });
  const decryptedRes = decryptResponse(response.data);
  return decryptedRes;
};

export const getJobSearches = async (searchText: string) => {
  const response = await axios.get(JOB_SEARCH, {
    params: { searchText: searchText },
    ...axiosConfig,
  });
  const decryptedRes = decryptResponse(response.data);
  return decryptedRes;
};
