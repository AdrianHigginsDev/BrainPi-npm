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
            dataNode    = this.connector(),
            classObj    = appDir[appDir.length - 1] == "/"
                            /*if*/  ? require(`${appDir}${modelPath}/${this.name}`)
                            /*else*/: require(`${appDir}/${modelPath}/${this.name}`),
            newClassObj = new classObj();

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} ORDER BY id ASC LIMIT 1`).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            })[0];
        });
    }

    static last() {
        const appDir = init.readConfiguration().app.dir;
        
        var tableName   = this.snakeCasePlural(),
            dataNode    = this.connector(),
            classObj    = appDir[appDir.length - 1] == "/"
                            /*if*/  ? require(`${appDir}${modelPath}/${this.name}`)
                            /*else*/: require(`${appDir}/${modelPath}/${this.name}`),
            newClassObj = new classObj();

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            })[0];
        });
        
    }

    static all() {
        const appDir = init.readConfiguration().app.dir;
        
        var tableName   = this.snakeCasePlural(),
            dataNode    = this.connector(),
            classObj    = appDir[appDir.length - 1] == "/"
                            /*if*/  ? require(`${appDir}${modelPath}/${this.name}`)
                            /*else*/: require(`${appDir}/${modelPath}/${this.name}`),
            setOfNewClassObj = [];

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName}`).then(resultsTop => {
            return resultsTop.map(element => {
                var newClassObj  = new classObj();
                newClassObj.set(element);
                setOfNewClassObj.push(newClassObj)
                return setOfNewClassObj;
            });
        });
    }

    static findById(id) {
        const appDir = init.readConfiguration().app.dir;
        
        var tableName   = this.snakeCasePlural(),
            dataNode    = this.connector(),
            classObj    = appDir[appDir.length - 1] == "/"
                            /*if*/  ? require(`${appDir}${modelPath}/${this.name}`)
                            /*else*/: require(`${appDir}/${modelPath}/${this.name}`),
            newClassObj = new classObj();

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`, [id]).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            })[0];
        });
    }

    save() {

        var args      = [],
            tableName = this.objSnakealize(this.constructor),
            dataNode  = this.connector(),
            tableName = this.objPluralize(tableName);

        if(this.id == null) {

            var query   = `INSERT INTO ${tableName} (`,
                keys    = Object.keys(this),
                lastKey = keys.length - 1;

            keys.forEach(key => {
                query += key == keys[lastKey] ? `${key})`: `${key}, `;
            });

            query += " VALUES (";

            keys.forEach(key => {
                var val = eval(`this.${key}`);
                query += key == keys[lastKey] ? `?)`: `?, `;
                args.push(val);
            });

            return config.load(dataNode[1]).query(query, args);

        } else {

            var query   = `UPDATE ${tableName} SET `,
                keys    = Object.keys(this),
                lastKey = keys.length - 1;

            keys.forEach(key => {
                var val = eval(`this.${key}`);
                if(key != "id") {
                    query += key == keys[lastKey] ? `${key} = ?`: `${key} = ?, `;
                    args.push(val);
                }
            });

            query += ` WHERE id = ?;`;
            args.push(this.id);
            
            return config.load(dataNode[1]).query(query, args);
        }

    }

    hasOne( obj ) {

        if(typeof this.id == "undefined") {
            throw new Error(`${this.constructor.name} Does Not Have An ID Field In It's Constuctor!  Cannot Build Relationships!`)
        }
        const appDir           = init.readConfiguration().app.dir;

        var thisRef            = this.constructor.name.toLowerCase(),

            dataNode           = this.connector(),

            classObj           = appDir[appDir.length - 1] == "/" ?
                                /*if*/    require(`${appDir}${modelPath}/${obj.name}`)
                                /*else*/: require(`${appDir}/${modelPath}/${obj.name}`),

            objTableNameSnaked = this.objSnakealize( obj ),
            objTableName       = this.objPluralize( objTableNameSnaked ),
            newClassObj        = new classObj();

        const q = `SELECT * FROM ${objTableName} WHERE ${thisRef}_id = ${this.id} 
        ORDER BY id DESC LIMIT 1`;

        return config.load(dataNode[1]).query(q).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            })[0];
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

        var fieldId = eval(`this.${objTableNameSnaked}_id`);

        const q = `SELECT * FROM ${objTableName} WHERE id = ${fieldId} 
        ORDER BY id DESC LIMIT 1`;

        return config.load(dataNode[1]).query(q).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            })[0];
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