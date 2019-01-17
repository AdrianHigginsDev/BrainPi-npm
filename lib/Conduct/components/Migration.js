/*===========================================
  Creates A Migration Scaffold File
============================================*/

module.exports = function create(className, dataNode) {
    const moment            = require("moment"),
          fs                = require('fs'),
          init              = require("../../Config/Init"),
          configurationFile = init.readConfiguration(),
          appDir            = configurationFile.app.dir,
          bootstrap         = appDir[appDir.length - 1] == "/" ? require(`${appDir}bootstrap/bootstrap`) : require(`${appDir}/bootstrap/bootstrap`),
          migrationPath     = bootstrap.migrationsDirectory().path;

    if(fs.existsSync(`./${migrationPath}/${className}.js`)) {
        console.log(`${className} already exists!`);
        console.log("Closing Conduct...");
        process.exit();
    }

    const fileContents = `const { Migration, Table } = require("brainpi"); \n\n`
          + `class ${className} extends Migration {\n\n`
          + `    constructor()\n`
          + `    {\n`
          + `        super();\n`
          + `    }\n\n`

          + `    props() {\n`
          + `        return {\n`
          + `            data: ${dataNode}\n`
          + `        }\n`
          + `    }\n\n`

          + `    up() {\n`
          + `        return this.Create('', function() {\n\n`
          + `            Table.incrementing("id").max(11).primary();\n\n`
          + `            return Table;\n`
          + `        })\n`
          + `    }\n`
          + `}\n\n`
          + `module.exports = new ${className}();`;

    var fileName = `${snakeCase(className)}_${moment().format()}`;

    fs.writeFile(`./${migrationPath}/${fileName}.js`, fileContents, (err) => {
      if (err)  {
        console.log(err);
        console.log("Closing Conduct...");
        process.exit();
      }
      
      console.log(`New Migration: ${className}`);
    });
}

/*===========================================
  Convert Migration To Snake Case
============================================*/
function snakeCase( string ) {
    var stringNameArray  = string.split(""),
    stringNameReturn     = '';

    for(let i in stringNameArray) {

        if(stringNameArray[i].toLowerCase() === stringNameArray[i]) {
            stringNameReturn += stringNameArray[i];
        } else if(stringNameArray[i].toLowerCase !== stringNameArray[i] 
        && i != 0) {
            stringNameReturn += `_${stringNameArray[i].toLowerCase()}`;
        } else {
            stringNameReturn += stringNameArray[i].toLowerCase();
        }

    }

    return stringNameReturn;
}