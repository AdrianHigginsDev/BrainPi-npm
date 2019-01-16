/*===========================================
  Creates A Job Scaffold File
============================================*/

module.exports = function create(className) {
    const fs                = require('fs'),
          init              = require("../../Config/Init"),
          configurationFile = init.readConfiguration(),
          appDir            = configurationFile.app.dir,
          bootstrap         = appDir[appDir.length - 1] == "/" ? require(`${appDir}bootstrap/bootstrap`) : require(`${appDir}/bootstrap/bootstrap`),
          jobPath           = bootstrap.jobDirectory().path;

    if(fs.existsSync(`./${jobPath}/${className}.js`)) {
      console.log(`${className} already exists!`);
      console.log("Closing Conduct...");
      process.exit();
    }

    const fileContents      = `const { Job } = require('brainpi'); \n\n`
          + `class ${className} extends Job\n`
          + `{\n`
          + `    constructor()\n`
          + `    {\n`
          + `        super();\n`
          + `    }\n\n`
          + `    config() {\n`
          + `        return {\n`
          + `            timepattern: this.everyHour()\n`
          + `        }\n`
          + `    }\n\n`
          + `    task() {\n\n`
          + `        // TO-DO\n\n`
          + `    }\n\n`
          + `}\n\n`
          + `module.exports = new ${className}();`;

    fs.writeFile(`./${jobPath}/${className}.js`, fileContents, (err) => {
      if (err)  {
        console.log(err);
        console.log("Closing Conduct...");
        process.exit();
      }
      
      console.log(`New Job: ${className}`);
    });
}
