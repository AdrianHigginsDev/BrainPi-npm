const fs         = require("fs");
var formidable   = require('formidable');
const FileSystem = require("./lib/FileSystem");

class File {

    constructor() {
        this.originalName = null;
        this.newName      = null;
        this.directory    = null;
    }

    getFromRequest(request, filename) {

        this.originalName  = filename;

        this.requestObject = request;

        return this;

    }

    rename( newName ) {

        this.newName = newName;

        return this;
    }

    setDirectory( path ) {

        this.directory = path;

        return this;

    }

    store() {

        const CARRY_FILE = this;

        var form = new formidable.IncomingForm();

        form.parse(this.requestObject);

        form.on('fileBegin', function(name, file) {

            if(name == CARRY_FILE.originalName) {

                if(CARRY_FILE.newName == null) {

                    var fileName = file.name.split(".")[0]; // Prevent extension inclusion.

                    CARRY_FILE.name = fileName;

                  }
        
                  // Add their prefered extension
                  CARRY_FILE.name += `.${(file.type.split("/"))[1]}`;

                  // FIND STORAGE DIR FROM CONFIG

                  // SET IT
                  

            }

        })



    }

}

module.exports = File;