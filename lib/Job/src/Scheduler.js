class Scheduler {

    constructor() {

        this.secondX     = null;
        this.minuteX     = "*";
        this.hourX       = "*";
        this.dayOfMonthX = "*";
        this.monthX      = "*";
        this.dayOfWeekX  = "*";

    }

    everySecond() {
        this.secondX = "*";

        return this;
    }

    everyMinute() {
        this.secondX = null;

        return this;
    }

    everyHour() {
        this.minuteX = "0";
        this.secondX = null;
        this.hourX   = "*";

        return this;
    }

    /** TIME BUILDER **/

    second(num, step) {
        step = step || false;

        if(num > 0 && num < 60) {

            if(step == false)
                this.secondX = num;
            else
                this.secondX = `*/${num}`;
                
        } else {
            throw new Error("Second must fall between 0 & 60!");
        }

        return this;
    }

    minute(num, step) {
        step = step || false;
        
        if(num > 0 && num < 60) {

            if(step == false)
                this.minuteX = num;
            else
                this.minuteX = `*/${num}`;

        } else {
            throw new Error("Minute must fall between 0 & 60!");
        }

        return this;
    }

    hour(num, step) {
        step = step || false;
        
        if(num >= 0 && num <= 23) {

            if(step == false)
                this.hourX = num;
            else
                this.hourX = `*/${num}`;

        } else {
            throw new Error("Hour Must Fall Between 0 & 23!");
        }

        return this;
    }

    month(num, step) {
        step = step || false;
        
        if(num >= 1 && num <= 12) {

            if(step == false)
                this.monthX = num;
            else
                this.monthX = `*/${num}`;
        } else {
            throw new Error("Month Must Fall Between 1 & 12!");
        }

        return this;
    }

    dayOfMonth(num, step) {
        step = step || false;
        
        if(num >= 1 && num <= 31) {

            if(step == false)
                this.dayOfMonthX = num;
            else
                this.dayOfMonthX = `*/${num}`;
        } else {
            throw new Error("Month Must Fall Between 1 & 31!");
        }

        return this;
    }

    dayOfWeek(num, step) {
        step = step || false;
        
        if(num >= 0 && num <= 6) {

            if(step == false)
                this.dayOfWeekX = num;
            else
                this.dayOfWeekX = `*/${num}`;

        } else {
            throw new Error("Month Must Fall Between 0 & 6! Ref: 0 = Sunday, 1 = Monday, etc.");
        }

        return this;
    }

    /** MANUAL -- Takes The * * * * * Format **/
    manual( manual ) {
        return manual;
    }

    /** Build **/ 
    build() {

        var returnVal = "";

        if(this.secondX != null) {
            returnVal += (this.secondX + " ");
        }

        returnVal += `${this.minuteX} ${this.hourX} ${this.dayOfMonthX} ${this.monthX} ${this.dayOfWeekX}`;

        console.log(returnVal)

        return returnVal;

    }
}

module.exports = Scheduler;