<?php

session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        "success" => false,
        "message" => "Please login first."
    ]);

    exit();

}

$user_id = $_SESSION['user_id'];

include "database.php";

$action = $_POST['action'] ?? $_GET['action'] ?? '';


// CREATE
if ($action == "create") {

    $period_date = $_POST['period_date'] ?? '';

    if ($period_date == '') {

        echo json_encode([
            "success" => false,
            "message" => "Date is required."
        ]);

        exit();

    }

    $stmt = $conn->prepare(
        "SELECT id FROM period_days
         WHERE user_id = ? AND period_date = ?"
    );

    $stmt->execute([
        $user_id,
        $period_date
    ]);

    if ($stmt->fetch()) {

        echo json_encode([
            "success" => false,
            "message" => "This date is already saved."
        ]);

        exit();

    }

    $stmt = $conn->prepare(
        "INSERT INTO period_days (user_id, period_date)
         VALUES (?, ?)"
    );

    $stmt->execute([
        $user_id,
        $period_date
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Period date saved."
    ]);

    exit();
}

// READ
if ($action == "read") {

    $stmt = $conn->prepare(
        "SELECT id, period_date
         FROM period_days
         WHERE user_id = ?
         ORDER BY period_date ASC"
    );

    $stmt->execute([
        $user_id
    ]);

    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "records" => $records
    ]);

    exit();
}

// UPDATE
if ($action == "update") {

    $id = $_POST['id'] ?? '';
    $new_date = $_POST['period_date'] ?? '';

    if ($id == '' || $new_date == '') {

        echo json_encode([
            "success" => false,
            "message" => "Invalid data."
        ]);

        exit();

    }

    $stmt = $conn->prepare(
        "UPDATE period_days
         SET period_date = ?
         WHERE id = ? AND user_id = ?"
    );

    $stmt->execute([
        $new_date,
        $id,
        $user_id
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Period date updated."
    ]);

    exit();
}

// DELETE
if ($action == "delete") {

    $id = $_POST['id'] ?? '';

    if ($id == '') {

        echo json_encode([
            "success" => false,
            "message" => "Invalid record."
        ]);

        exit();

    }

    $stmt = $conn->prepare(
        "DELETE FROM period_days
         WHERE id = ? AND user_id = ?"
    );

    $stmt->execute([
        $id,
        $user_id
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Period date deleted."
    ]);

    exit();
}

// INVALID ACTION
echo json_encode([
    "success" => false,
    "message" => "Invalid action."
]);

?>