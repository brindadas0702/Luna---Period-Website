<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luna - Period Tracker</title>
    <link rel="stylesheet" href="style/period-tracker-style.css">
</head>

<body>

    <!-- Nav Bar -->
    <nav class="navbar">
        <a href="home.php" class="nav-item">&larr; Back</a>
        <div class="nav-links">
            <a href="period-tracker.php" class="nav-item active">Tracker</a>
            <a href="journal.php" class="nav-item">Journal</a>
            <a href="phase-insight.php" class="nav-item">Insight</a>
        </div>
    </nav>

    <!-- Main Container -->
    <main class="container">
        <header>
            <h1>Luna</h1>
            <p>Your Gentle Cycle Tracker</p>
        </header>

        <div class="tracker-card">
            <div class="calendar-header">
                <button class="nav-btn" id="prevMonth" aria-label="Previous Month">&lt;</button>
                <h2 id="monthYearDisplay"></h2>
                <button class="nav-btn" id="nextMonth" aria-label="Next Month">&gt;</button>
            </div>

            <div class="calendar-grid" id="calendarGrid">
                <!-- Day labels -->
                <div class="day-name">Sun</div>
                <div class="day-name">Mon</div>
                <div class="day-name">Tue</div>
                <div class="day-name">Wed</div>
                <div class="day-name">Thu</div>
                <div class="day-name">Fri</div>
                <div class="day-name">Sat</div>

                <!-- Days will be dynamically injected here -->
            </div>

            <div class="actions">
                <p class="instructions">Click dates to mark or unmark period days, then click <strong>Save Records</strong>.</p>
                <button class="btn-save" id="saveBtn">Save Records</button>
                <p class="status-msg" id="statusMsg"></p>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2026 Luna - Your Cycle Companion. All rights reserved.</p>
    </footer>

    <script src="javascript/period-tracker-app.js?v=3"></script>
</body>

</html>