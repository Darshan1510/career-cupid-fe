import React from "react";
import Layout from "../../layouts/ParentLayout";
import CompanyList from "../components/CompanyList";
import * as levelsFyiClient from "../../externalApis/levelsFyiClient";

export default function WelcomePage() {
  let [topCompanies, setTopCompanies] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const topCompanies = await levelsFyiClient.getTopCompanies();
      setTopCompanies(topCompanies);
    })();
  }, []);

  return (
    <div className="App">
      <header className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1>Welcome to Career Cupid</h1>
          <p className="lead">Your platform to find your dream career match</p>
          <a href="#features" className="btn btn-light btn-lg">
            Explore Features
          </a>
        </div>
      </header>
      <section id="features" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Advanced Matching Algorithm</h2>
                  <p className="card-text">
                    Our proprietary algorithm matches you with the perfect career based on your
                    skills, interests, and preferences.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Personalized Recommendations</h2>
                  <p className="card-text">
                    Receive personalized career recommendations tailored to your unique profile.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Expert Career Advice</h2>
                  <p className="card-text">
                    Access expert career advice and guidance from industry professionals to help you
                    succeed in your career.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Featured Jobs</h2>
                  <p className="card-text">
                    Discover featured job opportunities from top companies in your field.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Tinder-like Job Matching</h2>
                  <p className="card-text">
                    Swipe right or left on job listings to indicate your interest and preferences.
                    Match with jobs that meet your criteria.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Verified Recruiters</h2>
                  <p className="card-text">
                    Job listings are posted by verified recruiters who have been approved by our
                    admin team, ensuring quality and reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Interactive Dashboard</h2>
                  <p className="card-text">
                    Access an intuitive dashboard to manage your job applications, saved jobs, and
                    profile information.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Job Alerts</h2>
                  <p className="card-text">
                    Receive real-time job alerts based on your preferences to stay updated on new
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">Resume Builder</h2>
                  <p className="card-text">
                    Create and customize professional resumes using our easy-to-use resume builder
                    tool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {topCompanies && <CompanyList companies={topCompanies} />}
    </div>
  );
}
