const fs     = require("fs");
var init     = require("../Config/Init");
const appDir = init.readConfiguration().app.dir;

class ErrorLog {

    constructor() {
        if(appDir[appDir.length - 1] == "/")
            this.errorLog = `${appDir}storage/logs/error.log`;
        else 
            this.errorLog = `${appDir}/storage/logs/error.log`;
    }

    /*===========================================
        Allows Us To Write Errors To Our Log
    ============================================*/
    write( stack ) {
        var fd = fs.openSync(this.errorLog, 'a');
        fs.appendFileSync(fd, `\n${stack}`, function (err) {
            if (err) throw err;
        });
    }

}

module.exports = new ErrorLog();