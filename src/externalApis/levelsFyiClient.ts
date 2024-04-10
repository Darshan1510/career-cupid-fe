import axios from "axios";
import { decryptResponse } from "../utils/decryptorUtil";

// countryId = 254 for US and 113 for India

const TOP_COMPANIES =
  "https://api.levels.fyi/v1/stats/job-family/{{JOB_TITLE}}/topCompanies?countryId=254";
const COMPANY_SEARCH = "https://api.levels.fyi/v2/search/entity/company";
const JOB_SEARCH = "https://api.levels.fyi/v1/job/search";
const SALARY_DATA_TEMPLATE = `https://www.levels.fyi/_next/data/dOB9gm4vLf6jxolu0SqnV/companies/{{COMPANY_SLUG}}/salaries.json`;
const LOCATION_DATA = "https://www.levels.fyi/_next/data/dOB9gm4vLf6jxolu0SqnV/locations.json";
const TITLE_DATA = "https://www.levels.fyi/_next/data/dOB9gm4vLf6jxolu0SqnV/t.json";
const INDIVIDUAL_TITAL_DATA =
  "https://www.levels.fyi/_next/data/dOB9gm4vLf6jxolu0SqnV/t/{{JOB_TITLE}}.json";

const getSalaryDataURL = (providedSlug: string) => {
  // Replace the placeholder with the provided slug
  const salaryDataURL = SALARY_DATA_TEMPLATE.replace("{{COMPANY_SLUG}}", providedSlug);
  return salaryDataURL;
};

const getTitleDataUrl = (url: string, providedTitle: string) => {
  // Replace the placeholder with the provided slug
  const titleDataUrl = url.replace("{{JOB_TITLE}}", providedTitle);
  return titleDataUrl;
};

export const getTopCompanies = async (
  jobTitle: string = "software-engineer",
  filters: any = {}
) => {
  const response = await axios.get(getTitleDataUrl(TOP_COMPANIES, jobTitle), filters);
  const decryptedRes = decryptResponse(response.data);
  return decryptedRes;
};
