# Luna — Your Cycle Companion 🌙

Luna is a menstrual-health website designed to make cycle tracking and self-reflection feel simple, supportive, and stigma-free. Users can record period dates, keep a daily health journal, explore cycle-phase information, and read educational content about menstrual health.

Note:Luna provides general educational information and cycle estimates. It is not a medical diagnostic tool and should not replace advice from a qualified healthcare professional.

## Features

- **Account registration and login** — create an account and sign in.
- **Period tracker** — record and review period dates in a calendar.
- **Daily health journal** — record flow, mood, symptoms, and personal notes for saved cycle dates.
- **Cycle-phase insights** — view an estimated cycle day and phase-related guidance.
- **Educational hub** — read accessible information about menstruation and lifelong health.
- **Admin interface** — includes a user-directory interface for viewing account records.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP
- **Database:** MySQL
- **Database access:** PHP PDO
- **Icons:** Font Awesome (loaded from CDN)


## Database Overview

Luna uses a MySQL database named `luna` to store user accounts, period tracking records, journal entries, and period reminder dismissals.

| Table | Purpose |
|---|---|
| `users` | Stores user account details, including name, email, and password hash. |
| `period_days` | Stores period dates linked to individual users. |
| `journal_entries` | Stores daily journal information, including flow, mood, symptoms, and personal notes. Each user can have one journal entry per date. |
| `period_reminder_dismissals` | Stores dismissed period reminders for each user to prevent the same reminder from appearing repeatedly for the same expected period date. |

### Database Relationships

- Each user can have multiple period records.
- Each user can have multiple journal entries, with one entry per date.
- Each user can dismiss multiple period reminders.
- Foreign key constraints maintain relationships between users and their period and journal records, with associated records deleted when a user is deleted.

### Database Setup

Create the database and tables by executing the SQL schema provided in the project’s database setup script.

## Important Notes

-Cycle-phase information is a simplified estimate based on saved period dates and a 28-day cycle assumption. Individual menstrual cycles vary, so predictions may not match every user's experience.

-Period reminders are estimates based on recorded dates and are intended for general awareness, not medical diagnosis.

-This project is intended for educational and demonstration purposes. Before public deployment, review authentication and authorization, especially for administrative pages, input validation, session security, CSRF protection, error handling, privacy practices, and database credential management.

-Menstrual and journal information is sensitive personal data. Use test data during development and never publish private user records.

## Future Improvements

- Allow users to customize their typical cycle length and period duration.

- Provide clearer cycle-history summaries and customizable reminder settings.

- Improve accessibility and conduct additional mobile-device testing.

- Strengthen authentication and access controls for administrative features.

- Store database credentials securely using environment configuration and provide detailed deployment instructions.

## License

No license is specified in this repository yet. Add a license file if you want to define how others may use, modify, and distribute the project.
