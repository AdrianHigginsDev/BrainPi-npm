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

        return this.parseOptions("string", options);
    }

    email(options) {
        options = options || false;

        if(!options) {
            return {
                "type": "email"
            }
        }

        return this.parseOptions("string", options);
    }

    boolean(options) {
        options = options || false;

        if(!options) {
            return {
                "type": "string"
            }
        }

        return this.parseOptions("string", options);
    }

    parseOptions(dataType, options) {

        var obj = {};

        obj.type = dataType;

        Object.keys(options).forEach(function(key) {
            eval(`obj.${key}= ${options[key]}`);
        });

        return obj;
    }

}

module.exports = new Form();