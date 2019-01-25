var mongodb = require('mongodb').MongoClient;

class MongoDb {

    constructor( connection,database,username,password,url ) {
        this.connection = connection;
        this.database   = database;
        this.username   = username;
        this.password   = password;
        this.url        = url;
    }

    init() {
        if(this.verify()) {
            
        }
    }

    verify() {
        this.connection.toLowerCase() === 'mongodb' ? true : false;
    }

    query() {

        var MongoClient = require('mongodb').MongoClient;

        return MongoClient.connect(this.url);
    }

}

module.exports = MongoDb;