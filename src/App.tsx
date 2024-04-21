import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { decryptResponse } from "./utils/decryptorUtil";
import { getTopCompanies } from "./externalApis/levelsFyiClient";
import { Route, Routes } from "react-router-dom";
import Welcome from "./users/Welcome";
import SignIn from "./users/SignIn";
import SignUp from "./users/SignUp";
import ForgotPassword from "./users/ForgotPassword";
import CreateRecruiter from "./recruiters/CreateRecruiter";
import CreateSeeker from "./seekers/CreateSeeker";

import CreateJobPosting from "./jobPostings/jobPosting";


function App() {
  const test = () => {
    let payload =
      "PGF/4hzKuy89+4RiRL0I/FNOde3SCoZvSJHnCnvdPtOUbWkCh9LrNVXSDDUkchmE8HR9MUYeGpTAv9LCp6fVDjdQXuezZQk2bR4yWFP9PktIuKqngYCnSibUlz1ZzwlAeW3GWyFWLHRYKR5r5qMjqIQnT2Z3xL53sq9crdRlrH5yR2Kk05xid8/fdQvMQFKUnc81BZD8z70nRBfMplORE7nBrArCKiNPXN43E6+GVzM=";

    console.log(decryptResponse({ payload: payload }));
  };

  const testApiCall = async () => {
    const res = await getTopCompanies();
    console.log(res);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jobPosting" element={< CreateJobPosting/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-recruiter" element={<CreateRecruiter />} />
        <Route path="/create-seeker" element={<CreateSeeker />} />
      </Routes>
    </div>
  );
}

export default App;
