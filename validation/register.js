const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //convert empty fields to an empty string to use validator function

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Checks 
    // Name 
    if (Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }

    // Email 
    if(Validator.isEmpty(data.email)){
        errors.email = "Email is Required";
    }else if(!Validator.isEmail(data.email)){
        errors.email = "Email is Invalid";
    }

    // password 
    if (Validator.isEmpty(data.password)){
        errors.password = "Password is Required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password Field is Required";
    }

    if (!Validator.isLength(data.password,{ min: 6, max: 30})) {
        errors.password = "Password Must be at Least 6 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
      }

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}