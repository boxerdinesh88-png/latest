-- Run this in Render PostgreSQL shell or any psql client
-- to create the contacts table manually if needed.

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verify:
-- \dt
-- SELECT * FROM contacts;
