const Shock     = require("../Shock/Shock"),
      Validator = require("./src/Validator");
      moment    = require("moment")

class Model extends Shock {

    /*===========================================
        Set Prop Values
    ============================================*/
    set( property ) { 

        
        var currentClass = this,
            guard        = this.guard();

        Object.keys(property).forEach(function(key) {
            if(!guard.includes(key))
                eval(`currentClass.${key} = property[[key]]`);
        })    
    }


    static validate(request) {

        const model = this;
        
        if(typeof this.validator == "undefined") {
            throw new Error("Cannot Call Validate On A Model Without A validator() Function Defined!")
        }

        if(request == null) {
            throw new Error("Passed In Null Request To Validate")
        }

        const formValidations = this.validator(),
              parseBody       = request.body;

        var validation_errors = {};

        Object.keys(formValidations).forEach(function(key) {

            const request_val = parseBody[key],
                  form_val    = formValidations[key];

            eval(`validation_errors.${key} = [];`);

            if(request_val == null) {

                if(form_val.null != null) {
                    if(!form_val.null)
                        eval(`validation_errors.${key}.push("Cannot Be Null")`);
                }
            
            } else {

                switch(form_val.type) {

                    case "id":
                        if(isNaN(request_val))
                            eval(`validation_errors.${key}.push("Please Include Numbers Only")`);

                        break;

                    case "integer":
                        if(isNaN(request_val))
                            eval(`validation_errors.${key}.push("Please Include Numbers Only")`);

                        break;

                    case "string":
                        break;

                    case "boolean":
                        if(request_val != 'true' && request_val != 'false' 
                            && request_val != '0' && request_val != '1')
                                eval(`validation_errors.${key}.push("Must be True or False")`);
                            break;

                    case "email":
                        if(!model.isEmail(request_val))
                            eval(`validation_errors.${key}.push("Not A Valid Email Format")`);
                        break;

                    case "date":
                        if(!model.isValidDate(request_val, form_val))
                            eval(`validation_errors.${key}.push("Not A Valid Date Format")`);
                        break;

                    case "datetime":
                        if(!model.isValidDateTime(request_val, form_val))
                            eval(`validation_errors.${key}.push("Not A Valid DateTime Format")`);
                        break;
                }

                if(form_val.max != null) {
                    let spread = request_val.split("");

                    if(spread.length > form_val.max)
                        eval(`validation_errors.${key}.push("Cannot Contain More Than ${form_val.max} Characters")`);
                }

                if(form_val.min != null) {
                    let spread = request_val.split("");

                    if(spread.length < form_val.min)
                        eval(`validation_errors.${key}.push("Cannot Contain Less Than ${form_val.min} Characters")`);
                }
            }
            if(eval(`validation_errors.${key}`).length <= 0)
                eval(`delete validation_errors.${key};`)
        })

        return new Validator(validation_errors);
    }

    
    static class() {
        return this.name;
    }

    static isEmail(request_val) {
        if(request_val.includes("@")) {
            var split_val = request_val.split("@")[1];
            if(split_val.includes(".")) 
                return true;
            else
                return false;
        } else {
            return false;
        }
    }

    static isValidDate(request_val, form_val) {
        var pattern;

        if(form_val.pattern != null)
            pattern = form_val.pattern;
        else
            pattern = "MM-DD-YYYY";


        return moment(request_val, pattern).isValid()
    }

    static isValidDateTime(request_val, form_val) {
        var pattern;

        if(form_val.pattern != null)
            pattern = form_val.pattern;
        else
            pattern = "MM-DD-YYYY HH:mm:ss";


        return moment(request_val, pattern).isValid()
    }

}

module.exports = Model;