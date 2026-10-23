<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luna - Your Cycle Companion</title>
    <link rel="stylesheet" href="style/home-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>

    <!-- Nav bar -->
    <nav class="navbar">
        <a href="home.php">
            <div class="nav-brand">Luna</div>
        </a>
        <div class="nav-links">
            <?php if (isset($_SESSION['user_id'])) { ?>
                <span class="nav-item">
                    Hey <?php echo htmlspecialchars($_SESSION['user_name']); ?>!
                </span>
                <a href="logout.php" class="btn-nav btn-login">Logout</a>
            <?php } else { ?>
                <!-- Guest user -->
                <a href="login.php" class="btn-nav btn-login">Login</a>
                <a href="signup.php" class="btn-nav btn-signup">Sign Up</a>
            <?php } ?>
        </div>
    </nav>

    <!-- Hero -->
    <header class="hero-section">
        <div class="hero-content">
            <span class="badge">Gentle & Inclusive Health Tracking</span>
            <h1>Understand Your Body, Embrace Your Rhythms</h1>
            <p>
                Luna is a simple, stigma-free menstrual health platform designed to help you easily track cycles,
                log holistic symptoms, and receive supportive phase insights tailored to your life.
            </p>
            <div class="hero-buttons">

                <?php if (!isset($_SESSION['user_id'])) { ?>

                    <a href="signup.php" class="btn btn-primary">
                        Start Tracking Free
                    </a>

                <?php } ?>
            </div>
        </div>
    </header>

    <!-- Features -->
    <section class="features-container">
        <h2 class="section-title">Designed for Your Well-being</h2>
        <div class="features-grid">

            <!-- Feature 1 -->
            <div class="feature-card">
                <div class="icon-wrapper">
                    <i class="fa-solid fa-calendar-days"></i>
                </div>
                <h3>Intuitive Cycle Tracker</h3>
                <p>Log period dates easily on our interactive calendar and observe clear patterns across cycle phases.</p>
                <a href="period-tracker.php" class="card-link">Launch Tracker &rarr;</a>
            </div>

            <!-- Feature 2 -->
            <div class="feature-card">
                <div class="icon-wrapper">
                    <i class="fa-solid fa-book-bookmark"></i>
                </div>
                <h3>Daily Health Journal</h3>
                <p>Track your flow intensity, moods, acne, cramps, and free-text reflections in one private place.</p>
                <a href="journal.php" class="card-link">View Journal &rarr;</a>
            </div>

            <!-- Feature 3 -->
            <div class="feature-card">
                <div class="icon-wrapper">
                    <i class="fa-solid fa-seedling"></i>
                </div>
                <h3>Phase Insights & Guidance</h3>
                <p>Gain actionable awareness into your follicular, ovulation, and luteal phases to better support your day.</p>
                <a href="phase-insight.php" class="card-link">View Insight &rarr;</a>
            </div>

            <!-- Feature 4 -->
            <div class="feature-card">
                <div class="icon-wrapper">
                    <i class="fa-solid fa-heart-pulse"></i>
                </div>
                <h3>Inclusive & Stigma-Free</h3>
                <p>Designed for everyone—from adolescents starting their first period to adults managing long-term health.</p>
                <a href="education.html" class="card-link">View Education &rarr;</a>
            </div>

        </div>
    </section>

<script src="javascript/period-reminder.js"></script>
    <!-- Luna Period Reminder Popup -->
    <div id="periodReminderModal" class="period-reminder-overlay" hidden>
        <div
            class="period-reminder-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="periodReminderTitle">
            <div class="period-reminder-icon">🌸</div>

            <h2 id="periodReminderTitle">A gentle reminder</h2>

            <p id="periodReminderMessage">
                Your period may be coming soon.
            </p>

            <p class="period-reminder-note">
                This is an estimate based on your recorded cycle.
            </p>

            <button type="button" id="periodReminderOk">
                OK
            </button>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2026 Luna - Your Cycle Companion. All rights reserved.</p>
    </footer>

</body>

</html>