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

        var bootstrap      = require(`${getPath}bootstrap/bootstrap`),
            controllerPath = bootstrap.controllerDirectory().path;

        var getHandler;

        if(getPath[getPath.length - 1] == "/")
            getHandler = require(`${getPath}${controllerPath}/${getResource}`);
        else
        getHandler = require(`${getPath}/${controllerPath}/${getResource}`);

        this.app.get(stringPath, function(req, res){
            eval(`getHandler.${getMethod}(req,res)`);
        });  
    }


    Post( stringPath, stringHandler ) {
        const postPath     = this.configurationFile.app.dir,
              postResource = stringHandler.split("@")[0],
              postMethod   = stringHandler.split("@")[1];

        var bootstrap      = require(`${getPath}bootstrap/bootstrap`),
            controllerPath = bootstrap.controllerDirectory().path;

        var postHandler;
        
        if(postPath[postPath.length - 1] == "/")
            postHandler = require(`${postPath}${controllerPath}/${postResource}`);
        else
            postHandler = require(`${postPath}/${controllerPath}/${postResource}`);

        this.app.post(stringPath, function(req, res){
            eval(`postHandler.${postMethod}(req,res)`);
        });  

        
    }
}

module.exports = Route;