<?php

session_start();

if (
    isset($_POST['name']) &&
    isset($_POST['password'])
) {

    $name = $_POST['name'];
    $password = $_POST['password'];

    include "database.php";

    try {

        $stmt = $conn->prepare(
            "SELECT * FROM users WHERE name = ?"
        );

        $stmt->execute([$name]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {

            if (password_verify($password, $user['password'])) {

                // Create session for logged-in user
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];

                // Go to home page
                header("Location: /luna/home.php");
                exit();

            } else {

                echo "<script>
                        alert('Incorrect password. Please try again.');
                        window.location.href = 'login.php';
                      </script>";

            }

        } else {

            echo "<script>
                    alert('User doesnt exist, make an account to continue.');
                    window.location.href = 'signup.php';
                  </script>";

        }

    } catch (PDOException $e) {

        echo "<h2>Login Failed</h2>";
        echo "There was a database error.";

    }

} else {

    echo "<h2>Error</h2>";
    echo "Please fill all the fields.";

}
?>