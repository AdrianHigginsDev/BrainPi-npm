var mongodb = require('mongodb').MongoClient;
var QueryBuilder = require("./QueryBuilder/QueryBuilder");

class MongoDb extends QueryBuilder {

    constructor( connection,host,port,database,username,password ) {
        super();
        this.connection = connection;
        this.host       = host;
        this.port       = port;
        this.database   = database;
        this.username   = username;
        this.password   = password;
    }

    init() {
        if(this.verify()) {
            
        }
    }

    verify() {
        this.connection.toLowerCase() === 'mongodb' ? true : false;
    }
}

module.exports = MongoDb;