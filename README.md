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

| Table | Purpose |
| `users` | Stores account name, email, and password hash |
| `period_days` | Stores period dates associated with each user |
| `journal_entries` | Stores a user's daily flow, mood, symptoms, and notes |

The registration handler hashes passwords with PHP's `password_hash()` and login verifies them with `password_verify()`.

## Important Notes

- Cycle-phase information is a simplified estimate based on saved period dates and a 28-day cycle assumption in the current JavaScript implementation. Individual cycles vary, so the estimate may not match every user's experience.
- This project is intended for learning and demonstration. Before public deployment, review authentication and authorization (especially administrative pages), input validation, session security, privacy practices, CSRF protection, error handling, and database credential management.
- Menstrual and journal information is sensitive personal data. Use test data while developing and do not publish private user records.

## Future Improvements

- Let users configure their typical cycle length and period duration.
- Add clearer cycle-history summaries and optional reminders.
- Improve accessibility and mobile testing.
- Add stronger access controls for administrative features.
- Move database secrets to environment configuration and add deployment documentation.

## License

No license is specified in this repository yet. Add a license file if you want to define how others may use, modify, and distribute the project.
