import Joi from 'joi';
import { ICreateUserInputPayload, IUpdateUserPayload } from '../models/userModel';

const userSchema: Joi.ObjectSchema<ICreateUserInputPayload> = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    identification_number: Joi.string().required(),
    referral_email: Joi.string().optional()
});

const userUpdateSchema: Joi.ObjectSchema<IUpdateUserPayload> = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    
});
 

export { userSchema, userUpdateSchema };