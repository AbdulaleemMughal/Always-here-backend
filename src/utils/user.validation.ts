import validator from 'validator';

export const userValidation = (name: string, email: string, password: string) => {
    if(!name || name === "") {
        throw new Error("Name is required");
    }

    if(!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error("Try strong password.");
    }
};