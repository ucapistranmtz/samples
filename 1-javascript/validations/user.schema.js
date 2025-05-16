const Joi = require("joi")

const userSchema= Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().trim().lowercase().required().messages({
  'string.email': 'The email should be valid',
  'any.required': 'email field is required'
}),
    password:Joi.string().min(6).required()
});

module.exports= { userSchema };