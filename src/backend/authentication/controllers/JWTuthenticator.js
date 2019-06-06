let TokenAuthenticator = require("./tokenAuthenticator");
/**
 * @class JWTAuthenticator
 * decodes and signs jwt tokens assymetrically
 */
class JWTAuthenticator extends TokenAuthenticator{
    /**
     * contructor, creates the authenticator
     * @param {String} algorithm 
     * @param {KeyHolder} publicKeyholder 
     * @param {KeyHolder} privateKeyholder 
     * @param {jsonwebtoken} jwt 
     * @param {Object} options 
     */
    constructor(algorithm, publicKeyholder, privateKeyholder, jwt, options){
        super(algorithm);
        this.publicKey = publicKeyholder;
        this.privateKey = privateKeyholder;
        this.jwt = jwt;
        this.options = options
        options.algorithm = this.algorithm;
    }
    /**
     * decodes jwt token with the required options
     * @param {String} token 
     */
    decodeToken(token){
        this.jwt.verify(token, await this.publicKey.getKey(), options, (err, decoded) => {
            if(err)console.log(err);
            else return decoded;
        });
    }
}