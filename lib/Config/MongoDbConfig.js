var MongoDbClass = require("../MongoDb/MongoDb");

class MongoDbConfig {

    constructor() {
        this.MongoDb = null;
    }

    // Transale the requested Data Node into a MongoDb object
    process( dataString , configurationFile ) {

        const database = eval("configurationFile.database."+dataString);

        if(database == null) {
            throw new Error(`File System For Node ${dataString} Not Found in configure.json`);
        }

        this.MongoDb = new MongoDbClass(
            database.connection,
            database.host,
            database.port,
            database.database,
            database.username,
            database.password
        );

        return this.MongoDb;

    }

}

module.exports = new MongoDbConfig();