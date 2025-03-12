
// Password validation
export const isValidPassword = (password: string): string | null => {
    switch (true) {
        case password.length < 6:
            return 'Password must be at least 6 characters long.';
        case password.length > 20:
            return 'Password must be at most 20 characters long.';
        case !/[a-zA-Z]/.test(password):
            return 'Password must include a letter.';
        case !/\d/.test(password):
            return 'Password must include a number.';
        case !/[!@#$%^&*]/.test(password):
            return 'Password must include a special character.';
        default:
            return null;
    }
};

// Email validation
export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length >= 3 && email.length <= 254;
};

// Confirm password validation
export const isConfirmPasswordMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
};





