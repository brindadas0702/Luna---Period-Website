        // State variables
        let currentDate = new Date();
        // Set of saved period date strings ("YYYY-MM-DD")
        let savedPeriodDays = new Set(JSON.parse(localStorage.getItem('luna_period_days') || '[]'));
        // Temp set to track pending selections before hitting Save
        let selectedPeriodDays = new Set(savedPeriodDays);

        const monthYearDisplay = document.getElementById('monthYearDisplay');
        const calendarGrid = document.getElementById('calendarGrid');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const saveBtn = document.getElementById('saveBtn');
        const statusMsg = document.getElementById('statusMsg');

        // Render Calendar
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            // Display current Month and Year
            const monthNames = [
                "January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"
            ];
            monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

            // Clear previous day elements (keep top 7 header labels)
            const dayElements = calendarGrid.querySelectorAll('.day');
            dayElements.forEach(el => el.remove());

            // First day of month and total days in month
            const firstDayIndex = new Date(year, month, 1).getDay();
            const totalDays = new Date(year, month + 1, 0).getDate();

            // Today's date string for comparison
            const today = new Date();
            const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            // Add blank cells for alignment
            for (let i = 0; i < firstDayIndex; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('day', 'empty');
                calendarGrid.appendChild(emptyCell);
            }

            // Populate days
            for (let day = 1; day <= totalDays; day++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('day');
                dayCell.textContent = day;

                const formattedMonth = String(month + 1).padStart(2, '0');
                const formattedDay = String(day).padStart(2, '0');
                const dateKey = `${year}-${formattedMonth}-${formattedDay}`;

                // Highlight today
                if (dateKey === todayStr) {
                    dayCell.classList.add('today');
                }

                // Highlight selected or saved period days
                if (selectedPeriodDays.has(dateKey)) {
                    dayCell.classList.add('period');
                }

                // Toggle date selection on click
                dayCell.addEventListener('click', () => {
                    if (selectedPeriodDays.has(dateKey)) {
                        selectedPeriodDays.delete(dateKey);
                        dayCell.classList.remove('period');
                    } else {
                        selectedPeriodDays.add(dateKey);
                        dayCell.classList.add('period');
                    }
                });

                calendarGrid.appendChild(dayCell);
            }
        }

        // Save records to LocalStorage
        saveBtn.addEventListener('click', () => {
            savedPeriodDays = new Set(selectedPeriodDays);
            localStorage.setItem('luna_period_days', JSON.stringify(Array.from(savedPeriodDays)));
            
            statusMsg.textContent = "Records saved successfully!";
            setTimeout(() => { statusMsg.textContent = ""; }, 3000);
        });

        // Navigation Handlers
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        // Initial Initialization
        renderCalendar();