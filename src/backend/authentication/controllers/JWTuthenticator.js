let TokenAuthenticator = require("./tokenAuthenticator");
/**
 * @class JWTAuthenticator
 * decodes and signs jwt tokens assymetrically
 */
class JWTAuthenticator extends TokenAuthenticator{
    /**
     * contructor, creates the authenticator
     * @param {String} algorithm 
     * algorithm to use for signing and decoding
     * 
     * @param {KeyHolder} publicKeyholder 
     * holds onto the public key
     * 
     * @param {KeyHolder} privateKeyholder 
     * holds onto the private key
     * 
     * @param {jsonwebtoken} jwt 
     * jsonwebtoken library, allows for dependancy injection by passing in
     */
    constructor(algorithm, publicKeyholder, privateKeyholder, jwt){
        super(algorithm);
        this.publicKey = publicKeyholder;
        this.privateKey = privateKeyholder;
        this.jwt = jwt;
    }
    /**
     * decodes jwt token with the required options
     * @param {String} token 
     * token string to decode
     */
    decodeToken(token, options){
        if(!options.algorithm)options.algorithm = [this.algorithm];
        else options.algorithm.push(this.algorithm);
        this.jwt.verify(token, await this.publicKey.getKey(), options, (err, decoded) => {
            if(err){
                console.log(err);
                return null;
            }
            else {
                return decoded;
            }
        });  
    }
    /**
     * Signs a token with the specified options
     * @param {Object} token 
     * token string to decode
     * 
     * @param {Object} options 
     * options for the token
     */
    signToken(token, options){
        if(!options.algorithm)options.algorithm = this.algorithm;
        this.jwt.sign(token, await this.privateKey.getKey(), options, (err, signed) => {
            if(err){
                console.log(err);
                return null;
            }
            else {
                return signed;
            }
        })
    }
}