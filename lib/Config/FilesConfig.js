var FileSystem = require("../FileSystem/FileSystem");

class FilesConfig {

    constructor() {
        this.Files = null;
    }

    /*================================================
        Constructs A FileSystem Class From Data Source
    =================================================*/
    process( dataString , configurationFile ) {

        const filesys = eval("configurationFile.filesystem."+dataString);

        if(filesys == null) {
            throw new Error(`File System For Node ${dataString} Not Found in configure.json`);
        }

        this.Files = new FileSystem(
            filesys.type,
            filesys.ref,
            filesys.path,
            dataString
        );

        return this.Files;

    }
}

module.exports = new FilesConfig();