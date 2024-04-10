import CryptoJS from "crypto-js";
import pako from "pako";

function ResponseDecryptor() {
  let e = "levelstothemoon!!";
  let n = 16;
  return {
    parse: function (t) {
      if (!t.payload) return t;
      let r = t.payload,
        a = CryptoJS.MD5(e).toString(CryptoJS.enc.Base64).substring(0, n),
        o = CryptoJS.AES.decrypt(
          {
            ciphertext: CryptoJS.enc.Base64.parse(r),
          },
          CryptoJS.enc.Utf8.parse(a),
          {
            mode: CryptoJS.mode.ECB,
            iv: null,
          }
        ).toString(CryptoJS.enc.Base64),
        i = atob(o)
          .split("")
          .map(function (e) {
            return e.charCodeAt(0);
          }),
        s = pako.inflate(i, {
          to: "string",
        });
      return JSON.parse(s);
    },
  };
}

export function decryptResponse(payload) {
  let util = ResponseDecryptor();
  let result = util.parse(payload);

  return result;
}
