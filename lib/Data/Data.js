const config = require("../../../config/index");

class Data {

    open( string ) {
        config.load( string );
    }

}

modules.export = new Data();