<?php

session_start();

header('Content-Type: application/json');

include "database.php";

$action = $_POST['action'] ?? $_GET['action'] ?? '';


// -----------------------------------------
// READ USERS
// -----------------------------------------

if ($action === 'read') {

    try {

        $stmt = $conn->prepare(
            "SELECT id, name, email
             FROM users
             ORDER BY id ASC"
        );

        $stmt->execute();

        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'users' => $users
        ]);

    } catch (PDOException $e) {

        echo json_encode([
            'success' => false,
            'message' => 'Database error.'
        ]);

    }

    exit();
}


// -----------------------------------------
// DELETE USER
// -----------------------------------------

if ($action === 'delete') {

    $id = $_POST['id'] ?? '';

    if ($id === '') {

        echo json_encode([
            'success' => false,
            'message' => 'Invalid user.'
        ]);

        exit();
    }

    try {

        $stmt = $conn->prepare(
            "DELETE FROM users
             WHERE id = ?"
        );

        $stmt->execute([
            $id
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'User deleted successfully.'
        ]);

    } catch (PDOException $e) {

        echo json_encode([
            'success' => false,
            'message' => 'Unable to delete user.'
        ]);

    }

    exit();
}


// -----------------------------------------
// INVALID ACTION
// -----------------------------------------

echo json_encode([
    'success' => false,
    'message' => 'Invalid action.'
]);

?>