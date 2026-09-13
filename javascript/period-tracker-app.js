// State variables
let currentDate = new Date();
let savedPeriodDays = new Set();
let selectedPeriodDays = new Set();

// Get HTML elements
const monthYearDisplay = document.getElementById('monthYearDisplay');
const calendarGrid = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const saveBtn = document.getElementById('saveBtn');
const statusMsg = document.getElementById('statusMsg');

//load period records from the database
async function loadPeriodRecords() {

    try {

        const response = await fetch(
            'period-crud.php?action=read'
        );

        const data = await response.json();

        if (data.success) {

            savedPeriodDays = new Set(
                data.records.map(
                    record => record.period_date
                )
            );

            selectedPeriodDays =
                new Set(savedPeriodDays);

            renderCalendar();

        } else {

            statusMsg.textContent =
                "Could not load records.";

        }

    } catch (error) {

        console.error(error);

        statusMsg.textContent =
            "Could not load records.";

    }

}


// -----------------------------------------
// RENDER CALENDAR
// -----------------------------------------

function renderCalendar() {

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    monthYearDisplay.textContent =
        `${monthNames[month]} ${year}`;


    // Remove old calendar days

    const dayElements =
        calendarGrid.querySelectorAll('.day');

    dayElements.forEach(
        el => el.remove()
    );


    // Find first day of month

    const firstDayIndex =
        new Date(
            year,
            month,
            1
        ).getDay();


    // Find number of days

    const totalDays =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    // Today's date

    const today =
        new Date();

    const todayStr =
        `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, '0')}-${String(
            today.getDate()
        ).padStart(2, '0')}`;


    // Empty cells before first day

    for (
        let i = 0;
        i < firstDayIndex;
        i++
    ) {

        const emptyCell =
            document.createElement('div');

        emptyCell.classList.add(
            'day',
            'empty'
        );

        calendarGrid.appendChild(
            emptyCell
        );
    }


    // Create calendar days

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dayCell =
            document.createElement('div');

        dayCell.classList.add('day');

        dayCell.textContent =
            day;


        const formattedMonth =
            String(month + 1).padStart(2, '0');

        const formattedDay =
            String(day).padStart(2, '0');


        const dateKey =
            `${year}-${formattedMonth}-${formattedDay}`;


        // Highlight today

        if (dateKey === todayStr) {

            dayCell.classList.add(
                'today'
            );

        }


        // Highlight period days

        if (
            selectedPeriodDays.has(
                dateKey
            )
        ) {

            dayCell.classList.add(
                'period'
            );

        }


        // Click date

        dayCell.addEventListener(
            'click',
            () => {

                if (
                    selectedPeriodDays.has(
                        dateKey
                    )
                ) {

                    selectedPeriodDays.delete(
                        dateKey
                    );

                    dayCell.classList.remove(
                        'period'
                    );

                } else {

                    selectedPeriodDays.add(
                        dateKey
                    );

                    dayCell.classList.add(
                        'period'
                    );

                }

            }
        );


        calendarGrid.appendChild(
            dayCell
        );

    }

}


// save button click event
saveBtn.addEventListener(
    'click',
    async () => {

        try {

            // CREATE new dates

            for (
                const date of selectedPeriodDays
            ) {

                if (
                    !savedPeriodDays.has(date)
                ) {

                    const formData =
                        new FormData();

                    formData.append(
                        'action',
                        'create'
                    );

                    formData.append(
                        'period_date',
                        date
                    );


                    await fetch(
                        'period-crud.php',
                        {
                            method: 'POST',
                            body: formData
                        }
                    );

                }

            }


            // DELETE unselected dates

            for (
                const date of savedPeriodDays
            ) {

                if (
                    !selectedPeriodDays.has(date)
                ) {

                    const response =
                        await fetch(
                            'period-crud.php?action=read'
                        );

                    const data =
                        await response.json();


                    const record =
                        data.records.find(
                            item =>
                                item.period_date === date
                        );


                    if (record) {

                        const formData =
                            new FormData();

                        formData.append(
                            'action',
                            'delete'
                        );

                        formData.append(
                            'id',
                            record.id
                        );


                        await fetch(
                            'period-crud.php',
                            {
                                method: 'POST',
                                body: formData
                            }
                        );

                    }

                }

            }

//record the saved period days
            await loadPeriodRecords();
            statusMsg.textContent =
                "Records saved successfully!";

            setTimeout(
                () => {
                    statusMsg.textContent = "";
                },
                3000
            );
        } catch (error) {

            console.error(error);

            statusMsg.textContent =
                "Something went wrong.";

        }

    }
);

//month navigation
prevMonthBtn.addEventListener(
    'click',
    () => {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );

        renderCalendar();

    }
);

nextMonthBtn.addEventListener(
    'click',
    () => {
        currentDate.setMonth(
            currentDate.getMonth() + 1
        );
        renderCalendar();
    }
);
//load
loadPeriodRecords();