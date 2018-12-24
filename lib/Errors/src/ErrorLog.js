const fs = require("fs");

class ErrorLog {

    constructor() {
        this.errorLog = "../../../../../storage/logs/error.log";
    }

    writeToLog( string ) {
        var stream = fs.createWriteStream( errorLog );

        stream.once('open', function(fd) {
            stream.write( string) ;
            stream.end();
        });
    }

}

module.exports = ErrorLog;