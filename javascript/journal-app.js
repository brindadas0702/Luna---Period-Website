document.addEventListener(
'DOMContentLoaded',
() => {

const journalList =
document.getElementById(
    'journalList'
);


// Load journal
loadJournal();


//load journal entries and period records from the database
function loadJournal() {

fetch(
    'period-crud.php?action=read'
)

    .then(
        response =>
            response.json()
    )

    .then(
        periodData => {

            if (
                !periodData.success
            ) {

                journalList.innerHTML = `
                <p>
                    Unable to load your period records.
                </p>
            `;

                return;
            }


            const periodRecords =
                periodData.records;


            if (
                periodRecords.length === 0
            ) {

                journalList.innerHTML = `
                <p class="empty-message">
                    No period dates recorded yet.
                    Go to the Tracker and save your period dates first.
                </p>
            `;

                return;
            }


            // Load journal entries

            return fetch(
                'journal-crud.php?action=read'
            )

                .then(
                    response =>
                        response.json()
                )

                .then(
                    journalData => {

                        let journalEntries =
                            {};


                        if (
                            journalData.success
                        ) {

                            journalData.records.forEach(
                                entry => {

                                    journalEntries[
                                        entry.journal_date
                                    ] = entry;

                                }
                            );

                        }


                        renderJournalCards(
                            periodRecords,
                            journalEntries
                        );

                    }
                );

        }
    )

    .catch(
        error => {

            console.error(error);

            journalList.innerHTML = `
            <p>
                Unable to connect to the database.
            </p>
        `;

        }
    );

}

// RENDER JOURNAL CARDS
function renderJournalCards(
periodRecords,
entries
) {

journalList.innerHTML = '';


periodRecords.forEach(
    record => {

        const dateStr =
            record.period_date;


        const entry =
            entries[dateStr] || {

                flow: 'None',

                mood: 'Happy',

                symptoms: 'None',

                notes: ''

            };


        const formattedDate =
            new Date(
                dateStr + 'T00:00:00'
            )
                .toLocaleDateString(
                    'en-US',
                    {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }
                );


        const card =
            document.createElement(
                'div'
            );


        card.className =
            'journal-card';


        card.innerHTML = `

            <div class="card-date">
                ${formattedDate}
            </div>


            <form
                class="journal-form"
                data-date="${dateStr}"
                data-period-id="${record.id}"
            >

                <div class="form-grid">


                    <div class="form-group">

                        <label>
                            Flow Level
                        </label>

                        <select
                            class="dark-input flow-input"
                        >

                            <option
                                value="None"
                                ${entry.flow === 'None' ? 'selected' : ''}
                            >
                                None
                            </option>

                            <option
                                value="Light"
                                ${entry.flow === 'Light' ? 'selected' : ''}
                            >
                                Light
                            </option>

                            <option
                                value="Medium"
                                ${entry.flow === 'Medium' ? 'selected' : ''}
                            >
                                Medium
                            </option>

                            <option
                                value="Heavy"
                                ${entry.flow === 'Heavy' ? 'selected' : ''}
                            >
                                Heavy
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Mood
                        </label>

                        <select
                            class="dark-input mood-input"
                        >

                            <option
                                value="Happy"
                                ${entry.mood === 'Happy' ? 'selected' : ''}
                            >
                                Happy 😊
                            </option>

                            <option
                                value="Calm"
                                ${entry.mood === 'Calm' ? 'selected' : ''}
                            >
                                Calm 😌
                            </option>

                            <option
                                value="Sad"
                                ${entry.mood === 'Sad' ? 'selected' : ''}
                            >
                                Sad 😢
                            </option>

                            <option
                                value="Tired"
                                ${entry.mood === 'Tired' ? 'selected' : ''}
                            >
                                Tired 😴
                            </option>

                            <option
                                value="Irritable"
                                ${entry.mood === 'Irritable' ? 'selected' : ''}
                            >
                                Irritable 😠
                            </option>

                        </select>

                    </div>

                </div>


                <div
                    class="form-group"
                    style="margin-bottom: 15px;"
                >

                    <label>
                        Physical Symptoms
                    </label>

                    <select
                        class="dark-input symptoms-input"
                    >

                        <option
                            value="None"
                            ${entry.symptoms === 'None' ? 'selected' : ''}
                        >
                            None
                        </option>

                        <option
                            value="Cramps"
                            ${entry.symptoms === 'Cramps' ? 'selected' : ''}
                        >
                            Cramps
                        </option>

                        <option
                            value="Bloating"
                            ${entry.symptoms === 'Bloating' ? 'selected' : ''}
                        >
                            Bloating
                        </option>

                        <option
                            value="Acne"
                            ${entry.symptoms === 'Acne' ? 'selected' : ''}
                        >
                            Acne
                        </option>

                        <option
                            value="Headache"
                            ${entry.symptoms === 'Headache' ? 'selected' : ''}
                        >
                            Headache
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        Free-text Notes
                    </label>

                    <textarea
                        class="dark-input notes-input"
                        placeholder="How are you feeling today?"
                    >${entry.notes || ''}</textarea>

                </div>


                <!-- ACTION BUTTONS -->

<div class="card-actions">

<div class="button-group">

<button
type="submit"
class="btn-save"
>
Save Entry
</button>

<button
type="button"
class="btn-edit"
data-id="${record.id}"
data-date="${dateStr}"
>
Edit
</button>

<button
type="button"
class="btn-delete"
data-id="${record.id}"
data-date="${dateStr}"
>
Delete
</button>

</div>

<span class="save-status"></span>

</div>

            </form>

        `;

//save journal entry
        const form =
            card.querySelector(
                '.journal-form'
            );


        form.addEventListener(
            'submit',
            event => {

                event.preventDefault();

                saveEntry(
                    dateStr,
                    form
                );

            }
        );

//edit period date and associated journal entry
        const editButton =
            card.querySelector(
                '.btn-edit'
            );


        editButton.addEventListener(
            'click',
            () => {

                editPeriodDate(
                    record.id,
                    dateStr
                );

            }
        );

//delete period record and associated journal entry

        const deleteButton =
            card.querySelector(
                '.btn-delete'
            );


        deleteButton.addEventListener(
            'click',
            () => {

                deletePeriodRecord(
                    record.id,
                    dateStr
                );

            }
        );


        journalList.appendChild(
            card
        );

    }
);
}

// SAVE JOURNAL ENTRY
function saveEntry(
dateStr,
form
) {

const flow =
    form.querySelector(
        '.flow-input'
    ).value;


const mood =
    form.querySelector(
        '.mood-input'
    ).value;


const symptoms =
    form.querySelector(
        '.symptoms-input'
    ).value;


const notes =
    form.querySelector(
        '.notes-input'
    ).value;


const formData =
    new FormData();


formData.append(
    'action',
    'save'
);

formData.append(
    'journal_date',
    dateStr
);

formData.append(
    'flow',
    flow
);

formData.append(
    'mood',
    mood
);

formData.append(
    'symptoms',
    symptoms
);

formData.append(
    'notes',
    notes
);


fetch(
    'journal-crud.php',
    {
        method: 'POST',
        body: formData
    }
)
    .then(
        response =>
            response.json()
    )
    .then(
        data => {
         const statusSpan =
                form.querySelector(
                    '.save-status'
                );

            if (
                data.success
            ) {
                statusSpan.textContent =
                    'Saved!';
                setTimeout(
                    () => {
                        statusSpan.textContent =
                            '';
                    },
                    2000
                );

            } else {

                statusSpan.textContent =
                    'Save failed.';
            }
        }
    )

    .catch(
        error => {

            console.error(error);

            const statusSpan =
                form.querySelector(
                    '.save-status'
                );

            statusSpan.textContent =
                'Database error.';
        }
    );

}

// EDIT PERIOD DATE
function editPeriodDate(
id,
oldDate
) {

const newDate =
    prompt(
        'Enter the new date (YYYY-MM-DD):',
        oldDate
    );


if (!newDate) {

    return;

}


if (
    newDate === oldDate
) {

    return;

}


const formData =
    new FormData();


formData.append(
    'action',
    'update_period'
);

formData.append(
    'id',
    id
);

formData.append(
    'old_date',
    oldDate
);

formData.append(
    'new_date',
    newDate
);


fetch(
    'journal-crud.php',
    {
        method: 'POST',
        body: formData
    }
)
    .then(
        response =>
            response.json()
    )
    .then(
        data => {
            if (
                data.success
            ) {
                alert('Period date updated successfully!');
                loadJournal();

            } else {

                alert(
                    data.message
                );

            }

        }
    )

    .catch(
        error => {

            console.error(error);

            alert(
                'Database error.'
            );

        }
    );
}

// DELETE PERIOD RECORD
function deletePeriodRecord(
id,
dateStr
) {

const confirmDelete =
    confirm(
        'Are you sure you want to delete this period record? Your journal entry for this date will also be deleted.'
    );

if (!confirmDelete) {
    return;
}

const formData =
    new FormData();


formData.append(
    'action',
    'delete_period'
);

formData.append(
    'id',
    id
);

formData.append(
    'journal_date',
    dateStr
);

fetch(
    'journal-crud.php',
    {
        method: 'POST',
        body: formData
    }
)
    .then(
        response =>
            response.json()
    )
    .then(
        data => {
            if (
                data.success
            ) {
                alert(
                    'Period record deleted successfully!'
                );
                loadJournal();
            } else {
                alert(
                    data.message
                );
            }
        }
    )
    .catch(
        error => {
            console.error(error);
            alert(
                'Database error.'
            );
        }
    );
}
}
);