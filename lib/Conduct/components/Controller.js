module.exports = function create(className) {
    var fs           = require('fs');
    var init = require("../../Config/Init");
    var configurationFile = init.readConfiguration();
    var appDir            = configurationFile.app.dir;
    var bootstrap         = appDir[appDir.length - 1] == "/" ? require(`${appDir}bootstrap/bootstrap`) : require(`${appDir}/bootstrap/bootstrap`);
    var controllerPath    = bootstrap.controllerDirectory().path;

    var fileContents = `const { App, Controller } = require('brainpi'); \n\n`
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
