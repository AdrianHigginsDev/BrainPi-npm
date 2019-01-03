module.exports = function create(className) {
    var fs                = require('fs');
    var init              = require("../../Config/Init");
    var configurationFile = init.readConfiguration();
    var appDir            = configurationFile.app.dir;
    var bootstrap         = appDir[appDir.length - 1] == "/" ? require(`${appDir}bootstrap/bootstrap`) : require(`${appDir}/bootstrap/bootstrap`);
    var jobPath           = bootstrap.jobDirectory().path;

    var fileContents = `const { Job } = require('brainpi'); \n\n`
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
