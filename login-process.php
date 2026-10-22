<?php

session_start();

if (
    isset($_POST['name']) &&
    isset($_POST['password'])
) {

    $name = trim($_POST['name']);
    $password = $_POST['password'];

    //Admin login
    $admin_name = "Luna Admin";
    $admin_password = "Luna@admin12";

    // Check admin credentials first
    if ($name === $admin_name && $password === $admin_password) {

        // Create admin session
        $_SESSION['user_id'] = "admin";
        $_SESSION['user_name'] = $admin_name;
        $_SESSION['is_admin'] = true;

        // Send admin to admin page
        header("Location: /luna/admin.php");
        exit();
    }

    //User login
    include "database.php";

    try {

        $stmt = $conn->prepare(
            "SELECT * FROM users WHERE name = ?"
        );

        $stmt->execute([$name]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {

            if (password_verify($password, $user['password'])) {

                // Create session for regular user
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['is_admin'] = false;

                // Go to normal home page
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
