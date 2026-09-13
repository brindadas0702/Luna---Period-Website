document.getElementById('signupForm').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name === '' || email === '' || password === '') {
        event.preventDefault();
        alert('Please fill out all required fields.');
        return;
    }

    if (password.length < 6) {
        event.preventDefault();
        alert('Password must be at least 6 characters long.');
        return;
    }
});