const ShockPattern = require("./src/ShockPattern");
var init = require("../Config/Init");
var config  = require("../Config/Config");

const configurationFile = init.readConfiguration(),
      getPath           = configurationFile.app.dir,
      bootstrap         = require(`${getPath}bootstrap/bootstrap`),
      modelPath         = bootstrap.modelDirectory().path,
      appDir = init.readConfiguration().app.dir;

class Shock extends ShockPattern {

    constructor() {
        super();
    }

    static snakeCasePlural() {
        var classNameArray  = this.name.split(""),
        classNameReturn = '';

        for(let i in classNameArray) {

            if(classNameArray[i].toLowerCase() === classNameArray[i]) {
                classNameReturn += classNameArray[i];
            } else if(classNameArray[i].toLowerCase !== classNameArray[i] 
            && i != 0) {
                classNameReturn += `_${classNameArray[i].toLowerCase()}`;
            } else {
                classNameReturn += classNameArray[i].toLowerCase();
            }

        }

        if(classNameReturn[classNameReturn.length - 1] == "s") {
            classNameReturn = `${classNameReturn}es`;
        } else {
            classNameReturn = `${classNameReturn}s`;
        }

        return classNameReturn;
    }

    objSnakealize( obj ) {
        var classNameArray  = obj.name.split(""),
            classNameReturn = '';

        for(let i in classNameArray) {

            if(classNameArray[i].toLowerCase() === classNameArray[i]) {
                classNameReturn += classNameArray[i];
            } else if(classNameArray[i].toLowerCase !== classNameArray[i] 
            && i != 0) {
                classNameReturn += `_${classNameArray[i].toLowerCase()}`;
            } else {
                classNameReturn += classNameArray[i].toLowerCase();
            }

        }

        return classNameReturn;


    }

    objPluralize( obj ) {
        var className = obj;
        if(className[className.length - 1] == "s") {
            className = `${className}es`;
        } else {
            className = `${className}s`;
        }
        return className;
    }

    static connector() {
        var prop                = this.props();
        const dataNode          = prop.data,
              configurationData = init.readConfiguration(),
              typeNode          = eval("configurationData.data."+dataNode);

        if(typeNode == null) {
            throw new Error(`${dataNode} Does Not Exist In configure.json!`);
        }

        const type = typeNode.type;

        if(type == null) {
            throw new Error(`There is no TYPE defined for data node ${dataNode}!`);
        }

        return [type, dataNode];
    }

    connector() {
        var className = this.constructor.name;
        var classObj  = null;
        
        if(appDir[appDir.length - 1] == "/")
            classObj = require(`${appDir}${modelPath}/${className}`);
        else 
            classObj = require(`${appDir}/${modelPath}/${className}`);

        
        var prop                = classObj.props();
        const dataNode          = prop.data,
              configurationData = init.readConfiguration(),
              typeNode          = eval("configurationData.data."+dataNode);

        if(typeNode == null) {
            throw new Error(`${dataNode} Does Not Exist In configure.json!`);
        }

        const type = typeNode.type;

        if(type == null) {
            throw new Error(`There is no TYPE defined for data node ${dataNode}!`);
        }

        return [type, dataNode];
    }

}

module.exports = Shock;