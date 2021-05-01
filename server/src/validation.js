const Joi = require("@hapi/joi");
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        department: Joi.string().min(1).max(255).required(),
        studentStatus: Joi.string().min(1).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        cpassword: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};

const registerCandValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        electionId: Joi.number().min(1).max(255).required(),
        department: Joi.string().min(1).max(255).required(),
        aboutYou: Joi.string().min(1).max(555).required(),
        studentStatus: Joi.string().min(1).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        cpassword: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};
module.exports = {
    registerValidation,
    loginValidation,
    registerCandValidation,
};