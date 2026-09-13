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
    <title>Luna - Journal Logging</title>
    <link rel="stylesheet" href="style/journal-style.css?v=2">
</head>
<body>

    <!-- Nav bar -->
    <nav class="navbar">
        <a href="home.php" class="nav-item">&larr; Back</a>
        <div class="nav-links">
            <a href="period-tracker.php" class="nav-item">Tracker</a>
            <a href="journal.php" class="nav-item active">Journal</a>
            <a href="phase-insight.php" class="nav-item">Insight</a>
        </div>
    </nav>

    <div class="container">
        <header class="page-header">
            <h1>Daily Health Journal</h1>
            <p>Log your symptoms, flow, mood, and reflections for your recorded cycle dates.</p>
        </header>

        <!-- Dynamic List of Journal Cards -->
        <main id="journalList" class="journal-list">
            <!-- Cards will come here by JavaScript -->
        </main>
    </div>

        <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2026 Luna - Your Cycle Companion. All rights reserved.</p>
    </footer>
    <script src="javascript/journal-app.js?v=3"></script>
</body>
</html>