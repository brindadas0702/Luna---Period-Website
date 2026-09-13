<?php

session_start();

header('Content-Type: application/json');


// -----------------------------------------
// CHECK LOGIN
// -----------------------------------------

if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        'success' => false,
        'message' => 'Please login first.'
    ]);

    exit();
}


// -----------------------------------------
// DATABASE CONNECTION
// -----------------------------------------

include "database.php";

$user_id = $_SESSION['user_id'];


// -----------------------------------------
// GET ACTION
// -----------------------------------------

$action =
    $_POST['action']
    ?? $_GET['action']
    ?? '';


// -----------------------------------------
// SAVE JOURNAL ENTRY
// -----------------------------------------

if ($action === 'save') {

    $journal_date =
        $_POST['journal_date'] ?? '';

    $flow =
        $_POST['flow'] ?? 'None';

    $mood =
        $_POST['mood'] ?? 'Happy';

    $symptoms =
        $_POST['symptoms'] ?? 'None';

    $notes =
        $_POST['notes'] ?? '';


    if ($journal_date === '') {

        echo json_encode([
            'success' => false,
            'message' => 'Journal date is required.'
        ]);

        exit();
    }


    try {

        // Check if journal entry already exists

        $stmt = $conn->prepare(
            "SELECT id
             FROM journal_entries
             WHERE user_id = ?
             AND journal_date = ?"
        );


        $stmt->execute([
            $user_id,
            $journal_date
        ]);


        $existingEntry =
            $stmt->fetch(
                PDO::FETCH_ASSOC
            );


        if ($existingEntry) {

            // UPDATE journal entry

            $stmt = $conn->prepare(
                "UPDATE journal_entries
                 SET flow = ?,
                     mood = ?,
                     symptoms = ?,
                     notes = ?
                 WHERE id = ?
                 AND user_id = ?"
            );


            $stmt->execute([

                $flow,

                $mood,

                $symptoms,

                $notes,

                $existingEntry['id'],

                $user_id

            ]);


            echo json_encode([
                'success' => true,
                'message' =>
                    'Journal entry updated successfully.'
            ]);

        } else {

            // CREATE journal entry

            $stmt = $conn->prepare(
                "INSERT INTO journal_entries
                (
                    user_id,
                    journal_date,
                    flow,
                    mood,
                    symptoms,
                    notes
                )
                VALUES (?, ?, ?, ?, ?, ?)"
            );


            $stmt->execute([

                $user_id,

                $journal_date,

                $flow,

                $mood,

                $symptoms,

                $notes

            ]);


            echo json_encode([
                'success' => true,
                'message' =>
                    'Journal entry saved successfully.'
            ]);

        }

    } catch (PDOException $e) {

        echo json_encode([
            'success' => false,
            'message' => 'Database error.'
        ]);

    }

    exit();
}


// -----------------------------------------
// READ JOURNAL ENTRIES
// -----------------------------------------

if ($action === 'read') {

    try {

        $stmt = $conn->prepare(
            "SELECT
                id,
                journal_date,
                flow,
                mood,
                symptoms,
                notes
             FROM journal_entries
             WHERE user_id = ?
             ORDER BY journal_date DESC"
        );


        $stmt->execute([
            $user_id
        ]);


        $records =
            $stmt->fetchAll(
                PDO::FETCH_ASSOC
            );


        echo json_encode([
            'success' => true,
            'records' => $records
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
// EDIT PERIOD DATE
// -----------------------------------------

if ($action === 'update_period') {

    $id =
        $_POST['id'] ?? '';

    $old_date =
        $_POST['old_date'] ?? '';

    $new_date =
        $_POST['new_date'] ?? '';


    if (
        $id === ''
        || $old_date === ''
        || $new_date === ''
    ) {

        echo json_encode([
            'success' => false,
            'message' => 'Invalid date information.'
        ]);

        exit();
    }


    try {

        // Check if another period already uses new date

        $stmt = $conn->prepare(
            "SELECT id
             FROM period_days
             WHERE user_id = ?
             AND period_date = ?
             AND id != ?"
        );


        $stmt->execute([
            $user_id,
            $new_date,
            $id
        ]);


        if ($stmt->fetch()) {

            echo json_encode([
                'success' => false,
                'message' =>
                    'A period record already exists for this date.'
            ]);

            exit();
        }


        // Start transaction

        $conn->beginTransaction();


        // Update period date

        $stmt = $conn->prepare(
            "UPDATE period_days
             SET period_date = ?
             WHERE id = ?
             AND user_id = ?"
        );


        $stmt->execute([
            $new_date,
            $id,
            $user_id
        ]);


        // Update journal date

        $stmt = $conn->prepare(
            "UPDATE journal_entries
             SET journal_date = ?
             WHERE user_id = ?
             AND journal_date = ?"
        );


        $stmt->execute([
            $new_date,
            $user_id,
            $old_date
        ]);


        // Save changes

        $conn->commit();


        echo json_encode([
            'success' => true,
            'message' =>
                'Period date updated successfully.'
        ]);

    } catch (PDOException $e) {

        if ($conn->inTransaction()) {

            $conn->rollBack();

        }


        echo json_encode([
            'success' => false,
            'message' =>
                'Could not update the period date.'
        ]);

    }

    exit();
}


// -----------------------------------------
// DELETE PERIOD + JOURNAL ENTRY
// -----------------------------------------

if ($action === 'delete_period') {

    $id =
        $_POST['id'] ?? '';

    $journal_date =
        $_POST['journal_date'] ?? '';


    if (
        $id === ''
        || $journal_date === ''
    ) {

        echo json_encode([
            'success' => false,
            'message' => 'Invalid record.'
        ]);

        exit();
    }


    try {

        // Start transaction

        $conn->beginTransaction();


        // Delete journal entry

        $stmt = $conn->prepare(
            "DELETE FROM journal_entries
             WHERE user_id = ?
             AND journal_date = ?"
        );


        $stmt->execute([
            $user_id,
            $journal_date
        ]);


        // Delete period record

        $stmt = $conn->prepare(
            "DELETE FROM period_days
             WHERE id = ?
             AND user_id = ?"
        );


        $stmt->execute([
            $id,
            $user_id
        ]);


        // Save changes

        $conn->commit();


        echo json_encode([
            'success' => true,
            'message' =>
                'Period record deleted successfully.'
        ]);

    } catch (PDOException $e) {

        if ($conn->inTransaction()) {

            $conn->rollBack();

        }


        echo json_encode([
            'success' => false,
            'message' =>
                'Could not delete the period record.'
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