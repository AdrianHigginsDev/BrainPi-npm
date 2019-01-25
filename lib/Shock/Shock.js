const ShockPattern = require("./src/ShockPattern");
var init = require("../Config/Init");
var config  = require("../Config/Config");

const configurationFile = init.readConfiguration(),
      getPath           = configurationFile.app.dir,
      bootstrap         = getPath[getPath.length - 1] == "/" ? require(`${getPath}bootstrap/bootstrap`) : require(`${getPath}/bootstrap/bootstrap`),
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

        var prop                = typeof this.props == "function" ? this.props() : null;
        var dataNode            = prop == null ? null : prop.data,
              configurationData = init.readConfiguration();

        if(dataNode == "" || dataNode == null)
            if(Object.keys(configurationData.database).length > 1)
                throw new Error(`${this.name} has no database specified in it's props function!`);
            else
                dataNode = Object.keys(configurationData.database)[0];

        const typeNode          = eval("configurationData.database."+dataNode);

        const type = typeNode.connection;

        if(type == null) {
            throw new Error(`There is no CONNECTION defined for database ${dataNode}!`);
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

        var prop                = typeof classObj.props == "function" ? classObj.props() : null;
        var dataNode            = prop == null ? null : prop.data,
              configurationData = init.readConfiguration();

        if(dataNode == "" || dataNode == null)
            if(Object.keys(configurationData.database).length > 1)
                throw new Error(`${classObj.name} has no database specified in it's props function!`);
            else
                dataNode = Object.keys(configurationData.database)[0];

        const typeNode          = eval("configurationData.database."+dataNode);

        if(typeNode == null) {
            throw new Error(`${dataNode} Does Not Exist In configure.json!`);
        }

        const type = typeNode.connection;

        if(type == null) {
            throw new Error(`There is no CONNECTION defined for database ${dataNode}!`);
        }

        return [type, dataNode];
    }

}

module.exports = Shock;