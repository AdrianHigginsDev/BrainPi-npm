var init = require("../../Config/Init");
var fs   = require("fs");
var config  = require("../../Config/Config");

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

        var files = [];

        var finalPath;

        var finalPath;

        if(this.appDir[this.appDir.length -1] == "/") {
            finalPath = this.appDir + "migrations";
        } else {
            finalPath = this.appDir + "/migrations";
        }

        fs.readdirSync(finalPath).forEach(file => {

            file = file.substring(0, file.length - 3);

            var migration   = require(`${finalPath}/${file}`),
                typeAndNode = this.connector(migration);

            const queryString = migration.up();

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
        })


    }

    /*===========================================
        Allows Migrator To Find Database
    ============================================*/
    connector(migrator) {
        
        var prop                = migrator.props();
        const dataNode          = prop.data,
              configurationData = init.readConfiguration(),
              typeNode          = eval("configurationData.data."+dataNode);
                
        if(typeNode == null) {
            console.log(`Error: ${dataNode} Does Not Exist In configure.json!`);
            console.log("Closing Conduct...");
            process.exit();
        }

        const type = typeNode.type;

        if(type == null) {
            console.log(`Error: There is no TYPE defined for data node ${dataNode}!`);
            console.log("Closing Conduct...");
            process.exit();
        }

        return [type.toLowerCase(), dataNode];

    }

}

module.exports = new Migration();