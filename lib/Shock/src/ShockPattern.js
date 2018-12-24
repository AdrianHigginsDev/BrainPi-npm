var config  = require("../../Config/Config");

class ShockPattern {


    static first() {
        var tableName   = this.pluralize(),
            dataNode    = this.connector(),
            classObj    = require(`../../../../../models/${this.name}`),
            newClassObj = new classObj();

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} ORDER BY id ASC LIMIT 1`).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            });
        });
    }

    static last() {
        var tableName   = this.pluralize(),
            dataNode    = this.connector(),
            classObj    = require(`../../../../../models/${this.name}`),
            newClassObj = new classObj();

        return config.load(dataNode[1]).query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            });
        });
        
    }

    hasOne( obj ) {

        var thisRef   = this.constructor.name.toLowerCase(),
            dataNode  = this.connector();

        var objTableNameSnaked = this.objSnakealize( obj ),
            objTableName       = this.objPluralize( objTableNameSnaked ),
            classObj     = require(`../../../../../models/${obj.name}`),
            newClassObj  = new classObj();

        const q = `SELECT * FROM ${objTableName} WHERE ${thisRef}_id = ${this.get("id")} 
        ORDER BY id DESC LIMIT 1`;

        return config.load(dataNode[1]).query(q).then(resultsTop => {
            return resultsTop.map(element => {
                newClassObj.set(element);
                return newClassObj;
            });
        });

        // returns the child classes data

    }

    static hasMany( obj ) {

        var thisRef   = this.constructor.name.toLowerCase(),
            dataNode  = this.connector();

        var objTableName = this.objPluralize( obj ),
            classObj     = require(`../../../../../models/${obj.name}`),
            newClassObj  = new classObj();

        const q = `SELECT * FROM ${objTableName} WHERE ${thisRef}_id = ${this.get("id")} 
        ORDER BY id DESC`;

        return config.load(dataNode[1]).query(q).then(resultsTop => {
            return resultsTop.map(resultsBottom => {
                return resultsBottom.map(element => {
                    newClassObj.set(element);
                    return newClassObj;
                })
            });
        });

    }

    static belongsTo( obj ) {

        // returns parent class data

    }

    static belongsToMany( obj ) {

        // returns parent classes 

    }


}

module.exports = ShockPattern;