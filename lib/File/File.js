const fs                = require("fs"),
      formidable        = require('formidable'),
      init              = require("../Config/Init"),
      configurationFile = init.readConfiguration(),
      appDir            = configurationFile.app.dir,
      App               = require("../Config/Config");
      fileType          = require('file-type');

class File {

    constructor() {
        this.name       = null;
        this.type       = null;
        this.path       = null;
        this.size       = null;
        this.filesystem = null;
    }

    /*===========================================
        Return Constructed File From Request Obj
    ============================================*/
    static fromRequest(request, filename) {

        const form = new formidable.IncomingForm();

        form.parse(request);

        var returningFile = new File();

        return new Promise((resolve, reject) => {
            form.on('fileBegin', function(name, file) {
                if(name == filename) { 
                    returningFile.name = name;
                    returningFile.type = file.type;
                    returningFile.path = file.path;
                    returningFile.size = file.size;
                }
            }).on('error', function(e) {
                reject(e);
            }).on('end', function() {
                resolve(returningFile);
            });
        });
    }

    /*===========================================
        Return Constructed File Or Throw Err
    ============================================*/
    static findOrFail(path) {

        if(path[0] == "/")
            path = path.substring(1);

        const filePath  =  appDir[appDir.length - 1] == "/" ?
                /*if*/     appDir+path
                /*else*/: `${appDir}/${path}`;

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

        returnFile.path = filePath;
        returnFile.type = type == null ? null : type.mime;
        returnFile.name = name;
        returnFile.size = fileSizeInBytes;

        return returnFile;

    }

    /*===========================================
        Return File Or Null
    ============================================*/
    static find(path) {



        const filePath  =  appDir[appDir.length - 1] == "/" ?
                /*if*/     appDir+path
                /*else*/: `${appDir}/${path}`;

        if(!fs.existsSync(filePath)) {
            return null;
        }


    }

    /*===========================================
        Changes Name Of File 
    ============================================*/
    rename( name ) {

        var breakPath     = this.path.split("/"),
            fileType      = this.type.split("/")[1],
            stringBuilder = "",
            pathLength    = breakPath.length;

        breakPath.pop();

        breakPath.push(`${name}.${fileType}`);

        breakPath.map((x, i) => {
            stringBuilder += i == pathLength - 1 ? `${x}` : `${x}/`;
        });

        fs.renameSync(`${this.path}`, stringBuilder, (err) => {
            if (err) throw err;
        });

        this.name = name;
        this.path = stringBuilder;

        return this;
    }

    /*===========================================
        Move File To New Directory
    ============================================*/
    move(path) {

        if(path[0] == "/")
            path = path.substring(1);

        if(path[path.length - 1] == "/")
            path = path.substring(0, path.length - 1);

        if(this.filesystem == null) {

            const basePath = appDir[appDir.length - 1] == "/" ?
                /*if*/    appDir+path
                /*else*/: `${appDir}/${path}`;

            const fileType      = this.type.split("/")[1];

            if (!fs.existsSync(basePath))
                fs.mkdirSync(basePath);

            fs.renameSync(`${this.path}`, `${basePath}/${this.name}.${fileType}`, (err) => {
                if(err) throw err;
            });

            this.path = `${basePath}/${this.name}.${fileType}`;

        } else {

            var system = eval(`configurationFile.filesystem.${this.filesystem}`);

            if(system == null)
                throw new Error(`Configuration File System ${this.filesystem} Not Found In configure.json`);

            console.log(system);

            var systemPath = system.path;

            if(systemPath[0] == "/")
                systemPath = systemPath.substring(1);

            const   fileType      = this.type.split("/")[1],
                    relativePath  = systemPath[systemPath.length - 1] == "/" ?
                        /*if*/    `${systemPath}${path}`
                        /*else*/: `${systemPath}/${path}`,
                    finalPath     =  appDir[appDir.length - 1] == "/" ?
                        /*if*/     appDir+relativePath
                        /*else*/: `${appDir}/${relativePath}`;

            // Make sure filesystem's path exists
            if (!fs.existsSync(systemPath))
                fs.mkdirSync(systemPath);

            // Make sure filesystem & the passed in path exist
            if (!fs.existsSync(finalPath))
                fs.mkdirSync(finalPath);

            fs.renameSync(`${this.path}`, `${finalPath}/${this.name}.${fileType}`, (err) => {
                if(err) throw err;
            });

            this.path = finalPath;

        }
    }

    /*===========================================
        Attach Filesystem Obj To File
    ============================================*/
    use(filesystem) {

        this.filesystem = filesystem;

        return this;

    }


}

module.exports = File;