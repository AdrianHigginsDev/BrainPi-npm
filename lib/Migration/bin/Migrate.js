var init = require("../../Config/Init");
var fs   = require("fs");
var config  = require("../../Config/Config");
const Table = require("../src/Table");

class Migration {

    constructor() {
        this.configurationFile = init.readConfiguration();
        this.appDir            = this.configurationFile.app.dir;
    }

    /*===========================================
        Runs the Query Returned From Migration
        File's Up() Function
    ============================================*/
    migrate() {

        var files = [],
            finalPath = this.appDir[this.appDir.length -1] == "/" ?
                /*if*/    finalPath = this.appDir + "migrations"
                /*else*/: finalPath = this.appDir + "/migrations";

        fs.readdirSync(finalPath).forEach(file => {

            if(file != ".gitignore") {
                file = file.substring(0, file.length - 3);

                const migration   = require(`${finalPath}/${file}`),
                      queryString = migration.up(new Table()),
                      typeAndNode = this.connector(migration);

                if(queryString == null) {
                    console.log("Error: Query Undefined!");
                    console.log("Please Make Sure You're Returning The Create() Function in your Up() Function!")
                    console.log("Closing Conduct...");
                    process.exit();
                }

                switch(typeAndNode[0]) {
                    case "mysql"   :
                    case "postgres":
                        config.load(typeAndNode[1]).query(queryString).then(results => {
                            console.log("Migrations Made!");
                            process.exit();
                        });
                        break;

                    default:
                        console.log(`Error: ${typeAndNode[0]} is not a valid Data Type!`);
                        console.log("Closing Conduct...");
                        process.exit();
                }
            }
        })


    }

    /*===========================================
        Allows Migrator To Find Database
    ============================================*/
    connector(migrator) {
        
        const prop                = migrator.props == null ? null : migrator.props(),
              configurationData   = init.readConfiguration(),
              databases           = configurationData.database;

        var database,
            databaseName;
                
        if(prop == null && Object.keys(databases).length > 1)
            throw new Error(`Migrations require a specified database via 'static props()' function when configure.json has more than one configured!`);

        else if(prop == null && Object.keys(databases).length == 1) {
            databaseName = Object.keys(databases)[0];
            database     = eval("configurationData.database."+databaseName);
        }

        else if(Object.keys(databases).length < 1)
            throw new Error("No databases configured in configure.json!");
        
        else {
            databaseName = prop.data;
            database     = eval("configurationData.database."+databaseName);
        }

        const type = database.connection;

        return [type.toLowerCase(), databaseName];

    }

}

module.exports = new Migration();