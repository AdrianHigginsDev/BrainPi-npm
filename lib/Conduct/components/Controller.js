/*===========================================
  Creates A Controller Scaffold File
============================================*/

module.exports = function create(className) {
    const fs                = require('fs'),
          init              = require("../../Config/Init"),
          configurationFile = init.readConfiguration(),
          appDir            = configurationFile.app.dir,
          bootstrap         = appDir[appDir.length - 1] == "/" ? require(`${appDir}bootstrap/bootstrap`) : require(`${appDir}/bootstrap/bootstrap`),
          controllerPath    = bootstrap.controllerDirectory().path;

    if(fs.existsSync(`./${controllerPath}/${className}.js`)) {
      console.log(`${className} already exists!`);
      console.log("Closing Conduct...");
      process.exit();
    }

    const fileContents    = `const { App, Controller } = require('brainpi'); \n\n`
          + `class ${className} extends Controller\n`
          + `{\n`
          + `    constructor()\n`
          + `    {\n`
          + `        super();\n`
          + `    }\n\n`
          + `    index(request, response)\n`
          + `    {\n`
          + `        // TO-DO\n`
          + `    }\n\n`
          + `}\n\n`
          + `module.exports = new ${className}();`;

    fs.writeFile(`./${controllerPath}/${className}.js`, fileContents, (err) => {
      if (err)  {
        console.log(err);
        console.log("Closing Conduct...");
        process.exit();
      }
      
      console.log(`New Controller: ${className}`);
    });
}
