const init          = require("./Init"),
      MySqlConfig   = require("./MySqlConfig"),
      CsvConfig     = require("./CsvConfig"),
      MongoDbConfig = require("./MongoDbConfig");

class Config {

    constructor() {
        this.configurationFile = init.readConfiguration();
    }

    load( dataString ) {
        var dataType = eval("this.configurationFile.data."+dataString).type;

        if(dataType == null) {
            throw new Error(`${dataString} Not Found In configure.json`)
        }

        switch( dataType.toLowerCase() ) {

            case 'mysql': {
                return this.handleMySql( dataString );
            }
            case 'mongodb': {
                return this.handleMongoDb( dataString );
            }
            case 'csv': {
                return this.handleCsv( dataString );
            }
            default: {
                throw new Error(`${dataType} Is An Invalid Data Type On Node ${dataString}`);
            }
        }
    }

    handleMySql( dataString ) {

        const MySql = MySqlConfig.process( dataString , this.configurationFile );

        return MySql;

    }

    handleCsv( dataString ) {

        const Csv = CsvConfig.process( dataString , this.configurationFile );

        return Csv;

    }

    handleMongoDb( dataString ) {

        const MongoDb = MongoDbConfig.process( dataString , this.configurationFile );

        return MongoDb;
        
    }
}

module.exports = new Config();