const fs     = require("fs");
var init     = require("../../Config/Init");
const appDir = init.readConfiguration().app.dir;

class ErrorLog {

    constructor() {
        if(appDir[appDir.length - 1] == "/")
            this.errorLog = `${appDir}storage/logs/error.log`;
        else 
            this.errorLog = `${appDir}/storage/logs/error.log`;
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