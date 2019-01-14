const fs     = require("fs"),
      init     = require("../Config/Init"),
      appDir = init.readConfiguration().app.dir;

class Controller {

    constructor() {
        if(appDir[appDir.length - 1] == "/")
            this.middlewarePath = `${appDir}app/controllers/middleware`;
        else 
            this.middlewarePath = `${appDir}/app/controllers/middleware`;
    }

    /*===========================================
        Loads Middleware Class
    ============================================*/
    middleware(name) {

        if(!fs.existsSync(`${this.middlewarePath}/${name}.js`)) {
            throw new Error(`Middleware Not Found! At: ${this.middlewarePath}/${this.name}.js`);
        }

        const middlewareClass = require(`${this.middlewarePath}/${name}`),
              middleware      = new middlewareClass();

        return middleware;

    }

}

module.exports = Controller;