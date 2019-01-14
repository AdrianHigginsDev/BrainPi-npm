const fs        = require("fs");
var init        = require("../Config/Init");
const appDir    = init.readConfiguration().app.dir;
var File        = require("../File/File");

class FileSystem {

    constructor( type, ref, path, identification ) {
        this.identification = identification;
        this.type           = type;
        this.ref            = ref;
        this.path           = path;
    }


    /*===========================================
        Verify This Is A Filesystem
    ============================================*/
    init() {

        if(!this.verify()) {
            throw new Error("FileSystem Type Does Not Equal Files In Your Configuration!")
        }

    }

    /*===========================================
        Verify Type Of
    ============================================*/
    verify() {
        this.type.toLowerCase() === 'files' ? true : false;
    }

    /*===========================================
        Find File Or Throw Error, Return File
    ============================================*/
    findOrFail(path) {

        if(path[0] == "/")
            path = path.substring(1);
        if(this.path[0] == "/")
            this.path = this.path.substring(1);

        const directoryPath = appDir[appDir.length - 1] == "/" ?
                /*if*/    appDir+this.path
                /*else*/: `${appDir}/${this.path}`,

              filePath  =  directoryPath[directoryPath.length - 1] == "/" ?
                /*if*/     directoryPath+path
                /*else*/: `${directoryPath}/${path}`;

        if(!fs.existsSync(filePath)) {
            throw new Error(`${filePath} Does Not Exist!`);
        }

        const readFile        = fs.readFileSync(filePath),
              type            = fileType(readFile),
              stats           = fs.statSync(filePath),
              fileSizeInBytes = stats.size,
              filePathSplit   = filePath.split("/"),
              name            = filePathSplit[filePathSplit.length - 1];


        var returnFile = new File();

        returnFile.path       = filePath;
        returnFile.type       = type == null ? null : type.mime;
        returnFile.name       = name;
        returnFile.size       = fileSizeInBytes;
        returnFile.filesystem = this.identification;

        return returnFile;

    }


}

module.exports = FileSystem;