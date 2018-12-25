module.exports = function create(className, dataNode) {
    var moment       = require("moment");
    var fs           = require('fs');
    var fileContents = `const { Schema } = require("brainpi"); \n\n`
          + `class ${className} extends Schema {\n\n`
          + `    constructor()\n`
          + `    {\n`
          + `        super();\n`
          + `    }\n\n`

          + `    static props() {\n`
          + `        return {\n`
          + `            data: ${dataNode}\n`
          + `        }\n`
          + `    }\n\n`

          + `    up() {\n`
          + `        this.table("${className.toLowerCase()}")\n`
          + `            .column(\n`
          + `                {\n`
          + `                    name            : 'id',\n`
          + `                    type            : 'integer',\n`
          + `                    max             : 11,\n`
          + `                    primary         : true,\n`
          + `                    unique          : true,\n`
          + `                    nullable        : false,\n`
          + `                    default         : null,\n`
          + `                    auto_increments : true\n`
          + `                }\n`
          + `             )\n\n`
          + `        return this;\n`
          + `    }\n`
          + `}\n\n`
          + `module.exports = new ${className}();`;

    var fileName = `${snakeCase(className)}_${moment().format()}`;

    fs.writeFile(`./migrations/${fileName}.js`, fileContents, (err) => {
      if (err)  {
        console.log(err);
        console.log("Closing Conduct...");
        process.exit();
      }
      
      console.log(`New Migration: ${className}`);
    });
}

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