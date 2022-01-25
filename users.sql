DROP TABLE users;

CREATE TABLE users(
  username  VARCHAR(100) PRIMARY KEY,
  passcode  VARCHAR(100) NOT NULL,
  session_id uuid
);