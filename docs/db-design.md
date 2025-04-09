# Database Design for Wedding Invitation Management Platform

## Tables

### 1. `users` (The couple managing the wedding)
| Column Name     | Data Type       | Constraints              | Description                             |
|------------------|----------------|--------------------------|-----------------------------------------|
| `id`            | UUID           | Primary Key              | Unique identifier for the user.         |
| `email`         | VARCHAR(255)   | Unique, Not Null         | Email of the user (login credential).   |
| `password_hash` | VARCHAR(255)   | Not Null                 | Hashed password for authentication.     |
| `created_at`    | TIMESTAMP      | Default: Current Time    | Timestamp when the user was created.    |
| `updated_at`    | TIMESTAMP      | Default: Current Time    | Timestamp for the last update.          |

### 2. `rsvp` (Guest RSVP submissions)
| Column Name           | Data Type       | Constraints              | Description                             |
|------------------------|----------------|--------------------------|-----------------------------------------|
| `id`                  | UUID           | Primary Key              | Unique identifier for each RSVP.        |
| `name`                | VARCHAR(255)   | Not Null                 | Name of the guest.                      |
| `email`               | VARCHAR(255)   |                          | Email of the guest (optional).          |
| `status`              | ENUM           | Default: 'pending'       | RSVP status: `pending`, `confirmed`, `declined`. |
| `companions`          | INTEGER        | Default: 0               | Number of additional attendees.         |
| `dietary_restrictions`| TEXT           |                          | Allergies or special food requirements. |
| `message`             | TEXT           |                          | Optional message left by the guest.     |
| `submitted_at`        | TIMESTAMP      | Default: Current Time    | Timestamp of the RSVP submission.       |
