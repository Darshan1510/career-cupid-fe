import React from "react";
import CompanySearchPage from "./CompanySearchPage";
import JobSearchPage from "./JobSearchPage";
import SearchViewPage from "./SearchViewPage";

export default function SearchPage() {
  let params = new URLSearchParams(window.location.search);
  let type = params.get("type") || "ALL";

  return (
    <div className="w-100 text-center">
      {type === "ALL" && <SearchViewPage />}

      {type === "COMPANY" && <CompanySearchPage />}

      {type === "JOB" && <JobSearchPage />}
    </div>
  );
}
