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
            database.database,
            database.username,
            database.password,
            database.url
        );

        return this.MongoDb.query();

    }

}

module.exports = new MongoDbConfig();