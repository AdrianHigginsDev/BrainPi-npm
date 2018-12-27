var Build = require("./src/build");

class QueryBuilder {

    constructor() {
        this.collectionQuery   = null;
        this.method            = null;
        this.queryRaw          = null;
        this.limitQuery        = null;
        this.offsetQuery       = null;
        this.finalQuery        = [];
        this.sortQuery         = [];
        this.params            = [];
        this.values            = [];
        this.clause            = [];
    }

    collection( collection ) {
        if(this.collectionQuery !== null) {
            throw new Error(`QueryBuilder Collection Already Defined! 
            You Tried To Call Collection ${collection} after already defining ${this.collectionQuery}!`);
        }
        if(collection === null) {
            throw new Error(`Collection Undefined!  You passed in a null argument to 'collection()`);
        }
        this.collectionQuery = collection;
        return this;
    }

    findOne(fields, field, val) {

        if(this.method !== null && this.method !== "find") {
            throw new Error(`Method Already Defined!  You Cannot Call 'find()' 
            When Already In Another Query Type!`);
        }

        this.method = "findOne";

        this.params = field;

        this.clause.push([field, val]);

        return this;
    }

    findMany(fields, field, val) {

        if(this.method !== null && this.method !== "find") {
            throw new Error(`Method Already Defined!  You Cannot Call 'find()' 
            When Already In Another Query Type!`);
        }

        this.method = "findMany";

        this.params = field;

        this.clause.push([field, val]);

        return this;
    }

    insert( params ) {
        if(this.method !== null) {
            throw new Error(`Method Already Defined!  You Cannot Call 'insert()' 
            When Already In Another Query Type!`);
        }
        if(this.collectionQuery === null) {
            throw new Error(`NO COLLECTION DEFINED! You Cannot Query 
            Build Without Defining A Collection!`);
        }

        this.method = "insert";

        this.params = params;

        return this;
    }

    remove() {
        if(this.method !== null) {
            throw new Error(`Method Already Defined!  You Cannot Call 'insert()' 
            When Already In Another Query Type!`);
        }
        if(this.collectionQuery === null) {
            throw new Error(`NO COLLECTION DEFINED! You Cannot Query 
            Build Without Defining A Collection!`);
        }

        this.method = "remove";

        return this;
    }

    limit( limit ) {
        if(this.method === null) {
            throw new Error(`Method Undefined!  
            You Must Define A Query Method Before Calling Limit!`);
        }
        if(this.collectionQuery === null) {
            throw new Error(`NO COLLECTION DEFINED! You Cannot Query 
            Build Without Defining A Collection!`);
        }
        if(this.limitQuery != null) {
            throw new Error("Limit Already Defined!")
        }

        this.limitQuery = limit;

        return this;
    }

    sort( field, order ) {

        if(this.method === null) {
            throw new Error(`Method Undefined!  
            You Must Define A Query Method Before Calling Sort!`);
        }
        if(this.collectionQuery === null) {
            throw new Error(`NO COLLECTION DEFINED! You Cannot Query 
            Build Without Defining A Collection!`);
        }
        if(this.sortQuery.length > 0) {
            throw new Error("Sort Already Defined!")
        }

        this.sortQuery = [field, order];

        return this;
    }

    offsetQuery( offset ) {
        if(this.method === null) {
            throw new Error(`Method Undefined!  
            You Must Define A Query Method Before Calling Offset!`);
        }
        if(this.collectionQuery === null) {
            throw new Error(`NO COLLECTION DEFINED! You Cannot Query 
            Build Without Defining A Collection!`);
        }
        if(this.offsetQuery != null) {
            throw new Error("Limit Already Defined!")
        }

        this.offsetQuery = offset;

        return this;
    }

    execute() {
        if(this.method === null) {
            throw new Error(`Method Undefined!  
            You Must Define A Query Method Before Calling Execute!`);
        }
        if(this.collectionQuery === null) {
            throw new Error(`NO COLLECTION DEFINED! You Cannot Query 
            Build Without Defining A Collection!`);
        }

        console.log(this)
    }

}

module.exports = QueryBuilder;