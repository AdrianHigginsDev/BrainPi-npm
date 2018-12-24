class QueryBuilder {

    constructor() {
        this.collectionQuery   = null;
        this.method            = null;
        this.queryRaw          = null;
        this.limitQuery        = null;
        this.offsetQuery       = null;
        this.finalQuery        = [];
        this.orderByQuery      = [];
        this.params            = [];
        this.values            = [];
        this.clause            = [];
    }

    collection( collection ) {
        if(this.tableQuery !== null) {
            throw new Error(`QueryBuilder Collection Already Defined! 
            You Tried To Call Collection ${collection} after already defining ${this.collectionQuery}!`);
        }
        if(tableQuery === null) {
            throw new Error(`NO COLLECTION DEFINED! You Cannot Query Build Without Defining A Collection!`);
        }
        this.collectionQuery = collection;
        return this;
    }

}

module.exports = QueryBuilder;