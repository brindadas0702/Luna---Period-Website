CREATE DATABASE luna;
USE luna;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE period_days (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    period_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE journal_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    journal_date DATE NOT NULL,
    flow VARCHAR(20) DEFAULT 'None',
    mood VARCHAR(20) DEFAULT 'Happy',
    symptoms VARCHAR(50) DEFAULT 'None',
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, journal_date)
);

CREATE TABLE period_reminder_dismissals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    expected_period_date DATE NOT NULL,
    dismissed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_reminder (
        user_id,
        expected_period_date
    )
);

select * from users;
select * from period_days;
select * from journal_entries;
select * from period_reminder_dismissals;

-- Passwords
-- Gwen Stacy - gwenstacy
-- Brinda Das - brindadas