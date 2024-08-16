const Joi = require('joi');

const userSchema = Joi.object({

    name:Joi.string()
          .min(3)
          .max(30)
          .required()
          .messages({

            'string.base':'Name should be in text format',
            'string.empty': 'Name can not be empty',
            'string.min':'Name should have a minimum length of {#limit}',
            'string.max':'Name should have a maximum length of {#limit}',
            'any.required':'Name is rquired field'
          }),
    
    age:Joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({
            'number.base':'Age should be a number type',
            'number.min':'Age must be greater then or equals to {#limit}'
        })
});

module.exports={
    userSchema
};