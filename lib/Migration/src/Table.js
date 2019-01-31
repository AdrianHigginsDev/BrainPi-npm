class Table {
    constructor() {
        this.columnsArr = {};
        this.last = null;
    }

    /*===========================================
        Returns PRIMARY, AUTOINCREMENT, INT(11)
    ============================================*/
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

    /*===========================================
        Returns VARCHAR(255)
    ============================================*/
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

    /*===========================================
        Returns INT(11)
    ============================================*/
    integer( name ) {

        if(eval('this.columnsArr.'+name) != null) {
            console.log(`ERROR: ${name} already exists in migration query!`);
            console.log("Closing Conduct...");
            process.exit();
        }
        
        this.columnsArr[name] = {
            "type"           : "integer",
            "max"            : "11",
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

    /*===========================================
        TimeStamp
    ============================================*/
    timestamp( name ) {

        if(eval('this.columnsArr.'+name) != null) {
            console.log(`ERROR: ${name} already exists in migration query!`);
            console.log("Closing Conduct...");
            process.exit();
        }
        
        this.columnsArr[name] = {
            "type"           : "timestamp",
            "max"            : "100",
            "primary"        : "false",
            "unique"         : "false",
            "auto_increments": "false",
            "not_null"       : "true",
            "default"        : "",
            "unsigned"       : "false"
        }
        this.last = name;
        return this;
    }

    /*===========================================
        Alter Max Value Length
    ============================================*/
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

    /*===========================================
        Set Default Value
    ============================================*/
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

    /*===========================================
        Add Primary Constraint
    ============================================*/
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

    /*===========================================
        Add Unique Constraint
    ============================================*/
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

    /*===========================================
        Add Not Null Constraint
    ============================================*/
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

    /*===========================================
        Add Unsigned Constraint
    ============================================*/
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

module.exports = Table;