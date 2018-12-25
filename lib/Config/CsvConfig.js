var CsvClass = require("../Csv/Csv");

class CsvConfig {

    constructor() {
        this.Csv = null;
    }

    process( dataString , configurationFile ) {

        const filesystem = eval("configurationFile.filesystem."+dataString);

        if(filesystem == null) {
            throw new Error(`File System For Node ${dataString} Not Found in configure.json`);
        }

        this.Csv = new CsvClass(
            filesystem.type,
            filesystem.ref,
            filesystem.path
        );

        return this.Csv;

    }
}

module.exports = new CsvConfig();