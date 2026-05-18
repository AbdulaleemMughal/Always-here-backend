import validator from 'validator';

export const validateEmail = (email: string) => {
    if(!validator.isEmail(email)) {
        throw new Error("Please enter the valid email");
    };
};