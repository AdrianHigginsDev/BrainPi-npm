var init   = require("../../Config/Init");
const fs   = require("fs");
const cron = require("node-cron");

class JobLoader {

    constructor() {
        this.configurationFile = init.readConfiguration();
        this.appDir            = this.configurationFile.app.dir;
        this.bootstrap         = this.appDir[this.appDir.length - 1] == "/" ? require(`${this.appDir}bootstrap/bootstrap`) : require(`${this.appDir}/bootstrap/bootstrap`);
        this.jobPath           = this.bootstrap.jobDirectory().path;
    }

    loadAll() {

        var jobs = [];

        var finalPath;

        if(this.appDir[this.appDir.length -1] == "/") {
            finalPath = this.appDir + this.jobPath;
        } else {
            finalPath = this.appDir + "/" + this.jobPath;
        }

        fs.readdirSync(`${finalPath}/`).forEach(file => {

            var file     = file.substring(0, file.length - 3);
            var jobClass = require(`${finalPath}/${file}`);

            var configuration = jobClass.config();

            if(configuration.timepattern == null) {
                jobs.push(["* * * * *", jobClass]);
            } else {
                jobs.push([configuration.timepattern, jobClass]);
            }
        });

        if(jobs.length > 0) {
            console.log("---------------------");
            console.log("Starting Cron Jobs...");
            console.log("---------------------");
            for(let i in jobs) {
                cron.schedule(jobs[i][0], function() {
                    jobs[i][1].task();
                });
            }
        }
    }

    loadSingle( className ) {

        var finalPath;

        if(this.appDir[this.appDir.length -1] == "/") {
            finalPath = this.appDir + this.jobPath;
        } else {
            finalPath = this.appDir + "/" + this.jobPath;
        }

        if (!fs.existsSync(`${finalPath}/${className}.js`) && !fs.existsSync(`${finalPath}/${className}.ts`)) {
            throw new Error(`File Not Found At: ${finalPath}/${className}`);
        }

        var jobClass = require(`${finalPath}/${className}`);

        console.log("---------------------");
        console.log("Starting Cron Jobs...");
        console.log("---------------------");

        jobClass.start();
  
    }
}

module.exports = new JobLoader();