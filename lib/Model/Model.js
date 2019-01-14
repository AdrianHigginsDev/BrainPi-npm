const Shock = require("../Shock/Shock");

class Model extends Shock {

    /*===========================================
        Set Prop Values
    ============================================*/
    set( property ) { 

        var classProps = this.fields();

        var currentClass = this;

        Object.keys(classProps).forEach(function(key) {
            eval(`currentClass.${key} = property[[key]]`);
        })    
    }

    
    static class() {
        return this.name;
    }

    // get( propertyName ) {
    //     return this.properties[propertyName];
    // }

}

module.exports = Model;