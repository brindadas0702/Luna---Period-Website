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

require "database.php";

$user_id = (int) $_SESSION['user_id'];
$action = $_POST['action'] ?? $_GET['action'] ?? '';

try {

    // CHECK WHETHER A REMINDER SHOULD BE SHOWN
    if ($action === "check") {

        $stmt = $conn->prepare(
            "SELECT period_date
             FROM period_days
             WHERE user_id = ?
             ORDER BY period_date DESC"
        );

        $stmt->execute([$user_id]);
        $dates = $stmt->fetchAll(PDO::FETCH_COLUMN);

        if (empty($dates)) {
            echo json_encode([
                "success" => true,
                "show" => false,
                "message" => "No period dates recorded."
            ]);
            exit();
        }


        // Find the most recent consecutive period dates to determine the start of the last period cycle.
        $latestDate = new DateTimeImmutable($dates[0]);
        $periodStart = $latestDate;
        $previousDate = $latestDate;

        for ($i = 1; $i < count($dates); $i++) {

            $currentDate = new DateTimeImmutable($dates[$i]);

            $difference = (int) $previousDate
                ->diff($currentDate)->format('%r%a');

            if ($difference !== -1) {
                break;
            }

            $periodStart = $currentDate;
            $previousDate = $currentDate;
        }

        // Default cycle length: 28 days
        $expectedDate = $periodStart->modify('+28 days');
        $today = new DateTimeImmutable(date('Y-m-d'));

        // Show from 3 days before the expected date
        // through the expected date itself.
        $reminderStart = $expectedDate->modify('-3 days');

        if ($today < $reminderStart || $today > $expectedDate) {
            echo json_encode([
                "success" => true,
                "show" => false
            ]);
            exit();
        }

        $expectedDateString = $expectedDate->format('Y-m-d');

        // Check whether this reminder was already dismissed
        $stmt = $conn->prepare(
            "SELECT id
             FROM period_reminder_dismissals
             WHERE user_id = ?
             AND expected_period_date = ?"
        );

        $stmt->execute([
            $user_id,
            $expectedDateString
        ]);

        if ($stmt->fetch()) {
            echo json_encode([
                "success" => true,
                "show" => false
            ]);
            exit();
        }

        echo json_encode([
            "success" => true,
            "show" => true,
            "expected_date" => $expectedDateString,
            "message" => "Your period may be coming soon."
        ]);
        exit();
    }

    // SAVE THE USER'S DISMISSAL
    if ($action === "dismiss") {

        $expectedDate = $_POST['expected_date'] ?? '';

        $dateObject = DateTimeImmutable::createFromFormat(
            '!Y-m-d',
            $expectedDate
        );

        if (
            !$dateObject ||
            $dateObject->format('Y-m-d') !== $expectedDate
        ) {
            echo json_encode([
                "success" => false,
                "message" => "Invalid expected date."
            ]);
            exit();
        }

        $stmt = $conn->prepare(
            "INSERT IGNORE INTO period_reminder_dismissals
             (user_id, expected_period_date)
             VALUES (?, ?)"
        );

        $stmt->execute([
            $user_id,
            $expectedDate
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Reminder dismissed."
        ]);
        exit();
    }

    echo json_encode([
        "success" => false,
        "message" => "Invalid action."
    ]);

} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to process the reminder."
    ]);
}
