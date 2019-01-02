class Migration {
    constructor() {

    }

    Create(table, funct) {

        var tableObject = funct(); // Table: { columnsArr: { eachcolumn... } }
        var columns     = tableObject.columnsArr; // columnsArr: { eachcolumn... }
        
        if(columns.length <= 0) {
            console.log(`Cannot Create Table Without Columns!`);
            console.log("Closing Conduct...");
            process.exit();
        }

        if(table == null) {
            console.log(`Error: Table Name Is A Required Parameter For The Create() Function!`);
            console.log("Closing Conduct...");
            process.exit();
        }

        var queryString = `CREATE TABLE ${table} ( `;

        var size  = Object.keys(columns).length
        var index = 0;

        Object.keys(columns).forEach(element => {
            var name   = eval("element");
            var values = columns[name];

            queryString += ` ${name} `;

            switch(values.type) {
                case "integer":
                    queryString += `int(${values.max}) `;
                    break;

                case "string":
                    queryString += `varchar(${values.max}) `;
                    break;

                case "timestamp": 
                    queryString += `datetime `;
                    break;
            }

            if(values.unsigned == true) {
                if(values.type != "integer") {
                    console.log("ERROR: Cannot use UNSIGNED on a non-numeric field!");
                    console.log("Closing Conduct...");
                    process.exit();
                }
                queryString += ` UNSIGNED `;
            }

            if(values.auto_increments == true) {
                if(values.type != "integer") {
                    console.log("ERROR: Cannot use auto_increment on a non-numeric field!");
                    console.log("Closing Conduct...");
                    process.exit();
                }
                queryString += ` AUTO_INCREMENT `;
            }

            if(values.not_null == true) {
                queryString += ` NOT NULL `;
            }

            if(values.default != null && values.default != "") {
                queryString += ` DEFAULT ${values.default} `;
            }

            if(values.primary == true) {
                queryString += ` PRIMARY KEY `;
            }

            if(values.unique == true) {
                queryString += ` UNIQUE `;
            }

            index++;

            if(index == size)
                queryString += `);`
            else
                queryString += `, `;

        });

        return queryString;

    }

}

module.exports = Migration;