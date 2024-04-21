import React from "react";
import Layout from "../../layouts/ParentLayout";
import { useNavigate } from "react-router-dom";
import SearchViewPage from "./SearchViewPage";
import CompanySearchPage from "./CompanySearchPage";
import JobSearchPage from "./JobSearchPage";

export default function SearchPage() {
  let params = new URLSearchParams(window.location.search);
  let [keyword, setKeyword] = React.useState(null);
  let [type, setType] = React.useState(null);

  React.useEffect(() => {
    setKeyword(params.get("keyword"));
    setType(params.get("type") || "ALL");
  }, []);
  return (
    <div className="w-100">
      {type === "ALL" && <SearchViewPage />}

      {type === "COMPANY" && <CompanySearchPage />}

      {type === "JOB" && <JobSearchPage />}
    </div>
  );
}
