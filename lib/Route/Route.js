const init = require("../Config/Init");

class Route {

    constructor( app ) {
        this.app = app;
        this.configurationFile = init.readConfiguration();
    }

    Get( stringPath, stringHandler ) {
        const getPath           = this.configurationFile.app.dir,
              getResource       = stringHandler.split("@")[0],
              getMethod         = stringHandler.split("@")[1],
              bootstrap         = getPath[getPath.length - 1] == "/" ? require(`${getPath}bootstrap/bootstrap`) : require(`${getPath}/bootstrap/bootstrap`),
              controllerPath    = bootstrap.controllerDirectory().path;

        var getHandler = 
                /*if*/  getPath[getPath.length - 1] == "/" ?
                    require(`${getPath}${controllerPath}/${getResource}`)
                /*else*/:
                    require(`${getPath}/${controllerPath}/${getResource}`),

            splitStringPath = stringPath.split("/"),
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
            try {
                eval(`getHandler.${getMethod}${args}`);
            } catch (e) {
                throw new Error(`${getHandler.constructor.name}@${getMethod}${args} is not a function!`);
            }
        });  
    }


    Post( stringPath, stringHandler ) {
        const postPath       = this.configurationFile.app.dir,
              postResource   = stringHandler.split("@")[0],
              postMethod     = stringHandler.split("@")[1],
              bootstrap      = require(`${getPath}bootstrap/bootstrap`),
              controllerPath = bootstrap.controllerDirectory().path;

        var postHandler = 
            /*if*/  postPath[postPath.length - 1] == "/" ?
                require(`${postPath}${controllerPath}/${postResource}`)
            /*else*/:
                require(`${postPath}/${controllerPath}/${postResource}`),
        
            splitStringPath = stringPath.split("/"),
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
            try {
                eval(`postHandler.${postMethod}${args}`);
            } catch (e) {
                throw new Error(`${postHandler.constructor.name}@${getMethod}${args} is not a function!`);
            }
        });  

        
    }
}

module.exports = Route;