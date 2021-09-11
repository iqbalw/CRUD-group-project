//validation package
const Joi = require("@hapi/joi");

//register validation function checks that the schema meets the requirements
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    type: Joi.string().min(4).required(),
  });
  return schema.validate(data);
  // res.send(error.details[0].message)
};

//login validation function --> todo 
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
  // res.send(error.details[0].message)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
