const validateEmail = (email: string) => {
    const validator = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$');
    return validator.test(email);
};

const validatePassword = (password: string) => {
    const validator = new RegExp('^(?=.*[a-zA-Z0-9]).{8,}$');
    return validator.test(password);
};

interface FormValues {
    email: string;
    password: string;
}

export default function validateSignInForm({ email, password }: FormValues) {
    if (!validateEmail(email)) return { success: false, message: 'Invalid email' };
    if (!validatePassword(password)) return { success: false, message: 'Invalid password' };

    return { success: true };
}
