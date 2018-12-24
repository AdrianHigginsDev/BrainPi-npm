const init = require("../Config/Init");

class Route {

    constructor( app ) {
        this.app = app;
        this.configurationFile = init.readConfiguration();
    }

    Get( stringPath, stringHandler ) {
        const getPath           = this.configurationFile.app.dir,
              getResource       = stringHandler.split("@")[0],
              getMethod         = stringHandler.split("@")[1];

        var getHandler;

        if(getPath[getPath.length - 1] == "/")
            getHandler = require(`${getPath}controllers/${getResource}`);
        else
        getHandler = require(`${getPath}/controllers/${getResource}`);

        this.app.get(stringPath, function(req, res){
            eval(`getHandler.${getMethod}(req,res)`);
        });  
    }


    Post( stringPath, stringHandler ) {
        const postPath     = this.configurationFile.app.dir,
              postResource = stringHandler.split("@")[0],
              postMethod   = stringHandler.split("@")[1];

        var postHandler;
        
        if(postPath[postPath.length - 1] == "/")
            postHandler = require(`${postPath}controllers/${postResource}`);
        else
            postHandler = require(`${postPath}/controllers/${postResource}`);

        this.app.post(stringPath, function(req, res){
            eval(`postHandler.${postMethod}(req,res)`);
        });  

        
    }
}

module.exports = Route;