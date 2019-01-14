const fs        = require("fs"),
      init = require("../Config/Init"),
      parse = require('csv-parse');

class Csv {

    constructor( type, ref, path ) {
        this.CsvMap = null;
        this.type   = type;
        this.ref    = ref;
        this.path   = path;
    }

    /*===========================================
        Verify Type Of File
    ============================================*/
    init() {

        if(!this.verify()) {
            throw new Error("Configuration Is Not A CSV Type!")
        }

    }

    /*===========================================
        Check If Type Is CSV
    ============================================*/
    verify() {
        this.type.toLowerCase() === 'csv' ? true : false;
    }

    /*===========================================
        Return Contents Of CSV File
    ============================================*/
    open( name ) {
        const appDir = init.readConfiguration().app.dir,
              path = appDir[appDir.length - 1] == "/" ?
            /*if*/    `${appDir}${this.path}${name}.csv`
            /*else*/: `${appDir}/${this.path}${name}.csv`;

        if (fs.existsSync(path)) {
            return new Promise(function(resolve) {
                var fileContent = fs.readFileSync(path, {encoding: 'utf8'});
                resolve(fileContent);
            });
        } else {
            throw new Error(`${name} DOES NOT EXIST! File Specified: ${path} Does Not Exist.`)
        }

    }
}

module.exports = Csv;