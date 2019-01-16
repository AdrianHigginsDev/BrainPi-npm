class Validator {

    constructor(errors) {
        this.errors = errors;
    }

    hasErrors() {

        return Object.keys(this.errors).length > 0;

    }

    fields() {
        var returnList = [];
        Object.keys(this.errors).forEach(function(key) {
            returnList.push(key);
        });

        return returnList;
    }

}

module.exports = Validator;