document.addEventListener('DOMContentLoaded', () => {

    // Get period dates from the database
    fetch('period-crud.php?action=read')
        .then(response => response.json())
        .then(data => {

            if (!data.success) {
                console.error('Unable to load period dates.');
                return;
            }

            const records = data.records;

            // No period dates recorded
            if (records.length === 0) {
                document.getElementById('currentDayBadge').textContent =
                    'Day -- of 28';

                return;
            }

            // Get all saved dates
            const savedDates = records.map(record => record.period_date);

            // Sort dates from oldest to newest
            savedDates.sort((a, b) => {
                return new Date(a) - new Date(b);
            });

            // Most recent recorded period date
            const lastPeriodStart =
                new Date(savedDates[savedDates.length - 1] + 'T00:00:00');

            // Today's date
            const today = new Date();

            // Remove time from today's date
            today.setHours(0, 0, 0, 0);

            // Calculate difference
            const diffTime = today - lastPeriodStart;

            let cycleDay = 1;

            // If the latest period date is today or earlier
            if (diffTime >= 0) {

                const diffDays =
                    Math.floor(
                        diffTime / (1000 * 60 * 60 * 24)
                    ) + 1;

                // Keep cycle within 28 days
                cycleDay =
                    ((diffDays - 1) % 28) + 1;
            }

            // -----------------------------------------
            // PHASE DETAILS
            // -----------------------------------------

            const phaseDetails = {

                menstrual: {

                    title: "Menstrual Phase",

                    badge:
                        `Day ${cycleDay} of 28`,

                    description:
                        "Your estrogen and progesterone levels are at their lowest. Your body is shedding its lining—prioritize rest, warmth, and gentle care.",

                    nutrition:
                        "Focus on iron-rich foods (spinach, lentils), warm stews, dark chocolate, and hydrating herbal teas.",

                    exercise:
                        "Light walking, gentle stretching, or restorative yoga. Avoid high-impact exercise if feeling fatigued.",

                    care:
                        "Use heating pads for cramps, prioritize 8+ hours of sleep, and minimize heavy daily stressors.",

                    activeStep:
                        "stepMenstrual"
                },

                follicular: {

                    title: "Follicular Phase",

                    badge:
                        `Day ${cycleDay} of 28`,

                    description:
                        "Estrogen levels are rising, boosting your energy, mood, and brain power. Great time to start new projects or challenges.",

                    nutrition:
                        "Incorporate fresh vegetables, lean proteins, fermented foods (kimchi, yogurt), and light grains.",

                    exercise:
                        "Increased energy allows for higher intensity: light cardio, resistance training, or dynamic dancing.",

                    care:
                        "Channel your high energy into social events, creative tasks, and planning upcoming goals.",

                    activeStep:
                        "stepFollicular"
                },

                ovulation: {

                    title: "Ovulatory Phase",

                    badge:
                        `Day ${cycleDay} of 28`,

                    description:
                        "Estrogen and LH peak. You are likely feeling confident, energetic, and communicative during this short phase window.",

                    nutrition:
                        "Choose anti-inflammatory foods, fresh fruits, berries, raw vegetables, and stay well hydrated.",

                    exercise:
                        "Peak performance phase—ideal for HIIT workouts, heavy lifting, or group sports.",

                    care:
                        "Great time for important conversations, presentations, and social engagements.",

                    activeStep:
                        "stepOvulation"
                },

                luteal: {

                    title: "Luteal Phase",

                    badge:
                        `Day ${cycleDay} of 28`,

                    description:
                        "Progesterone rises then falls. As your body prepares for a new cycle, energy levels naturally taper down.",

                    nutrition:
                        "Eat complex carbohydrates (sweet potatoes, oats) to balance blood sugar and reduce sweet cravings.",

                    exercise:
                        "Transition to moderate-to-light activities like pilates, swimming, or brisk walking.",

                    care:
                        "Practice journaling, reduce caffeine intake to minimize anxiety, and schedule calming downtime.",

                    activeStep:
                        "stepLuteal"
                }
            };


            // -----------------------------------------
            // DETERMINE CURRENT PHASE
            // -----------------------------------------

            let currentPhase =
                phaseDetails.menstrual;

            if (cycleDay >= 6 && cycleDay <= 13) {

                currentPhase =
                    phaseDetails.follicular;

            } else if (cycleDay >= 14 && cycleDay <= 16) {

                currentPhase =
                    phaseDetails.ovulation;

            } else if (cycleDay >= 17 && cycleDay <= 28) {

                currentPhase =
                    phaseDetails.luteal;
            }


            // -----------------------------------------
            // UPDATE PAGE
            // -----------------------------------------

            document.getElementById('currentDayBadge')
                .textContent = currentPhase.badge;

            document.getElementById('phaseTitle')
                .textContent = currentPhase.title;

            document.getElementById('phaseDescription')
                .textContent = currentPhase.description;

            document.getElementById('nutritionAdvice')
                .textContent = currentPhase.nutrition;

            document.getElementById('exerciseAdvice')
                .textContent = currentPhase.exercise;

            document.getElementById('careAdvice')
                .textContent = currentPhase.care;


            // -----------------------------------------
            // UPDATE PHASE PROGRESS
            // -----------------------------------------

            document.querySelectorAll('.phase-step')
                .forEach(step => {

                    step.classList.remove('active');

                });


            document.getElementById(
                currentPhase.activeStep
            ).classList.add('active');

        })

        .catch(error => {

            console.error(
                'Error loading period dates:',
                error
            );

        });

});