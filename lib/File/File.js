const fs                = require("fs"),
      formidable        = require('formidable'),
      init              = require("../Config/Init"),
      configurationFile = init.readConfiguration(),
      appDir            = configurationFile.app.dir,
      App               = require("../Config/Config");

class File {

    constructor() {
        this.originalName  = null;
        this.name          = null;
        this.directory     = null;
        this.requestObject = null;

    }

    getFromRequest(request, filename) {

        this.originalName  = filename;

        this.requestObject = request;

        return this;

    }

    rename( name ) {

        this.name = name;

        return this;
    }

    setDirectory( path ) {

        this.directory = path;

        return this;

    }

    filesystem( name ) {

        this.directory = App.load(name).path;

        return this;

    }

    store() {

        const CARRY_FILE = this;

        var form = new formidable.IncomingForm();

        form.parse(this.requestObject);

        form.on('fileBegin', function(name, file) {

            if(name == CARRY_FILE.originalName) {

                var finalName;
                if(CARRY_FILE.name == null) {

                    var fileName = file.name.split(".")[0]; // Prevent extension inclusion.

                    finalName = fileName;

                } else {
                    finalName = CARRY_FILE.name;
                }
        
                // Add their prefered extension
                finalName += `.${(file.type.split("/"))[1]}`;

                if(this.directory == null) {
                    throw new Error("Unspecified Directory For File! Please Use 'setDirectory()' or 'filesystem()!");
                }

                var finalPath;
                if(appDir[appDir.length - 1] == "/") 
                    finalPath = `${appDir}${this.directory}`;
                else 
                    finalPath = `${appDir}/${this.directory}`;

                if(!fs.existsSync(finalPath)) {

                    fs.mkdirSync(finalPath);

                }
                  
                file.path = finalPath + finalName;  
            }

        })



    }

}

module.exports = File;