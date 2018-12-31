module.exports = function create(className, dataNode) {
    const fs           = require('fs');
    var init = require("../../Config/Init");
    var configurationFile = init.readConfiguration();
    var appDir            = configurationFile.app.dir;
    var bootstrap         = appDir[appDir.length - 1] == "/" ? require(`${appDir}bootstrap/bootstrap`) : require(`${appDir}/bootstrap/bootstrap`);
    var modelPath         = bootstrap.modelDirectory().path;

    const fileContents = `const { Model } = require("brainpi"); \n\n`
          + `class ${className} extends Model\n`
          + `{\n`
          + `    constructor()\n`
          + `    {\n`
          + `        super();\n`
          + `    }\n\n`
          + `    static props() {\n`
          + `        return {\n`
          + `            data: ${dataNode}\n`
          + `        }\n`
          + `    }\n\n`
          + `}\n\n`
          + `module.exports = ${className};`;

    fs.writeFile(`./${modelPath}/${className}.js`, fileContents, (err) => {
      if (err) {
          console.log(err);
          console.log("Closing Conduct...")
          process.exit(1);
      }

      console.log(`New Model: ${className}`);
      process.exit();
    });
}
