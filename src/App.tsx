import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { decryptResponse } from "./utils/decryptorUtil";
import { getTopCompanies } from "./externalApis/levelsFyiClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./users/components/ForgotPassword";
import SeekerDetailPage from "./public/pages/SeekerDetailPage";
import RecruiterDetailPage from "./public/pages/RecruiterDetailPage";
import WelcomePage from "./public/pages/WelcomePage";
import SearchPage from "./public/pages/SearchPage";
import SignInPage from "./users/pages/SignInPage";
import SignUpPage from "./users/pages/SignUpPage";
import Layout from "./layouts/ParentLayout";
import CreateRecruiter from "./recruiters/CreateRecruiter";
import CreateSeeker from "./seekers/CreateSeeker";
import SeekJobs from "./seekers/SeekJobs";

import CreateJobPosting from "./jobPostings/jobPosting";

import ReviewApplications from "./recruiters/ReviewApplications";
import { getMyUser } from "./users/client";
import { AuthProvider } from "./AuthContext";
import SignUpConfirmPage from "./users/pages/SignUpConfirmPage";
import SeekerDetail from "./public/components/SeekerDetail";
import RecruiterDetail from "./public/components/RecruiterDetail";
import RecruiterEdit from "./public/components/RecruiterEdit";
import SeekerEdit from "./public/components/SeekerEdit";

function App() {
  let [user, setUser] = React.useState({});

  const test = () => {
    let payload =
      "PGF/4hzKuy89+4RiRL0I/FNOde3SCoZvSJHnCnvdPtOUbWkCh9LrNVXSDDUkchmE8HR9MUYeGpTAv9LCp6fVDjdQXuezZQk2bR4yWFP9PktIuKqngYCnSibUlz1ZzwlAeW3GWyFWLHRYKR5r5qMjqIQnT2Z3xL53sq9crdRlrH5yR2Kk05xid8/fdQvMQFKUnc81BZD8z70nRBfMplORE7nBrArCKiNPXN43E6+GVzM=";

    console.log(decryptResponse({ payload: payload }));
  };

  const testApiCall = async () => {
    const res = await getTopCompanies();
    console.log(res);
  };

  const getCurrUser = async () => {
    let user = await getMyUser();
    return user;
  };

  const init = async () => {
    if (window.location.pathname.startsWith("/logout")) user = {};
    //user = await getCurrUser();
    setUser(user);
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="">
      <AuthProvider>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/me" element={<WelcomePage />} />
              <Route path="/confirm-email" element={<SignUpConfirmPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/seekers/:username" element={<SeekerDetailPage />} />
              <Route path="/recruiters/:username" element={<RecruiterDetailPage />} />
              <Route path="/jobPosting" element={<CreateJobPosting />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/create-recruiter" element={<CreateRecruiter />} />
              <Route path="/create-seeker" element={<CreateSeeker />} />
              <Route path="/seekerDetail" element={<SeekerDetail />} />
              <Route path="/recruiterDetail" element={<RecruiterDetail />} />
              <Route path="/recruiterEdit" element={<RecruiterEdit />} />
              <Route path="/seekerEdit" element={<SeekerEdit />} />
                <Route path="/seek-jobs" element={<SeekJobs />} />
              <Route path="/review-applications" element={<ReviewApplications />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </AuthProvider>
    </div>
  );
}

export default App;
