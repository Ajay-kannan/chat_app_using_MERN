var CryptoJS = require("crypto-js");

export const DoEncrypt = (text, key) => {
  try {
    var encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
  } catch (err) {
    console.log(err);
  }
};

export const DoDecrypt = (cipher, key) => {
  try {
    var bytes = CryptoJS.AES.decrypt(cipher, key);
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (err) {
    console.error(err);
  }
};
