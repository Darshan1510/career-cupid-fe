import React from "react";

const CompanyList = ({ companies }) => {
  return (
    <div className="container">
      <h2 className="text-center m-4">Top Companies</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {companies.map((company) => (
          <div className="col" key={company.slug}>
            <div className="card h-100">
              <img
                src={company.icon}
                className="card-img-top img-fluid mx-auto d-block p-2"
                alt={company.name}
                style={{ height: "100px", width: "100px" }}
              />

              <div className="card-body">
                <h5 className="card-title">{company.name}</h5>
                <p className="card-text">
                  Total Compensation: ${company.totalCompensation.toLocaleString()}
                </p>
                <a
                  href={`https://www.levels.fyi/company/${company.slug}`}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
