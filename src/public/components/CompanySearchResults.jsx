import React from "react";

const CompanySearchResults = ({ companies }) => {
  return (
    <div className="container mt-4">
      <h4 className="mb-4">Company Search Results</h4>
      <div className="row">
        {companies.map((company) => (
          <div key={company.id} className="col-md-2 mb-4">
            <div className="card h-100">
              <a
                href={`https://www.levels.fyi/company/${company.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={company.icon}
                  className="card-img-top img-fluid mx-auto d-block p-2"
                  alt={company.displayValue}
                  style={{ height: "100px", width: "120px" }}
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">{company.displayValue}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySearchResults;
