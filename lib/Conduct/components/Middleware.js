/*===========================================
  Creates A Controller Scaffold File
============================================*/

module.exports = function create(className) {
    const fs                = require('fs'),
          init              = require("../../Config/Init"),
          configurationFile = init.readConfiguration(),
          appDir            = configurationFile.app.dir,
          bootstrap         = appDir[appDir.length - 1] == "/" ? require(`${appDir}bootstrap/bootstrap`) : require(`${appDir}/bootstrap/bootstrap`),
          middlewarePath    = bootstrap.middlewareDirectory().path;

    if(fs.existsSync(`./${middlewarePath}/${className}.js`)) {
        console.log(`${className} already exists!`);
        console.log("Closing Conduct...");
        process.exit();
    }

    const fileContents = `const { Middleware } = require('brainpi'); \n\n`
          + `class ${className} extends Middleware\n`
          + `{\n`
          + `    constructor()\n`
          + `    {\n`
          + `        super();\n`
          + `    }\n\n`
          + `    /*=================================\n`
          + `       Called In Middleware\n`
          + `    ==================================*/\n`
          + `    check(request, response, next)\n`
          + `    {\n`
          + `        // TO-DO\n`
          + `    }\n\n`
          + `    /*=================================\n`
          + `       Rejection Process\n`
          + `    ==================================*/\n`
          + `    reject(request, response)\n`
          + `    {\n`
          + `        // TO-DO\n`
          + `    }\n\n`
          + `}\n\n`
          + `module.exports = ${className};`;

    fs.writeFile(`./${middlewarePath}/${className}.js`, fileContents, (err) => {
      if (err)  {
        console.log(err);
        console.log("Closing Conduct...");
        process.exit();
      }
      
      console.log(`New Middleware: ${className}`);
    });
}