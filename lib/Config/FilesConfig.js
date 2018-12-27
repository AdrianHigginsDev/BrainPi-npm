var FileSystem = require("../FileSystem/FileSystem");

class FilesConfig {

    constructor() {
        this.Files = null;
    }

    process( dataString , configurationFile ) {

        const filesys = eval("configurationFile.filesystem."+dataString);

        if(filesys == null) {
            throw new Error(`File System For Node ${dataString} Not Found in configure.json`);
        }

        this.Files = new FileSystem(
            filesys.type,
            filesys.ref,
            filesys.path
        );

        return this.Files;

    }
}

module.exports = new FilesConfig();