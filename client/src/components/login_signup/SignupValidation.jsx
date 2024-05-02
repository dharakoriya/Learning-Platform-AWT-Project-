// Function to validate name
function validateUsername(username) {
    if (username === "") {
        return "Name should not be empty";
    }
    return "";
}

// Function to validate email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        console.log("Email is empty");
        return "Email should not be empty";
    } else if (!emailPattern.test(email)) {
        console.log("Invalid email format ", email);
        return "Invalid email format";
    }
    console.log("Valid email ", email);
    return "";
}

// Function to validate password
function validatePassword(password) {
    // Function to check if password is not empty
    function validateNotEmpty(password) {
        if (password === "") {
            console.log("Password is empty");
            return "Password should not be empty";
        }
        return "";
    }

    // Function to check if password contains at least one digit
    function validateContainsDigit(password) {
        const digitPattern = /\d/;
        if (!digitPattern.test(password)) {
            console.log("Password does not contain a digit");
            return "Password must contain at least one digit";
        }
        return "";
    }

    // Function to check if password contains at least one lowercase letter
    function validateContainsLowercase(password) {
        const lowercasePattern = /[a-z]/;
        if (!lowercasePattern.test(password)) {
            console.log("Password does not contain a lowercase letter");
            return "Password must contain at least one lowercase letter";
        }
        return "";
    }

    // Function to check if password contains at least one uppercase letter
    function validateContainsUppercase(password) {
        const uppercasePattern = /[A-Z]/;
        if (!uppercasePattern.test(password)) {
            console.log("Password does not contain an uppercase letter");
            return "Password must contain at least one uppercase letter";
        }
        return "";
    }

    // Function to check if password is at least 8 characters long
    function validateLength(password) {
        if (password.length < 8) {
            console.log("Password is too short");
            return "Password must be at least 8 characters long";
        }
        return "";
    }

    // Main validation function for password
    let errors = [];
    errors.push(validateNotEmpty(password));
    errors.push(validateContainsDigit(password));
    errors.push(validateContainsLowercase(password));
    errors.push(validateContainsUppercase(password));
    errors.push(validateLength(password));

    // Remove empty strings from errors array
    errors = errors.filter(error => error !== "");

    return errors;
}

// Main validation function
function Validation(values) {
    let errors = {};

    // Validate email
    errors.email = validateEmail(values.email);

    // Validate password
    errors.password = validatePassword(values.password);

    // Validate Username
    errors.username = validateUsername(values.username);

    return errors;
}

export default Validation;
