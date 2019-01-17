class Form {

    string(options) {
        options = options || false;

        if(!options) {
            return {
                "type": "string"
            }
        }

        return this.parseOptions("string", options);
    }

    id(options) {
        options = options || false;

        if(!options) {
            return {
                "type": "id"
            }
        }

        return this.parseOptions("id", options);

    }

    email(options) {
        options = options || false;

        if(!options) {
            return {
                "type": "email"
            }
        }

        return this.parseOptions("email", options);

    }

    boolean(options) {
        options = options || false;

        if(!options) {
            return {
                "type": "string"
            }
        }

        return this.parseOptions("boolean", options);
    }

    date(options) {
        options = options || false;

        if(!options) {
            return {
                "type": "date"
            }
        }

        return this.parseOptions("date", options);
    }

    datetime(options) {
        options = options || false;

        if(!options) {
            return {
                "type": "datetime"
            }
        }

        return this.parseOptions("datetime", options);
    }

    parseOptions(dataType, options) {

        var obj = {};

        obj.type = dataType;

        Object.keys(options).forEach(function(key) {
            eval(`obj.${key}= options[key]`);
        });

        return obj;
    }

}

module.exports = new Form();