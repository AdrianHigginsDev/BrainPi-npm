var MySqlClass = require("../MySql/MySql");

class MySqlConfig {

    constructor() {
        this.MySql = null;
    }

    // Transale the requested Data Node into a MySQL object
    process( dataString , configurationFile ) {

        const database = eval("configurationFile.database."+dataString);

        if(database == null) {
            throw new Error(`Database For Node ${dataString} Not Found In configure.json`);
        }

        this.MySql = new MySqlClass(
            database.connection,
            database.host,
            database.port,
            database.database,
            database.username,
            database.password
        );

        return this.MySql;

    }

}

module.exports = new MySqlConfig();