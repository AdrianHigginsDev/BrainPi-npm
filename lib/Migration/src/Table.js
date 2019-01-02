class Table {
    constructor() {
        this.columnsArr = {};
        this.last = null;
    }

    incrementing( name ) { 

        if(eval('this.columnsArr.'+name) != null) {
            console.log(`ERROR: ${name} already exists in migration query!`);
            console.log("Closing Conduct...");
            process.exit();
        }

        this.columnsArr[name] = {
            "type"           : "integer",
            "max"            : "11",
            "primary"        : "true",
            "unique"         : "false",
            "auto_increments": "true",
            "not_null"       : "false",
            "default"        : "",
            "unsigned"       : "false"
        }

        this.last = name;
        return this;
    }

    string( name ) {

        if(eval('this.columnsArr.'+name) != null) {
            console.log(`ERROR: ${name} already exists in migration query!`);
            console.log("Closing Conduct...");
            process.exit();
        }

        this.columnsArr[name] = {
            "type"           : "string",
            "max"            : "255",
            "primary"        : "false",
            "unique"         : "false",
            "auto_increments": "false",
            "not_null"       : "false",
            "default"        : "",
            "unsigned"       : "false"
        }
        this.last = name;
        return this;
    }

    integer( name ) {

        if(eval('this.columnsArr.'+name) != null) {
            console.log(`ERROR: ${name} already exists in migration query!`);
            console.log("Closing Conduct...");
            process.exit();
        }
        
        this.columnsArr[name] = {
            "type"           : "integer",
            "max"            : "255",
            "primary"        : "false",
            "unique"         : "false",
            "auto_increments": "false",
            "not_null"       : "false",
            "default"        : "",
            "unsigned"       : "false"
        }
        this.last = name;
        return this;
    }

    max( int ) {

        if(this.last == null) {
            console.log("Error: Cannot call property function on null column!");
            console.log("Closing Conduct...");
            process.exit();
        }

        var name = this.last;

        var obj = eval('this.columnsArr.'+name);

        obj.max = int;

        return this;
    }

    default( prop ) {
        if(this.last == null) {
            console.log("Error: Cannot call property function on null column!");
            console.log("Closing Conduct...");
            process.exit();
        }

        var name = this.last;

        var obj = eval('this.columnsArr.'+name);

        obj.default = prop;

        return this;
    }

    primary() {
        if(this.last == null) {
            console.log("Error: Cannot call property function on null column!");
            console.log("Closing Conduct...");
            process.exit();
        }

        var name = this.last;

        var obj = eval('this.columnsArr.'+name);

        obj.primary = true;

        return this;
    }

    unique() {
        if(this.last == null) {
            console.log("Error: Cannot call property function on null column!");
            console.log("Closing Conduct...");
            process.exit();
        }

        var name = this.last;

        this.columnsArr.name.unique = true;

        return this;
    }

    notNull() {
        if(this.last == null) {
            console.log("Error: Cannot call property function on null column!");
            console.log("Closing Conduct...");
            process.exit();
        }

        var name = this.last;

        var obj = eval('this.columnsArr.'+name);

        obj.not_null = true;

        return this;
    }

    unsigned() {
        if(this.last == null) {
            console.log("Error: Cannot call property function on null column!");
            console.log("Closing Conduct...");
            process.exit();
        }

        var name = this.last;

        var obj = eval('this.columnsArr.'+name);

        obj.unsigned = true;

        return this;
    }
}

module.exports = new Table();