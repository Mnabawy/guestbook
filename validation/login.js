const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};

    // convert empty fields to an empty string to use validator function
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is Required";
    }else if(!Validator.isEmail(data.email)){
        errors.email = "Email is Invalid";
    }

    // Pass Checks
    if(Validator.isEmpty(data.password)){
        errors.password = "Password Field is Required"
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }

}