//validation package
const Joi = require("@hapi/joi");

//register validation function checks that the schema meets the requirements
const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next(); // move to next middleware
};

//login validation function 
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).render('login', { inputError: error.details[0].message });
  }
  next();
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
