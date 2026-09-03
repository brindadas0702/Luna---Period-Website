document.addEventListener('DOMContentLoaded', () => {
    const journalList = document.getElementById('journalList');

    // Fetch logged dates saved by the tracker calendar (defaults to sample dates if empty)
    let savedDates = JSON.parse(localStorage.getItem('luna_period_days') || '[]');
    
    // Fetch previously saved journal entries
    let journalData = JSON.parse(localStorage.getItem('luna_journal_entries') || '{}');

    // Fallback sample dates if no calendar dates are found in localStorage yet
    if (savedDates.length === 0) {
        const today = new Date().toISOString().split('T')[0];
        savedDates = [today];
    }

    // Sort dates in descending order (newest first)
    savedDates.sort((a, b) => new Date(b) - new Date(a));

    // Render cards for all logged dates
    renderJournalCards(savedDates, journalData);

    function renderJournalCards(dates, entries) {
        journalList.innerHTML = '';

        dates.forEach(dateStr => {
            const entry = entries[dateStr] || {
                flow: 'None',
                mood: 'Happy',
                symptoms: [],
                notes: ''
            };

            const formattedDate = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            const card = document.createElement('div');
            card.className = 'journal-card';
            card.innerHTML = `
                <div class="card-date">${formattedDate}</div>
                <form class="journal-form" data-date="${dateStr}">
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Flow Level</label>
                            <select class="dark-input flow-input">
                                <option value="None" ${entry.flow === 'None' ? 'selected' : ''}>None</option>
                                <option value="Light" ${entry.flow === 'Light' ? 'selected' : ''}>Light</option>
                                <option value="Medium" ${entry.flow === 'Medium' ? 'selected' : ''}>Medium</option>
                                <option value="Heavy" ${entry.flow === 'Heavy' ? 'selected' : ''}>Heavy</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Mood</label>
                            <select class="dark-input mood-input">
                                <option value="Happy" ${entry.mood === 'Happy' ? 'selected' : ''}>Happy 😊</option>
                                <option value="Calm" ${entry.mood === 'Calm' ? 'selected' : ''}>Calm 😌</option>
                                <option value="Sad" ${entry.mood === 'Sad' ? 'selected' : ''}>Sad 😢</option>
                                <option value="Tired" ${entry.mood === 'Tired' ? 'selected' : ''}>Tired 😴</option>
                                <option value="Irritable" ${entry.mood === 'Irritable' ? 'selected' : ''}>Irritable 😠</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 15px;">
                        <label>Physical Symptoms</label>
                        <select class="dark-input symptoms-input">
                            <option value="None" ${entry.symptoms === 'None' ? 'selected' : ''}>None</option>
                            <option value="Cramps" ${entry.symptoms === 'Cramps' ? 'selected' : ''}>Cramps</option>
                            <option value="Bloating" ${entry.symptoms === 'Bloating' ? 'selected' : ''}>Bloating</option>
                            <option value="Acne" ${entry.symptoms === 'Acne' ? 'selected' : ''}>Acne</option>
                            <option value="Headache" ${entry.symptoms === 'Headache' ? 'selected' : ''}>Headache</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Free-text Notes</label>
                        <textarea class="dark-input notes-input" placeholder="How are you feeling today?">${entry.notes || ''}</textarea>
                    </div>

                    <div class="card-actions">
                        <button type="submit" class="btn-save">Save Entry</button>
                        <span class="save-status"></span>
                    </div>
                </form>
            `;

            // Form Submit Event Handler
            const form = card.querySelector('.journal-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                saveEntry(dateStr, form);
            });

            journalList.appendChild(card);
        });
    }

    function saveEntry(dateStr, form) {
        const flow = form.querySelector('.flow-input').value;
        const mood = form.querySelector('.mood-input').value;
        const symptoms = form.querySelector('.symptoms-input').value;
        const notes = form.querySelector('.notes-input').value;

        // Save entry object under its respective date key
        journalData[dateStr] = { flow, mood, symptoms, notes };
        localStorage.setItem('luna_journal_entries', JSON.stringify(journalData));

        // Display temporary success feedback
        const statusSpan = form.querySelector('.save-status');
        statusSpan.textContent = "Saved!";
        setTimeout(() => {
            statusSpan.textContent = "";
        }, 2000);
    }
});