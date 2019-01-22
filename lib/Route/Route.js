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

        var variables = [];

        for(let i in splitStringPath) {
            if(splitStringPath[i][0] == ":") {
                variables.push(splitStringPath[i].substr(1));
            }
        }

        /*====================\
         Middleware Check
        \*====================*/            
        if(typeof optionalMiddleware != "undefined") {

            if(typeof optionalMiddleware == "object") {
                for(let i in optionalMiddleware) {

                    if(!fs.existsSync(`${this.middlewarePath}/${optionalMiddleware[i]}.js`)) {
                        throw new Error(`No Middleware Found At ${this.middlewarePath}/${optionalMiddleware[i]}`)
                    }

                    const middlewareClass = require(`${this.middlewarePath}/${optionalMiddleware[i]}.js`),
                        middleware      = new middlewareClass();

                    
                    

                    this.app.get(stringPath, function(request, response, next) {

                        var args = "(request, response, next";
                        for(let i in variables) {
                            args += `,'${eval("request.params."+variables[i])}'`;
                        }
                        args += ")";
                        eval(`middleware.check${args}`);

                    })
                }
            } else if(typeof optionalMiddleware == "string") {
                if(!fs.existsSync(`${this.middlewarePath}/${optionalMiddleware}.js`)) {
                    throw new Error(`No Middleware Found At ${this.middlewarePath}/${optionalMiddleware}`)
                }
    
                const middlewareClass = require(`${this.middlewarePath}/${optionalMiddleware}.js`),
                      middleware      = new middlewareClass();
    
                this.app.get(stringPath, function(request, response, next) {

                    var args = "(request, response, next";
                    for(let i in variables) {
                        args += `,'${eval("request.params."+variables[i])}'`;
                    }
                    args += ")";
                    eval(`middleware.check${args}`);

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

            splitStringPath = stringPath.split("/");

        if(typeof getHandler.middleware != "undefined") {

            if(!fs.existsSync(`${this.middlewarePath}/${getHandler.middleware}.js`)) {
                throw new Error(`No Middleware Found At ${this.middlewarePath}/${getHandler.middleware}`)
            }

            const middlewareClass = require(`${this.middlewarePath}/${getHandler.middleware}.js`),
                  middleware      = new middlewareClass();

            this.app.get(stringPath, function(request, response, next) {

                var args = "(request, response, next";
                  for(let i in variables) {
                      args += `,'${eval("request.params."+variables[i])}'`;
                  }
                  args += ")";

                eval(`middleware.check${args}`);
            })

        }

        this.app.get(stringPath, function(request, response, next){
            try {
                var args = "(request, response";
                for(let i in variables) {
                    args += `,'${eval("request.params."+variables[i])}'`;
                }
                args += ")";
                eval(`getHandler.${getMethod}${args}`);
            } catch (e) {
                throw e;
                //throw new Error(`${getHandler.constructor.name}@${getMethod}${args} is not a function!`);
            }
        });  
    }

    /*===========================================
        Allows An HTTP POST Request On Specified

        Path, Which Takes A Controller@Function

        And An Optional Array Of Middleware Class
    ============================================*/
    Post( stringPath, stringHandler, optionalMiddleware ) {

        var variables = [];

        for(let i in splitStringPath) {
            if(splitStringPath[i][0] == ":") {
                variables.push(splitStringPath[i].substr(1));
            }
        }

        if(typeof optionalMiddleware != "undefined") {

            if(typeof optionalMiddleware == "object") {
                for(let i in optionalMiddleware) {

                    if(!fs.existsSync(`${this.middlewarePath}/${optionalMiddleware[i]}.js`)) {
                        throw new Error(`No Middleware Found At ${this.middlewarePath}/${optionalMiddleware[i]}`)
                    }

                    const middlewareClass = require(`${this.middlewarePath}/${optionalMiddleware[i]}.js`),
                        middleware      = new middlewareClass();

                    
                    

                    this.app.post(stringPath, function(request, response, next) {

                        var args = "(request, response, next";
                        for(let i in variables) {
                            args += `,'${eval("request.params."+variables[i])}'`;
                        }
                        args += ")";
                        eval(`middleware.check${args}`);

                    })
                }
            } else if(typeof optionalMiddleware == "string") {
                if(!fs.existsSync(`${this.middlewarePath}/${optionalMiddleware}.js`)) {
                    throw new Error(`No Middleware Found At ${this.middlewarePath}/${optionalMiddleware}`)
                }
    
                const middlewareClass = require(`${this.middlewarePath}/${optionalMiddleware}.js`),
                      middleware      = new middlewareClass();
    
                this.app.post(stringPath, function(request, response, next) {

                    var args = "(request, response, next";
                    for(let i in variables) {
                        args += `,'${eval("request.params."+variables[i])}'`;
                    }
                    args += ")";
                    eval(`middleware.check${args}`);

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



        if(typeof postHandler.middleware != "undefined") {

            if(!fs.existsSync(`${this.middlewarePath}/${postHandler.middleware}.js`)) {
                throw new Error(`No Middleware Found At ${this.middlewarePath}/${postHandler.middleware}`)
            }

            const middlewareClass = require(`${this.middlewarePath}/${postHandler.middleware}.js`),
                  middleware      = new middlewareClass();

            this.app.post(stringPath, function(request, response, next) {

                var args = "(request, response, next";
                  for(let i in variables) {
                      args += `,'${eval("request.params."+variables[i])}'`;
                  }
                  args += ")";

                eval(`middleware.check${args}`);
            })

        }


        this.app.post(stringPath, function(request, response, next){
            var args = "(request, response";
            for(let i in variables) {
                args += `,'${eval("request.params."+variables[i])}'`;
            }
            args += ")";
            try {
                var args = "(request, response";
                for(let i in variables) {
                    args += `,'${eval("request.params."+variables[i])}'`;
                }
                args += ")";
                eval(`postHandler.${postMethod}${args}`);
            } catch (e) {
                throw e;
                // throw new Error(`Error in ${postHandler.constructor.name}@${postMethod}${args}!`);
            }
        });  

        
    }
}

module.exports = Route;