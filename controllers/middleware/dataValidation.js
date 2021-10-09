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
    req.session.message = error.details[0].message;
    return res.redirect('./register');
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
    req.session.message = error.details[0].message;
    return res.redirect('./login');
  }
  next();
};

const productValidation = (data) => {
  const schema = Joi.object({
      name: Joi.string()
          .required()
          .min(6),
      desc: Joi.string()
          .required()
          .min(6),
      price: Joi.number()
          .greater(0)
          .required()
  });
  return schema.validate(data);
}

module.exports.productValidaiton = productValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
