# Datenschnittpunkte
## Generelle Datenstrukturen
```json
{
    "User": {
        "UserID": "uuid v4",
        "RealName": "Max Mustermann",
        "EmailAddress": "kjdf",
        "BirthDate": "03.03.3333",
        "Course": "MIB",
        "AuthProvider": "google",
        "ProfileImg": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    }
}
```
```json
{
    "post": {
        "id": "uuid",
        "user_id": "",
        "datetime": "",
        "content": "",
        "media_link": ""
    }
}
```
CREATE TABLE User (
	UserID INT PRIMARY KEY NOT NULL,
	RealName VARCHAR(255) NOT NULL,
	EmailAddress VARCHAR(255) NOT NULL UNIQUE,
	BirthDate INT,
	Course VARCHAR(255),
	AuthProvider VARCHAR(255),
	ProfileImg VARCHAR(255)
);

CREATE TABLE Post (
	PostID INT PRIMARY KEY NOT NULL,
	UserID INT,
	TimeAndDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	Content VARCHAR (1000),
	MediaLink VARCHAR(255),
	FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Comment (
	CommentID INT PRIMARY KEY NOT NULL,
	UserID INT,
	PostID INT,
	TimeAndDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	Content VARCHAR (1000),
	FOREIGN KEY (UserID) REFERENCES User(UserID),
	FOREIGN KEY (PostID) REFERENCES Post(PostID
#### Userprofil
#### Post
#### session Data
### Login
#### Frontend /google/login - newAcc
```json
// GET | api.lambda/google/login?token=xxxxx enthält Token in req.params
// Antwort:
{
    "body": {
        "isNewUser": true,
        "sessionData": {
            "id": "uuid v4",
            "token": "xxxxx",
            "name": "Max Mustermann",
        }
    }
}
```

#### Frontend /newacc
```json
// POST / api.lambda/updateProfile
{
    "sessionData": {},
    "body": {
        "user.Geburtstag": "03.03.3333",
        "user.Kurs": "MIB"
    }
}
// Response:
{
    "status": "ok"
}
```

# API-Endpunkte TS-Alumni
#### addUser === api.lambda/google/login?token=xxxx
```json
//Response:
{
    "sessionData": {},
    "body": {
        "user": {
            "name": "Max Mustermann",
            "email": ""
        }
    }
}
```

#### updateProfil - FE/Account-Einstellungsseite
```json
// POST | api.lambda/updateProfile
// Request:
{
    "sessionData": {},
    "body": {
        "user": {
            "google_id": "123456789",
            "name": "Max Mustermann",
            "email": "",
            "geburtstag": "03.03.3333",
            "kurs": "MIB"
        }
    }
}
// Response:
{
    "status": "ok"
}
```

#### getProfilById - zeige dein Profil mit allen Daten ab. // Zeige ein bestimmtes Profil an.
```json
// POST | api.lambda/getProfilById
// Request:
{
    "sessionData": {},
    "body": {
        "google_id": "uuid v4"
    }
}
// Response:
{
    "status": "ok",
    "body": {
        "real_name": "dafd",
        "birth_date": "03.03.3333",
        "course": "MIB",
        "profile_img": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    }
}
```
#### addPost
```json
// POST | api.lambda/addPost
// Request:
{
    "post": {
        "id": "uuid",
        "user_id": "",
        "datetime": "",
        "content": "",
        "media_link": ""
    }
}
// Response:
{
    "status": "ok"
}
```
#### getPostsByUserId - Hole alle Posts eines User
```json
// POST | api.lambda/getPostById?post_id=xxxx
// Request:
{
    "sessionData": {},
    "body": {
        "user_id": "uuid v4"
    }
}
// Response:
{
    "status": "ok",
    "posts": [
        {
            "id": "uuid",
            "user_id": "",
            "datetime": "",
            "content": "",
            "media_link": ""
        },
        {
            "id": "uuid",
            "user_id": "",
            "datetime": "",
            "content": "",
            "media_link": ""
        }
    ]
}
```
#### getAllPosts
#### deletePostById
#### addComment
#### deleteComment
#### LikePost

```json
```

# Benötige Routen
- Frontend sendet Token an Backend & erhält: 
    - Ist User neu true / false
    - Session Data für local Storage / Cookies
- Bei jeder API Anfrage (Backend):
    - Session Token mitsenden
