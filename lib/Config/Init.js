// Open configure.json
'use strict';

const fs = require('fs');

class Init {
    constructor() {
        this.configurationData = fs.readFileSync('./configure.json');
    }

    /*===========================================
        Parse Config File
    ============================================*/
    readConfiguration() {
        return JSON.parse(this.configurationData);
    }

    /*===========================================
        Console Log Config File
    ============================================*/
    logConfiguration() {
        const data = this.readConfiguration();
        console.log(data);
    }

}

module.exports = new Init();

