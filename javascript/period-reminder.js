
document.addEventListener("DOMContentLoaded", async function () {

    const modal = document.getElementById("periodReminderModal");
    const message = document.getElementById("periodReminderMessage");
    const okButton = document.getElementById("periodReminderOk");

    // Stop if this page does not contain the reminder popup
    if (!modal || !message || !okButton) {
        return;
    }

    let expectedDate = null;

    // Ask PHP whether a reminder is due
    try {
        const response = await fetch(
            "period-reminder.php?action=check",
            {
                method: "GET",
                credentials: "same-origin",
                cache: "no-store"
            }
        );

        const data = await response.json();

        if (data.success && data.show) {
            expectedDate = data.expected_date;
            message.textContent = data.message;
            modal.hidden = false;
        }

    } catch (error) {
        console.error("Could not check period reminder:", error);
    }

    // Save the dismissal before closing the popup
    okButton.addEventListener("click", async function () {

        if (!expectedDate) {
            modal.hidden = true;
            return;
        }

        okButton.disabled = true;

        try {
            const formData = new FormData();
            formData.append("action", "dismiss");
            formData.append("expected_date", expectedDate);

            const response = await fetch("period-reminder.php", {
                method: "POST",
                body: formData,
                credentials: "same-origin"
            });

            const data = await response.json();

            if (response.ok && data.success) {
                modal.hidden = true;
            } else {
                alert("The reminder could not be dismissed. Please try again.");
            }

        } catch (error) {
            console.error("Could not save reminder dismissal:", error);
            alert("Could not save your reminder choice. Please try again.");

        } finally {
            okButton.disabled = false;
        }
    });
});
