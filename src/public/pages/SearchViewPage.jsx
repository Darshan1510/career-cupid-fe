import React from "react";
import * as levelsFyiClient from "../../externalApis/levelsFyiClient";
import CompanySearchResults from "../components/CompanySearchResults";
import JobSearches from "../components/JobSearches";

export default function SearchViewPage() {
  let params = new URLSearchParams(window.location.search);
  let keyword = params.get("keyword") || "";

  let [companySearches, setCompanySearches] = React.useState(null);
  let [jobSearches, setJobSearches] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (!keyword) return;

      const companySearches = await levelsFyiClient.getCompanySearches(keyword);
      setCompanySearches(companySearches);

      const jobSearches = await levelsFyiClient.getJobSearches(keyword);
      setJobSearches(jobSearches.results);
    })();
  }, []);

  return (
    <div className="container">
      <div>
        <h3>Search Results for: {keyword}</h3>
      </div>
      {companySearches && <CompanySearchResults companies={companySearches} />}
      <br />
      {jobSearches && <JobSearches results={jobSearches} />}
    </div>
  );
}
