import { AuthContext } from "../AuthContext";
import commonUtil from "../utils/commonUtil";
import Header from "./Header";
import React from "react";

export default function Layout({ children }) {
  const me = React.useContext(AuthContext);
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
  }, [window.location.href]);

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
