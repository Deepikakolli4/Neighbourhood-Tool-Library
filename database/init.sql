
-- https://bcrypt-generator.com/

ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET logging_collector = on;
ALTER SYSTEM SET log_directory = '/var/log/postgresql';
ALTER SYSTEM SET log_filename = 'postgresql.log';

-- CREATE DATABASE tool_library_db;

-- Drop tables if they already exist (for reset)
DROP TABLE IF EXISTS Reviews, DamageReports, Reservations, Tools, Users CASCADE;

-- Create Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK (role IN ('member', 'admin')) NOT NULL
);

-- Create Tools table
CREATE TABLE Tools (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT
);

-- Create Reservations table
CREATE TABLE Reservations (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES Tools(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'active', 'closed')) NOT NULL
);

-- Create DamageReports table
CREATE TABLE DamageReports (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES Tools(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES Users(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    resolved BOOLEAN DEFAULT FALSE
);

-- Create Reviews table
CREATE TABLE Reviews (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES Tools(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES Users(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT
);

-- Insert sample users
INSERT INTO Users (name, email, password_hash, role) VALUES
('Deepika', 'deepika@gmail.com', '$2a$12$6x93NE29tfWPlts2E4h21eeRC1W7Fl6QrQe4/UnNQpPL.au6rFhxu', 'admin'),  -- password1
('Bob Smith', 'bob@example.com', '$2a$12$bBVQ63UMfzHV7A4lxjpzheqvZT2t2FPJjyrSM.o0ZnQbofOLvxZj2', 'member'), -- password2
('Charlie Rose', 'charlie@example.com', '$2a$12$p9w0xrw4JpWSF6/mf21LxOAtIvB/hXw2/h83h/cOU6jDHLwQADBWu', 'member'); -- password3

-- Insert sample tools
INSERT INTO Tools (name, description, category, image_url) VALUES
('Power Drill', 'Cordless power drill with multiple speed settings', 'Power Tools', 'https://images.thdstatic.com/productImages/64a4c91c-622c-42a1-8313-7e408f604491/svn/milwaukee-power-drills-3601-22ct-64_400.jpg'),
('Lawn Mower', 'Electric lawn mower with 20-inch deck', 'Garden Tools', 'https://images.thdstatic.com/productImages/0efa3434-9aae-4daf-9210-579a7d181f63/svn/ryobi-electric-push-mowers-ryac130-s-64_600.jpg'),
('Hammer', '16 oz claw hammer with rubber grip', 'Hand Tools', 'https://images.thdstatic.com/productImages/91878ac1-c3e5-48b3-b864-e3b9c5de58aa/svn/stanley-claw-hammers-stht51457-64_400.jpg'),
('Hammer', 'Heavy-duty claw hammer for carpentry', 'Hand Tools', 'https://images.thdstatic.com/productImages/e082ae68-0104-466e-b3f9-f5849e074df6/svn/stanley-mallets-stht56144-64_400.jpg');

-- Insert sample reservations
INSERT INTO Reservations (tool_id, user_id, start_date, end_date, status) VALUES
(1, 2, '2025-04-01', '2025-04-05', 'active'),
(2, 3, '2025-04-10', '2025-04-15', 'pending'),
(3, 2, '2025-03-20', '2025-03-21', 'closed');

-- Insert sample damage reports
INSERT INTO DamageReports (tool_id, user_id, description, image_url, resolved) VALUES
(1, 2, 'Battery not charging properly', 'https://example.com/images/damage1.jpg', false),
(2, 3, 'Blade is bent and dull', 'https://example.com/images/damage2.jpg', true);

-- Insert sample reviews
INSERT INTO Reviews (tool_id, user_id, rating, comment) VALUES
(1, 2, 4, 'Worked great for my home project.'),
(2, 3, 2, 'Needed maintenance, wasn’t cutting well.'),
(3, 2, 5, 'Simple and effective, no issues.');

