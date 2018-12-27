var Scheduler = require("./src/Scheduler");
const cron = require("node-cron");

class Job extends Scheduler {

    constructor() {
        super();
    }

    start() {

        if(this.config() == null) {
            throw new Error("All Jobs Need To Have A Config Method With A Return Value!")
        }

        var time = this.config().timepattern = null ? this.everyMinute() : this.config().timepattern;

        const job = this;

        cron.schedule(time, function() {
            job.task();
        });
    }

    stop() {
        process.exit();
    }
}

module.exports = Job;