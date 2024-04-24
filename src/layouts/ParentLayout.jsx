import React from "react";
import commonUtil from "../utils/commonUtil";
import Header from "./Header";

export default function Layout({ children }) {
  let [allowAccess, setAllowAccess] = React.useState(false);

  const checkLogin = async () => {
    if (window.location.pathname.startsWith("/me")) {
      const tokens = commonUtil.getLoginTokens();
      if (!tokens || tokens.length === 0) {
        return;
      }
    }

    setAllowAccess(true);
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div>
      {allowAccess === true ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <div className="p-2">
          Sigin required. Please <a href="/signin">Sigin</a> to access.
        </div>
      )}
    </div>
  );
}
