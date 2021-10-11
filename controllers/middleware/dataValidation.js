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

const productValidation = (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object({
      name: Joi.string()
          .required()
          .min(3),
      desc: Joi.string()
          .required()
          .min(3),
      price: Joi.number()
          .greater(0)
          .required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    req.session.message = error.details[0].message;
    return res.redirect('./add');
  }
  next();
}

// validates the values passed for an add to cart request
const addToCartValidation = (req, res, next) => {
  console.log(req.body);

  const schema = Joi.object({
    productID: Joi.string()
              .min(3)
              .required(),
    onCartPage: Joi.boolean()
              .required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    console.log(req.body);
    return res.status(400).send(error.details[0].message);
  }
  next();
}

// validates the values passed for a remove from cart request
const removeFromCartValidation = (req, res, next) => {
  const schema = Joi.object({
    productID: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

module.exports.productValidation = productValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.removeFromCartValidation = removeFromCartValidation;
module.exports.addToCartValidation = addToCartValidation;
