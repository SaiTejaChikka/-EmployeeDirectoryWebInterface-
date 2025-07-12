function validateForm() {
    let isValid = true;
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });

    // Required fields check
    const requiredFields = ['first-name', 'last-name', 'email', 'department'];
    requiredFields.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value.trim()) {
            isValid = false;
            field.nextElementSibling.textContent = 'This field is required';
        }
    });

    // Email format validation
    if (email && !emailRegex.test(email)) {
        isValid = false;
        document.getElementById('email').nextElementSibling.textContent = 'Invalid email format';
    }

    return isValid;
}