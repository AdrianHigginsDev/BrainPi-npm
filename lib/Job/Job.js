var Scheduler = require("./src/Scheduler");
const cron = require("node-cron");

class Job extends Scheduler {

    constructor() {
        super();
    }

    /*===========================================
        Run The Job File's task() Method!
    ============================================*/
    start() {

        if(this.config() == null)
            throw new Error("All Jobs Need To Have A Config Method With A Return Value!")

        const time  = /*if*/    this.config().timepattern == null ? this.everyMinute() 
                      /*else*/: this.config().timepattern,
              job   = this;

        cron.schedule(time, function() {
            job.task();
        });
    }

    /*===========================================
        Kills Job Process
    ============================================*/
    stop() {
        process.exit();
    }
}

module.exports = Job;