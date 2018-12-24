var Build = require("./src/build");

class QueryBuilder {

    constructor() {
        this.tableQuery   = null;
        this.method       = null;
        this.queryRaw     = null;
        this.limitQuery   = null;
        this.offsetQuery  = null;
        this.finalQuery   = [];
        this.orderByQuery = [];
        this.params       = [];
        this.values       = [];
        this.clause       = [];
    }

    table(tableQuery) {
        if(this.tableQuery !== null) {
            throw new Error(`QueryBuilder Table Already Defined! 
            You Tried To Call Table ${tableQuery} after already defining ${this.tableQuery}!`);
        }
        if(tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }
        this.tableQuery = tableQuery;
        return this;
    }

    select(params) {
        if(this.method !== null) {
            throw new Error(`QueryBuilder Method Already Set, CANNOT change once already set! 
            You Tried To Call 'SELECT' After Already Defining Query Type!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }
        this.params = params;
        this.method = "select";
        return this;
    }

    count() {
        if(this.method !== null) {
            throw new Error(`QueryBuilder Method Already Set, CANNOT change once already set! 
            You Tried To Call 'COUNT()' After Already Defining Query Type!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }
        this.method = "count";
        return this;
    }

    insert(params) {
        if(this.method !== null) {
            throw new Error(`QueryBuilder Method Already Set, CANNOT change once already set! 
            You Tried To Call 'INSERT' After Already Defining Query Type!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }
        this.params = params;
        this.method = "insert";
        return this;
    }

    remove() {
        if(this.method !== null) {
            throw new Error(`QueryBuilder Method Already Set, CANNOT change once already set! 
            You Tried To Call "REMOVE" After Already Defining Query Type!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }
        this.method = "delete";
        return this;
    }

    update(params) {
        if(this.method !== null) {
            throw new Error(`QueryBuilder Method Already Set, CANNOT change once already set! 
            You Tried To Call 'UPDATE' After Already Defining Query Type!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }

        this.params = params;
        this.method = "update";
        return this;
    }

    where(fieldOne, operation, fieldTwo) {
        if(this.method === null) {
            throw new Error(`Method Has Not Been Set! 
            You Cannot Use WHERE clause without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }

        if(fieldOne === null || operation === null || fieldTwo === null) {
            throw new Error(`NO NULL ALLOWED IN WHERE CLAUSE! All Params Required In Where Clause!`);
        }

        if(typeof fieldTwo != 'number') {
            this.clause.push( `${fieldOne} ${operation} '${fieldTwo}'`);
        } else {
            this.clause.push( `${fieldOne} ${operation} ${fieldTwo}`);
        }
        
        return this;
    }

    limit(limit) {
        if(this.method === null) {
            throw new Error(`Method Has Not Been Set! 
            You Cannot Use LIMIT without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }

        this.limitQuery = limit;
        return this;
    }

    offset(offset) {
        if(this.method === null) {
            throw new Error(`Method Has Not Been Set! 
            You Cannot Use OFFSET clause without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }

        this.offsetQuery = offset;
        return this;
    }

    orderBy(field, ascOrDesc) {
        if(this.method === null) {
            throw new Error(`Method Has Not Been Set! 
            You Cannot Use ORDERBY clause without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }
        if(this.orderByQuery.length > 0) {
            throw new Error(`Order Has Been Set! You Cannot Call Order By More Than Once!`);
        }

        this.orderByQuery[0] = field;
        this.orderByQuery[1] = ascOrDesc;

        return this;
    }

    withValues(values) {
        if(this.method === null) {
            throw new Error(`Method Has Not Been Set! 
            You Cannot Use WITHVALUES clause without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
        }
        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }
        if(this.values.length > 0) {
            throw new Error(`Values Already Defined! You Cannot Re-Define Values!`);
        }
        this.values = values;
        return this;
    }

    execute() {

        if(this.method === null) {
            throw new Error(`Method Has Not Been Set! 
            You Cannot Execute Query Without A Method (e.g. 'select', 'update', 'remove', 'insert')!`);
        }

        if(this.tableQuery === null) {
            throw new Error(`NO TABLE DEFINED! You Cannot Query Build Without Defining A Table!`);
        }

        switch(this.method) {
            case "insert":
                if(this.params.length !==  this.values.length) {
                    throw new Error(`VALUE LENGTH AND PARAMETER LENGTH DO NOT MATCH! 
                    You passed in ${this.params.length} parameters and ${this.values.length} values!`);
                }
                this.queryRaw = Build.buildInsert(this.tableQuery, this.params);
                break;

            case "select":
                this.queryRaw = Build.buildSelect(this.tableQuery, this.params, this.clause, this.limitQuery, this.offsetQuery, this.orderByQuery);
                break;

            case "update":
                if(this.params.length !==  this.values.length) {
                    throw new Error(`VALUE LENGTH AND PARAMETER LENGTH DO NOT MATCH! 
                    You passed in ${this.params.length} parameters and ${this.values.length} values!`);
                }
                this.queryRaw = Build.buildUpdate(this.tableQuery, this.params, this.clauses, this.limitQuery, this.offsetQuery, this.orderByQuery);
                break;

            case "delete":
                this.queryRaw = Build.buildDelete(this.tableQuery, this.clauses, this.limitQuery, this.offsetQuery, this.orderByQuery);
                break;

            case "count":
                this.queryRaw = Build.buildCount(this.tableQuery, this.params, this.clauses, this.limitQuery, this.offsetQuery, this.orderByQuery);
                break;

            default:
                throw new Error(`Unknown Method Set! Please Check Your Code!`);

        }

        this.finalQuery[0] = this.queryRaw;
        this.finalQuery[1] = this.values;

        return this.query(this.finalQuery[0],this.finalQuery[1]);
        // return this.finalQuery;

    }

    query() {
    }
}

module.exports = QueryBuilder;