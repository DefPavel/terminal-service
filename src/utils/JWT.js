require('dotenv').config();

const secret = process.env.JWT_KEY;
const base64url = require('base64url');
const crypto = require('crypto');

class JWT {
  // eslint-disable-next-line class-methods-use-this
  createToken = (payload) => {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const signature = base64url(JSON.stringify(header)) + '.' + base64url(JSON.stringify(payload));

    return (
      base64url(JSON.stringify(header)) +
      '.' +
      base64url(JSON.stringify(payload)) +
      '.' +
      base64url(crypto.createHmac('sha256', secret).update(signature).digest())
    );
  };

  // eslint-disable-next-line class-methods-use-this
  getPayload = (token) => {
    const tokenPayload = token.split('.')[1];
    return JSON.parse(base64url.decode(tokenPayload));
  };

  // eslint-disable-next-line class-methods-use-this
  CheckJWT = (token) => {
    const header = token.split('.')[0];
    const payload = token.split('.')[1];
    const signature = token.split('.')[2];

    let newSignature = header + '.' + payload;

    newSignature = base64url(crypto.createHmac('sha256', secret).update(newSignature).digest());

    return signature === newSignature;
  };
}

module.exports = JWT;