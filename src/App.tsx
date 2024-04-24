import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
// import ReviewApplications from "./recruiters/ReviewApplications";
import { AuthContext, AuthProvider } from "./AuthContext";
import SignUpConfirmPage from "./users/pages/SignUpConfirmPage";
import RecruiterEdit from "./public/components/RecruiterEdit";
import SeekerEdit from "./public/components/SeekerEdit";
import AdminSignInPage from "./admin/pages/AdminSignInPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import RecruiterDashboard from "./recruiters/RecruiterDashboard";
import SeekerDashboard from "./seekers/SeekerDashboard";
import ApplyJobs from "./seekers/ApplyJobs";
import ShortlistCandidates from "./recruiters/ShortlistCandidates";
import JobPostingsEdit from "./jobPostings/JobPostingEdit";

function App() {
  let [user, setUser] = React.useState({});

  const init = async () => {
    if (window.location.pathname.startsWith("/logout")) user = {};
    //user = await getCurrUser();
    setUser(user);
  };

  React.useEffect(() => {
    init();
  });

  return (
    <div className="">
      <AuthProvider>
        <Layout>
          <BrowserRouter>
            <CheckGlobalAdmin />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/me" element={<WelcomePage />} />
              <Route path="/admin/signin" element={<AdminSignInPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/confirm-email" element={<SignUpConfirmPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/seekers/:username" element={<SeekerDetailPage />} />
              <Route path="/recruiters/:username" element={<RecruiterDetailPage />} />
              <Route path="/job-posting" element={<CreateJobPosting />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/create-recruiter" element={<CreateRecruiter />} />
              <Route path="/create-seeker" element={<CreateSeeker />} />
              <Route path="/recruiters/edit" element={<RecruiterEdit />} />
              <Route path="/seekers/edit" element={<SeekerEdit />} />
              <Route path="/seek-jobs" element={<SeekJobs />} />
              <Route path="/recruiters/dashboard" element={<RecruiterDashboard />} />
              <Route path="/seekers/dashboard" element={<SeekerDashboard />} />
              {/* <Route path="/review-applications" element={<ReviewApplications />} /> */}
              <Route path="/apply-jobs" element={<ApplyJobs />} />
              <Route
                path="/job-postings/:jobPostingId/shortlist"
                element={<ShortlistCandidates />}
              />
              <Route path="/job-postings/:jobPostingId/edit" element={<JobPostingsEdit />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </AuthProvider>
    </div>
  );
}

function CheckGlobalAdmin() {
  const me = React.useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  if (me && me.hasOwnProperty("email")) {
    if (me.role === "ADMIN")
      if (
        !currentPath.startsWith("/admin") &&
        !currentPath.startsWith("/signin") &&
        !currentPath.startsWith("/signup") &&
        !currentPath.startsWith("/logout")
      ) {
        alert("ADMIN can only access admin pages, and the login page");
        navigate("/admin/signin");
        return null;
      }
  }
  return <></>;
}

export default App;
