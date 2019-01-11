const fs = require("fs");
var init = require("../../Config/Init");

class Structure {

    constructor() {
        this.configurationFile = init.readConfiguration();
        this.appDir            = this.configurationFile.app.dir;
    }

    link(pathOne, pathTwo) {

        var finalPathOne,
            finalPathTwo;

        if(this.appDir[this.appDir.length - 1] == "/") {
            finalPathOne = `${this.appDir}${pathOne}`;
            finalPathTwo = `${this.appDir}${pathTwo}`;
        } else {
            finalPathOne = `${this.appDir}/${pathOne}`;
            finalPathTwo = `${this.appDir}/${pathTwo}`;
        }

        if(!fs.existsSync(finalPathOne)) {

            fs.mkdirSync(finalPathOne);

        }

        fs.symlink(finalPathOne, finalPathTwo, function(err) {
            if(err) {
                console.log(`${err}`);
                console.log("Closing Conduct...");
                process.exit();
            } else {
                console.log("Symlink Created!")
            }
        });

        var configFilePath;

        if(this.appDir[this.appDir.length - 1] == "/") {
            configFilePath = `${this.appDir}configure.json`;
        } else {
            configFilePath = `${this.appDir}/configure.json`;
        }

        fs.readFile(configFilePath, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(`ERROR: ${err}`);
                console.log("Closing Conduct...");
                process.exit();
            } else {
                var obj = JSON.parse(data); //now it's an object

                obj.data.public_file_system = {
                    type: "files"
                }

                obj.filesystem.public_file_system = {
                            type: "files",
                            ref: "public",
                            path: `/${pathTwo}`
                }

                var json = JSON.stringify(obj, null, 2); //convert it back to json
                fs.writeFile(configFilePath, json, 'utf8', function(err) {
                    if(err) {
                        throw err;
                    }
                }); // write it back 
                
                console.log("configure.json updated!")
        }});

    }

}

module.exports = new Structure();