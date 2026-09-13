<?php

session_start();

if (
    isset($_POST['name']) &&
    isset($_POST['email']) &&
    isset($_POST['password'])
) {

    $name = $_POST['name'];
    $email = $_POST['email'];

    $password = password_hash(
        $_POST['password'],
        PASSWORD_DEFAULT
    );

    include "database.php";

    try {

        $stmt = $conn->prepare(
            "INSERT INTO users (name, email, password)
             VALUES (?, ?, ?)"
        );

        $stmt->execute([
            $name,
            $email,
            $password
        ]);

        // Create session for the newly registered user
        $_SESSION['user_id'] = $conn->lastInsertId();
        $_SESSION['user_name'] = $name;

        // Go to home page
        header("Location: /luna/home.php");
        exit();

    } catch (PDOException $e) {

        echo "<h2>Registration Failed</h2>";
        echo "Email already exists or there was a database error.";

    }

} else {

    echo "<h2>Error</h2>";
    echo "Please fill all the fields.";

}

?>