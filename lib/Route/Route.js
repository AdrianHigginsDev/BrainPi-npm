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

        var   bootstrap         = getPath[getPath.length - 1] == "/" ? require(`${getPath}bootstrap/bootstrap`) : require(`${getPath}/bootstrap/bootstrap`),
              controllerPath    = bootstrap.controllerDirectory().path;

        var getHandler;

        if(getPath[getPath.length - 1] == "/")
            getHandler = require(`${getPath}${controllerPath}/${getResource}`);
        else
        getHandler = require(`${getPath}/${controllerPath}/${getResource}`);

        var splitStringPath = stringPath.split("/"),
            variables = [];

        for(let i in splitStringPath) {
            if(splitStringPath[i][0] == ":") {
                variables.push(splitStringPath[i].substr(1));
            }
        }

        this.app.get(stringPath, function(req, res){
            var args = "(req,res";
            for(let i in variables) {
                args += `,'${eval("req.params."+variables[i])}'`;
            }
            args += ")";
            eval(`getHandler.${getMethod}${args}`);
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


        var splitStringPath = stringPath.split("/"),
        variables = [];

        for(let i in splitStringPath) {
            if(splitStringPath[i][0] == ":") {
                variables.push(splitStringPath[i].substr(1));
            }
        }


        this.app.post(stringPath, function(req, res){
            var args = "(req,res";
            for(let i in variables) {
                args += `,'${eval("req.params."+variables[i])}'`;
            }
            args += ")";
            eval(`postHandler.${postMethod}${args}`);
        });  

        
    }
}

module.exports = Route;