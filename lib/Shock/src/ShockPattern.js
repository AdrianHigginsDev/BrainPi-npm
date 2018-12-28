var config  = require("../../Config/Config");
var init = require("../../Config/Init");

const configurationFile = init.readConfiguration(),
      getPath           = configurationFile.app.dir,
      bootstrap         = getPath[getPath.length - 1] == "/" ? require(`${getPath}bootstrap/bootstrap`) : require(`${getPath}/bootstrap/bootstrap`),
      modelPath         = bootstrap.modelDirectory().path;

class ShockPattern {


    static first() {
        const appDir = init.readConfiguration().app.dir;

        var tableName   = this.snakeCasePlural(),
            dataNode    = this.connector();
        
        var classObj    = null;    
        
        if(appDir[appDir.length - 1] == "/")
            classObj = require(`${appDir}${modelPath}/${this.name}`);
        else 
            classObj = require(`${appDir}/${modelPath}/${this.name}`);

        var newClassObj = new classObj();
            

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} ORDER BY id ASC LIMIT 1`).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            });
        });
    }

    static last() {
        const appDir = init.readConfiguration().app.dir;
        
        var tableName   = this.snakeCasePlural(),
            dataNode    = this.connector();

        var classObj    = null;    
    
        if(appDir[appDir.length - 1] == "/")
            classObj = require(`${appDir}${modelPath}/${this.name}`);
        else 
            classObj = require(`${appDir}/${modelPath}/${this.name}`);

        var newClassObj = new classObj();

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            });
        });
        
    }

    hasOne( obj ) {

        if(typeof this.id == "undefined") {
            throw new Error(`${this.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }
        const appDir = init.readConfiguration().app.dir;

        var thisRef   = this.constructor.name.toLowerCase();

        var dataNode  = this.connector();

        var classObj;
        if(appDir[appDir.length - 1] == "/")
            classObj = require(`${appDir}${modelPath}/${obj.name}`);
        else 
            classObj = require(`${appDir}/${modelPath}/${obj.name}`);

        var objTableNameSnaked = this.objSnakealize( obj ),
            objTableName       = this.objPluralize( objTableNameSnaked ),
            newClassObj  = new classObj();

        if(typeof newClassObj.id == "undefined") {
            throw new Error(`${newClassObj.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }

        const q = `SELECT * FROM ${objTableName} WHERE ${thisRef}_id = ${this.id} 
        ORDER BY id DESC LIMIT 1`;

        return config.load(dataNode[1]).query(q).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            });
        });

        // returns the child classes data

    }

    hasMany( obj ) {

        if(typeof this.id == "undefined") {
            throw new Error(`${this.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }

        const appDir = init.readConfiguration().app.dir;

        var thisRef   = this.constructor.name.toLowerCase();

        var dataNode  = this.connector();

        var classObj;
        if(appDir[appDir.length - 1] == "/")
            classObj = require(`${appDir}${modelPath}/${obj.name}`);
        else 
            classObj = require(`${appDir}/${modelPath}/${obj.name}`);

        var objTableNameSnaked = this.objSnakealize( obj ),
            objTableName       = this.objPluralize( objTableNameSnaked );

        const q = `SELECT * FROM ${objTableName} WHERE ${thisRef}_id = ${this.id} 
        ORDER BY id`;

        var setOfNewClassObj = [];

        if(typeof newClassObj.id == "undefined") {
            throw new Error(`${newClassObj.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }

        return config.load(dataNode[1]).query(q).then(resultsTop => {
            return resultsTop.map(element => {
                var newClassObj  = new classObj();
                newClassObj.set(element);
                setOfNewClassObj.push(newClassObj)
                return setOfNewClassObj;
            });
        });

    }

    belongsTo( obj ) {

        if(typeof this.id == "undefined") {
            throw new Error(`${this.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }

        const appDir = init.readConfiguration().app.dir;

        var thisRef   = this.constructor.name.toLowerCase();

        var dataNode  = this.connector();

        var classObj;
        if(appDir[appDir.length - 1] == "/")
            classObj = require(`${appDir}${modelPath}/${obj.name}`);
        else 
            classObj = require(`${appDir}/${modelPath}/${obj.name}`);

        var objTableNameSnaked = this.objSnakealize( obj ),
            objTableName       = this.objPluralize( objTableNameSnaked ),
            newClassObj  = new classObj();

        if(typeof newClassObj.id == "undefined") {
            throw new Error(`${newClassObj.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }

        var fieldId = eval(`this.${objTableNameSnaked}_id`);

        const q = `SELECT * FROM ${objTableName} WHERE id = ${fieldId} 
        ORDER BY id DESC LIMIT 1`;

        return config.load(dataNode[1]).query(q).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            });
        });
        // returns parent class data

    }

    belongsToMany( obj ) {

        if(typeof this.id == "undefined") {
            throw new Error(`${this.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }

        const appDir = init.readConfiguration().app.dir;

        var thisRef   = this.constructor.name.toLowerCase();

        var dataNode  = this.connector();

        var classObj;
        if(appDir[appDir.length - 1] == "/")
            classObj = require(`${appDir}${modelPath}/${obj.name}`);
        else 
            classObj = require(`${appDir}/${modelPath}/${obj.name}`);

        var objTableNameSnaked = this.objSnakealize( obj ),
            objTableName       = this.objPluralize( objTableNameSnaked ),
            newClassObj  = new classObj();

        if(typeof newClassObj.id == "undefined") {
            throw new Error(`${newClassObj.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }

        var fieldId = eval(`this.${objTableNameSnaked}_id`);

        const q = `SELECT * FROM ${objTableName} WHERE id = ${fieldId} 
        ORDER BY id DESC LIMIT 1`;

        var setOfNewClassObj = [];

        return config.load(dataNode[1]).query(q).then(resultsTop => {
            return resultsTop.map(element => {
                var newClassObj  = new classObj();
                newClassObj.set(element);
                setOfNewClassObj.push(newClassObj)
                return setOfNewClassObj;
            });
        });
        // returns parent classes 

    }


}

module.exports = ShockPattern;