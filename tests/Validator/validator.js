const ValidatorClass = require('../../utils/validator');
const assert = require('assert');

const config = {
    name: 5,
    password: 10
}

const Validator = new ValidatorClass(config);

const data = {
    name: "asdds",
    password: "2131232232"
}

const isValid = Validator.validate(data);

console.log(isValid);

