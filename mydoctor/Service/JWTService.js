const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_Secret, REFRESH_TOKEN_Secret} = require('../env/index');

class JWTServices{
    static signAccessToken(payload,expiryTime){
        console.log(ACCESS_TOKEN_Secret);
        return jwt.sign(payload,ACCESS_TOKEN_Secret,{expiresIn:expiryTime});
    }
    static signRefreshToken(payload,expiryTime){
        return jwt.sign(payload,REFRESH_TOKEN_Secret,{expiresIn:expiryTime});
    }
    static verifyAccessToken(token){
        return jwt.verify(token,ACCESS_TOKEN_Secret);
    }
    static verifyRefreshToken(token){
        return jwt.verify(token,REFRESH_TOKEN_Secret);
    }
}

module.exports={JWTServices}