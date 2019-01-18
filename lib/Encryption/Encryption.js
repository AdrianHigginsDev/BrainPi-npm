const init   = require("../Config/Init");

class Encryption {

    constructor() {
        this.hex       = require("./lib/hex");
        this.crypto    = require('crypto');
        this.algorithm = 'aes-192-cbc';
        this.key       = init.readConfiguration().app.key;
    }

    verifyKey() {
        if(this.key == null || this.key == "") {
            throw new Error("Application Is Missing A Key!  Run node conduct key:generate To Create One!");
        }
    }

    encrypt( string ) {

        this.verifyKey();

        var cipherKey = this.crypto.createCipher(this.algorithm, this.key);
        var finalKey  = cipherKey.update(string, 'utf8', 'hex'); 
        finalKey     += cipherKey.final('hex');

        return finalKey;
    }

    random() {
        return this.crypto.randomBytes(16).toString("hex");
    }


}

module.exports = new Encryption();