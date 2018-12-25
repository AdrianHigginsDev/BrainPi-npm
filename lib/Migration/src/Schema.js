class Schema {

    constructor() {
        this.tableQuery   = null;
        this.columnsQuery = [];
    }

    table( table ) {

        if(this.tableQuery !== null) {
            throw new Error(`Schema Table Already Defined! 
            You Tried To Call Table ${table} after already defining ${this.tableQuery}!`);
        }

        this.tableQuery = table;
        
        return this;

    }

    column( column ) {

        if(column.length < 2) {
            throw new Error(`Missing Column Properties! Please check docs for how to declare a column!`);
        }

        this.columnsQuery.push(column);

        return this;

    }

}

module.exports = Schema;