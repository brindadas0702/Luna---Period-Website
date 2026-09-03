document.getElementById('loginForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name === '' || password === '') {
        alert('Please fill in both your name and password.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    window.location.href = 'home.html';
});