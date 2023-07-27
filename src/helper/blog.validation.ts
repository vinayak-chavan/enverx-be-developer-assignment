import Joi from 'joi';

export const addBlogValidation = (data: any) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).trim(true).required(),
        content: Joi.string().min(3).trim(true).required(),
        author: Joi.string().trim(true).required(),
        tags: Joi.string().default([])
    });

    return schema.validate(data);
};

export const updateBlogValidation = (data: any) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).trim(true),
        content: Joi.string().min(3).trim(true),
        author: Joi.string().trim(true),
        tags: Joi.string().default([])
    });

    return schema.validate(data);
};
