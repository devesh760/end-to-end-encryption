const crypto = require("crypto");

const generateAESKey = (password, salt) => {
  // Derive the key using PBKDF2
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, "sha256", (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        // Return the derived AES key
        resolve(derivedKey);
      }
    });
  });
};

const checkPassword = async (password, salt, hash) => {
  return generateAESKey(password, Uint8Array(salt)).then((key) => {
    // Compare the derived key with the stored hash
    return crypto.timingSafeEqual(key, Buffer.from(hash, "hex"));
  });
};

module.exports = {
  generateAESKey,
  checkPassword,
};
