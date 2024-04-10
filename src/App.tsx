import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { decryptResponse } from "./utils/decryptorUtil";
import { getTopCompanies } from "./externalApis/levelsFyiClient";

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          <button onClick={() => testApiCall()}>Click me</button>
        </p>
      </header>
    </div>
  );
}

export default App;
