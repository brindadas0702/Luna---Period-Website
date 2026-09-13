document.getElementById('loginForm').addEventListener('submit', function(event) {

    const name = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name === '' || password === '') {
        event.preventDefault();
        alert('Please fill in both your name and password.');
        return;
    }

    if (password.length < 6) {
        event.preventDefault();
        alert('Password must be at least 6 characters long.');
        return;
    }
});