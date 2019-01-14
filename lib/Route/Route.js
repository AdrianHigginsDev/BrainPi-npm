const init = require("../Config/Init"),
      fs   = require("fs");

class Route {

    constructor( app ) {
        this.app               = app;
        this.configurationFile = init.readConfiguration();
        this.appDir            = this.configurationFile.app.dir,
        this.middlewarePath    = this.appDir[this.appDir.length - 1] == "/" ?
                                    /*if*/    `${this.appDir}app/controllers/middleware`
                                    /*else*/: `${this.appDir}/app/controllers/middleware`;
    }

    /*===========================================
        Allows HTTP GET Request To Specified Path

        Taking a Controller@Function As Well As

        An Optional Array of Middleware Class
    ============================================*/
    Get( stringPath, stringHandler, optionalMiddleware ) {


        if(typeof optionalMiddleware != "undefined") {

            for(let i in optionalMiddleware) {

                if(!fs.existsSync(`${this.middlewarePath}/${optionalMiddleware[i]}.js`)) {
                    throw new Error(`No Middleware Found At ${this.middlewarePath}/${optionalMiddleware[i]}`)
                }

                const middlewareClass = require(`${this.middlewarePath}/${optionalMiddleware[i]}.js`),
                      middleware      = new middlewareClass();

                this.app.get(stringPath, function(req, res, next) {
                    middleware.route(req, res, next)
                })
            }
        }


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

        this.app.get(stringPath, function(req, res, next){
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

    /*===========================================
        Allows An HTTP POST Request On Specified

        Path, Which Takes A Controller@Function

        And An Optional Array Of Middleware Class
    ============================================*/
    Post( stringPath, stringHandler, optionalMiddleware ) {


        if(typeof optionalMiddleware != "undefined") {
            for(let i in optionalMiddleware) {
                this.app.use(stringPath, function(req, res, next) {
                    next();
                })
            }
        }


        const postPath       = this.configurationFile.app.dir,
              postResource   = stringHandler.split("@")[0],
              postMethod     = stringHandler.split("@")[1],
              bootstrap      = postPath[postPath.length - 1] == "/" ? require(`${postPath}bootstrap/bootstrap`) : require(`${postPath}/bootstrap/bootstrap`),
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


        this.app.post(stringPath, function(req, res, next){
            var args = "(req,res";
            for(let i in variables) {
                args += `,'${eval("req.params."+variables[i])}'`;
            }
            args += ")";
            try {
                eval(`postHandler.${postMethod}${args}`);
            } catch (e) {
                throw e;
                // throw new Error(`Error in ${postHandler.constructor.name}@${postMethod}${args}!`);
            }
        });  

        
    }
}

module.exports = Route;