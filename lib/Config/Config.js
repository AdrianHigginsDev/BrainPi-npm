const init           = require("./Init"),
      MySqlConfig    = require("./MySqlConfig"),
      CsvConfig      = require("./CsvConfig"),
      MongoDbConfig  = require("./MongoDbConfig"),
      PostGresConfig = require("./PostGresConfig");
      FilesConfig    = require("./FilesConfig");

class Config {

    constructor() {
        this.configurationFile = init.readConfiguration();
    }

    /*===========================================
        Loads Data Source Classes, Pre-Built
    ============================================*/
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
            case 'files': {
                return this.handleFiles( dataString );
            }
            case 'postgres': {
                return this.handlePostGres( dataString );
            }
            default: {
                throw new Error(`${dataType} Is An Invalid Data Type On Node ${dataString}`);
            }
        }
    }

    /*===========================================
        Returns Configured MySQL Class
    ============================================*/
    handleMySql( dataString ) {

        const MySql = MySqlConfig.process( dataString , this.configurationFile );

        return MySql;

    }

    /*===========================================
        Returns Configured CSV Class
    ============================================*/
    handleCsv( dataString ) {

        const Csv = CsvConfig.process( dataString , this.configurationFile );

        return Csv;

    }

    /*===========================================
        Returns Mongo Class
    ============================================*/
    handleMongoDb( dataString ) {

        const MongoDb = MongoDbConfig.process( dataString , this.configurationFile );

        return MongoDb;
        
    }

    /*===========================================
        Returns Configured FileSystem Class
    ============================================*/
    handleFiles( dataString ) {

        const Files = FilesConfig.process( dataString, this.configurationFile );

        return Files;

    }
    
    /*===========================================
        Returns Configured PostGre Class
    ============================================*/
    handlePostGres( dataString ) {
        const PostGres = PostGresConfig.process( dataString , this.configurationFile );

        return PostGres;
    }
}

module.exports = new Config();