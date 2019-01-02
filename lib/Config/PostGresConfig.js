var PostGresClass = require("../PostGres/PostGres");

class PostGresConfig {

    constructor() {
        this.PostGres = null;
    }

    // Transale the requested Data Node into a MySQL object
    process( dataString , configurationFile ) {

        const database = eval("configurationFile.database."+dataString);

        if(database == null) {
            throw new Error(`Database For Node ${dataString} Not Found In configure.json`);
        }

        this.PostGres = new PostGresClass(
            database.connection,
            database.host,
            database.port,
            database.database,
            database.username,
            database.password
        );

        return this.PostGres;

    }

}

module.exports = new PostGresConfig();