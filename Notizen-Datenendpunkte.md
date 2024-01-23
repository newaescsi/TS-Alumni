# Datenschnittpunkte
## Generelle Datenstrukturen
#### userProfil
```json
{
    "user": {
        "UserID": "uuid v4",
        "GoogleID": "123456789",
        "RealName": "Max Mustermann",
        "EmailAddress": "kjdf",
        "BirthDate": "03.03.3333",
        "Course": "MIB",
        "AuthProvider": "google",
        "ProfileImg": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "meta": {""}
    }
}
```
#### post
```json
{
    "post": {
        "post_id": "uuid",
        "user_id": "",
        "datetime": "",
        "content": "",
        "media_link": "",
        "like_id": {""},
    }
}
```
#### comment
```json
{
    "comment": {
        "comment_id": "uuid",
        "user_id": "",
        "post_id": "",
        "datetime": "",
        "content": "",
        "like_id": { "likes": "[userID, userID2, userID3]"}
    }
}
```
#### sessionData
```json
{
    "sessionData": {
        "id": "uuid v4",
        "name": "Max Mustermann"
    }
}
```

## Login
#### Frontend /google/login - newAcc
```json
// POST | api.lambda/google/login enthält Token
// Antwort:
{
    "body": {
        "isNewUser": true,
        "sessionData": {
            "id": "uuid v4",
            "name": "Max Mustermann"
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
    "status": "ok",
    "message": "Profile updated"
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
            "user_id": "adsf",
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
        "user_id": "uuid v4"
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
        "media_link": "",
        "likes": {}
    }
}
// Response:
{
    "status": "ok",
    "message": "Post added"
}
```
#### getPostsByUserId - Hole alle Posts eines User
```json
// POST | api.lambda/getPostsByUserId
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
    "filtered_posts": [
        {
            "id": "post-uuid",
            "user_id": "",
            "datetime": "",
            "content": "",
            "media_link": "",
            "like_id": {""}
        },
        {
            "id": "post-uuid",
            "user_id": "",
            "datetime": "",
            "content": "",
            "media_link": "",
            "like_id": {""}
        }
    ]
}
```
#### getAllPosts -- Hole alle Posts für den angemeldeten Nutzer
```json
// POST | api.lambda/getAllPosts
// Request:
{
    "sessionData": {}
}
// Response:
{
    "status": "ok",
    "message": "Posts fetched",
    "posts": [
        {
            "id": "post-id",
            "user_id": "1236789",
            "datetime": "",
            "content": "",
            "media_link": "",
            "like_id": {""}
        },
        {
            "id": "post-id",
            "user_id": "1236789",
            "datetime": "",
            "content": "",
            "media_link": "",
            "like_id": {""}
        }
    ]
}
```
#### deletePostById
```json
// DELETE | api.lambda/deletePostById
// Request:
{
    "sessionData": {},
    "body": {
        "post_id": "post-id"
    }
}
// Response:
{
    "status": "ok",
    "message": "Post deleted"
}
```
#### addComment
```json
// POST | api.lambda/addComment
// Request:
{
    "sessionData": {},
    "comment": {
        "id": "uuid",
        "user_id": "",
        "post_id": "",
        "datetime": "",
        "content": ""
    }
}
// Response:
{
    "status": "ok",
    "message": "Comment added"
}
```
#### deleteCommentById
```json
// DELETE | api.lambda/deleteCommentById
// Request:
{
    "sessionData": {},
    "body": {
        "comment_id": "comment-id"
    }
}
// Response:
{
    "status": "ok",
    "message": "Comment deleted"
}
```


# Benötige Routen
- Frontend sendet Token an Backend & erhält: 
    - Ist User neu true / false
    - Session Data für local Storage / Cookies
- Bei jeder API Anfrage (Backend):
    - Session Token mitsenden
