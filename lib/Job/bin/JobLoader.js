class JobLoader {

    loadAll(cron, fs, dir) {

        var jobs = [];

        fs.readdirSync(`${dir}/app/jobs`).forEach(file => {

            var file     = file.substring(0, file.length - 3);
            var jobClass = require(`${dir}/app/jobs/${file}`);

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
}

module.exports = new JobLoader();