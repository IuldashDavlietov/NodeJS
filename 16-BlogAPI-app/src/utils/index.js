// https://nodejs.org/docs/latest/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
const { pbkdf2Sync } = require('node:crypto');

const salt = process.env.SECRET_KEY;
const iterations = 10000;
const keylen = 32; // write 32 for 64
const digest = 'sha512';

const passwordEncrypte = function (password) {
    // in node envirovment
    // require('crypto').randomBytes(32).toString('hex')  -> salt
    return pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
}
module.exports = { passwordEncrypte }