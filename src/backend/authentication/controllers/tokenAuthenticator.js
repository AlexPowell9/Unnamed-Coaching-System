/**
 * @class TokenAuthenticator
 * defines an object for verifying authentication tokens
 */
class TokenAuthenticator{
    constructor(algorithm){
        this.algorithm = algorithm;
    }
    decodeToken(token){
        throw "method not defined"
    }
    signToken(token){
        throw "method not defined"
    }
}
module.exports = TokenAuthenticator;

auth = {
    jwt: require("jsonwebtoken"),
    /**
     * gets jwt token from authorization header
     * @param {String} authorizationHeader
     * the authorization header from the request body
     */
    extractJWT: (authorizationHeader) => {
        return authorizationHeader.split(" ")[1];
    },
    decodeJWT: (token) => {
        jwt.decode()
    }
}