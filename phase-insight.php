<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luna - Cycle Insights & Guidance</title>
    <link rel="stylesheet" href="style/phase-insight-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <!-- Nav Bar -->
    <nav class="navbar">
        <a href="home.php" class="nav-item">&larr; Back</a>
        <div class="nav-links">
            <a href="period-tracker.php" class="nav-item">Tracker</a>
            <a href="journal.php" class="nav-item">Journal</a>
            <a href="phase-insight.php" class="nav-item active">Insight</a>
        </div>
    </nav>

    <div class="container">
        <!-- Hero Phase Header -->
        <header class="insight-header card-glass">
            <span class="badge" id="currentDayBadge">Day -- of Cycle</span>
            <h1 id="phaseTitle">Menstrual Phase</h1>
            <p id="phaseDescription">
                Your body is resting and shedding the uterine lining. Prioritize rest, low-impact activity, and nourishing foods.
            </p>
        </header>

        <!-- Dynamic Phase Progress Indicator -->
        <section class="phase-tracker-card card-glass">
            <h2>Cycle Phase Overview</h2>
            <div class="phase-progress-bar">
                <div class="phase-step active" id="stepMenstrual">
                    <span class="step-dot"></span>
                    <span class="step-name">Menstrual</span>
                </div>
                <div class="phase-step" id="stepFollicular">
                    <span class="step-dot"></span>
                    <span class="step-name">Follicular</span>
                </div>
                <div class="phase-step" id="stepOvulation">
                    <span class="step-dot"></span>
                    <span class="step-name">Ovulation</span>
                </div>
                <div class="phase-step" id="stepLuteal">
                    <span class="step-dot"></span>
                    <span class="step-name">Luteal</span>
                </div>
            </div>
        </section>

        <!-- Phase-Specific Lifestyle Guidance -->
        <section class="section-container">
            <h2 class="section-heading">Lifestyle & Wellness Guidance</h2>
            <div class="guidance-grid">
                
                <!-- Nutrition -->
                <div class="guidance-card card-glass">
                    <div class="card-icon"><i class="fa-solid fa-apple-whole"></i></div>
                    <h3>Nutrition & Foods</h3>
                    <p id="nutritionAdvice">Focus on iron-rich foods like leafy greens, warm soups, and hydrating teas to support your body.</p>
                </div>

                <!-- Exercise -->
                <div class="guidance-card card-glass">
                    <div class="card-icon"><i class="fa-solid fa-person-walking"></i></div>
                    <h3>Exercise & Movement</h3>
                    <p id="exerciseAdvice">Gentle stretching, restorative yoga, or light walking. Avoid high-intensity workouts during heavy days.</p>
                </div>

                <!-- Emotional Care -->
                <div class="guidance-card card-glass">
                    <div class="card-icon"><i class="fa-solid fa-spa"></i></div>
                    <h3>Self-Care & Sleep</h3>
                    <p id="careAdvice">Ensure 7–9 hours of sleep, use heating pads for cramps, and give yourself extra grace.</p>
                </div>

            </div>
        </section>

    </div>

        <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2026 Luna - Your Cycle Companion. All rights reserved.</p>
    </footer>
    <script src="javascript/phase-insight-app.js?v=2"></script>
</body>
</html>