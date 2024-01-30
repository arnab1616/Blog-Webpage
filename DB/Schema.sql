CREATE TABLE users(
    id SERIAL NOT NULL UNIQUE,
    email VARCHAR(100),
    password VARCHAR(255),
    fname VARCHAR(100),
    lname VARCHAR(100),
    userid VARCHAR(100),
    phonenumber VARCHAR(20),
    pic_url VARCHAR(255)
);
-- join --
SELECT taskcard.id,taskcard.projectname,taskcard.description,taskcard.reposetry_url,taskcard.file,taskcard.date,taskcard.houre,taskcard.min,users.email,users.userid,users.pic_url FROM taskcard 
JOIN users ON taskcard.email=users.email