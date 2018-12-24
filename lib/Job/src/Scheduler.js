class Scheduler {

    constructor() {

    }

    everySecond() {
        return "* * * * * *";
    }

    everyMinute() {
        return "* * * * *";
    }

    onDayOfMonth( num ) {
        if( num <= 31 && num > 0)
            return `* * ${num} * *`;
        else 
            throw new Error("Day Of Month Cannot Exceed 31 or Fall Below 0!");
    }

    onDayOfWeek( dayOfWeek ) {
        return `* * * * ${dayOfWeek}`
    }
}

module.exports = Scheduler;