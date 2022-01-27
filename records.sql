DROP TABLE records;

CREATE TABLE records(
  youtubeurl  VARCHAR(100) PRIMARY KEY,
  spotifyid  VARCHAR(100) NOT NULL,
  username VARCHAR(100) REFERENCES users (username)
);