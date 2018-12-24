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

    query( query, args ) {

        mongodb.connect(url, function(err, db) {
            if (err) throw err;

            var dbo          = db.db("mydb");
            const collection = dbo.collection(this.collectionQuery);

            switch(this.method) {
                case "findOne":// PUT PARAMS AND ALL THAT IN THERE
                    collection.findOne({}, function(err, result) {
                        if (err) throw err;
                        db.close();
                      });

            }

            .findOne({}, function(err, result) {
              if (err) throw err;
              db.close();
            });
          });
    }
}

module.exports = MongoDb;