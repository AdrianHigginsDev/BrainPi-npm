// Open configure.json
'use strict';

const fs = require('fs');

class Init {
    constructor() {
        this.configurationData = fs.readFileSync('./configure.json');
    }

    readConfiguration() {
        return JSON.parse(this.configurationData);
    }

    logConfiguration() {
        const data = this.readConfiguration();
        console.log(data);
    }

}

module.exports = new Init();

