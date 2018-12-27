const fs        = require("fs");
var init        = require("../Config/Init");
const appDir    = init.readConfiguration().app.dir;
var File        = require("../File/File");

class FileSystem {

    constructor( type, ref, path ) {
        this.CsvMap = null;
        this.type   = type;
        this.ref    = ref;
        this.path   = path;
    }

    /*
        Keep In Mind That This Should Be Able To Access
        The Public File System Made Via Conduct If Made
    */

    init() {

        if(!this.verify()) {
            throw new Error("FileSystem Type Does Not Equal Files In Your Configuration!")
        }

    }

    verify() {
        this.type.toLowerCase() === 'files' ? true : false;
    }

    findFile( name ) {

    }


}

module.exports = FileSystem;