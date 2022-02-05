
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL CHECK (POSITION('@' IN email)>1),
    is_admin  BOOLEAN DEFAULT FALSE NOT NULL,
    password VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	
);

INSERT INTO users (name, email, password)
VALUES('Friday User', 'user@friday.com', 'userpassword'),
    ('Friday Admin', 'admin@friday.com', 'adminpassword');

UPDATE users SET is_admin = true WHERE email = 'admin@friday.com';

SELECT * FROM users;
