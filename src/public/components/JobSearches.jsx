import React from "react";

const JobSearches = ({ results }) => {
  return (
    <div className="container mt-4">
      <h4 className="mb-4">Job Search Results</h4>
      <div className="row">
        {results.map((result) => (
          <div key={result.companySlug} className="col-md-3 mb-4">
            <div className="card h-100">
              <div
                className="card-img-top img-fluid d-flex justify-content-center align-items-center mx-auto d-block p-2"
                style={{ height: "120px", width: "120px" }}
              >
                <img
                  src={result.companyIcon}
                  alt={result.companyName}
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{result.companyName}</h5>
                <p className="card-text">{result.shortDescription}</p>
                <ul className="list-group list-group-flush">
                  {result.jobs.map((job) => (
                    <li key={job.id} className="list-group-item">
                      <h6>{job.title}</h6>
                      <p>{job.locations.join(", ")}</p>
                      <a
                        href={job.applicationUrl}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearches;
