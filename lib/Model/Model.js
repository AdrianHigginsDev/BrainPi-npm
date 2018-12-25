const Shock = require("../Shock/Shock");

class Model extends Shock {

    constructor() {
        super();
        this.properties = null;
    }

    set( property ) { 
        var properties = {};
        Object.keys(property).forEach(function(key) {
            properties[[key]] = property[key];
        });

        this.properties = properties;
    }

    get( propertyName ) {
        return this.properties[propertyName];
    }

}

module.exports = Model;