import React from "react";
import { confirmEmail, getUsersByFilter } from "../client";
import commonUtil from "../../utils/commonUtil";

export default function SignUpConfirmPage() {
  React.useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    if (token) confirmTokenHandler(token);
  }, []);

  const confirmTokenHandler = async (token) => {
    let claims = await confirmEmail(token);
    if (claims) {
      let loggedIns = await getUsersByFilter(new URLSearchParams(`emails=${claims.email}`));
      if (loggedIns) {
        const loggedIn = loggedIns[0];
        commonUtil.setLoginToken(loggedIn.id, token);
        window.location.href = "/me";
      }
    }
  };

  return <div>Validating...</div>;
}
