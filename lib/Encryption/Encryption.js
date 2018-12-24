const hex    = require("./src/hex");
const crypto = require('crypto');

class Encryption {

    constructor() {
        this.hex       = hex;
        this.crypto    = crypto;
        this.algorithm = 'aes-192-cbc';
        this.key       = 'x1m1l1b3m38fn8hwdfhk4h23rhf3jf43fhf4hfk4hf20fbab';
    }

    encrypt( string ) {
        var cipherKey = this.crypto.createCipher(this.algorithm, this.key);
        var finalKey  = cipherKey.update(string, 'utf8', 'hex'); 
        finalKey      += cipherKey.final('hex');

        return finalKey;
    }


}

module.exports = new Encryption();