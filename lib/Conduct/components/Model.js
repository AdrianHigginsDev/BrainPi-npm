/*===========================================
  Creates A Model Scaffold File
============================================*/

module.exports = function create(className, dataNode) {
    const fs                = require('fs'),
          init              = require("../../Config/Init"),
          configurationFile = init.readConfiguration(),
          appDir            = configurationFile.app.dir,
          bootstrap         = appDir[appDir.length - 1] == "/" ? require(`${appDir}bootstrap/bootstrap`) : require(`${appDir}/bootstrap/bootstrap`),
          modelPath         = bootstrap.modelDirectory().path;

    if(fs.existsSync(`./${modelPath}/${className}.js`)) {
      console.log(`${className} already exists!`);
      console.log("Closing Conduct...");
      process.exit();
    }

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
