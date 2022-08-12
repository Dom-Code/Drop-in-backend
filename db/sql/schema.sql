CREATE TABLE providers (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  specialty varchar(50) NOT NULL,
  city varchar(100) NOT NULL, 
  phone_number text NOT NULL,
  average_app_time varchar(100),
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  photo text NOT NUll
);

CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(50) NOT NULL UNIQUE, 
  pw varchar NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE blacklist_refresh_tokens (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  refresh_token varchar(200),
  blacklisted_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO providers (first_name, last_name, specialty, city,
phone_number, average_app_time, photo)
VALUES('Charles', 'Wen', 'Urology', 'San Ramon', '5102230421',
'5 weeks', './images/doc.png'), ('Ryan', 'Holiday', 'Orthopedics', 'Pleasanton', '5104320421', 
'4 weeks', './images/doc.png'), ('Stephen', 'Hanselman', 'Plastic', 'Oakland', '5102230341',
'8 weeks', './images/doc.png'), ('Maria', 'Popova', 'Plastic', 'San Francisco', '4152340023',
'8 weeks', './images/doc.png'), ('Gregory', 'Hays', 'Orthopedics', 'San Francisco', '7075340023',
'8 weeks', './images/doc.png');


