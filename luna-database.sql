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

select * from users;
select * from period_days;
select * from journal_entries;

-- Passwords
-- Om - omgohil
-- Gwen Stacy - gwenstacy
-- Brinda Das - brindadas