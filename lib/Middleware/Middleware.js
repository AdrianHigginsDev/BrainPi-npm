const init = require("../Config/Init"),
      fs   = require("fs");

class Middleware {

    constructor(app) {
        this.app               = app;
        this.configurationFile = init.readConfiguration();
        this.appDir            = this.configurationFile.app.dir,
        this.middlewarePath    = this.appDir[this.appDir.length - 1] == "/" ?
                                    /*if*/    `${this.appDir}app/controllers/middleware`
                                    /*else*/: `${this.appDir}/app/controllers/middleware`;
    }

    /*===========================================
        Sets Up A Middleware Process To The Route
    ============================================*/
    protect(path, middlewareFile) {
        if(!fs.existsSync(`${this.middlewarePath}/${middlewareFile}.js`)) {
            throw new Error(`No Middleware Found At ${this.middlewarePath}/${middlewareFile}`)
        }

        const middlewareClass = require(`${this.middlewarePath}/${middlewareFile}.js`),
              middleware      = new middlewareClass();

        this.app.get(path, function(req, res, next) {
            middleware.before(req, res, next)
        })
    }

}

module.exports = Middleware;