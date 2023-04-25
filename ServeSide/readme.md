## to create account for parent on website

```
[machine host]/parent/create

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

var raw = JSON.stringify({
  "name": "fady",
  "mail": "fadyraouf231@gmail.com",
  "password": "123",
  "age": "22",
  "phone": "01030298360"
});

type : post

response body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
if(ok)
here you will resevie status: 200
{
    "parent": {
        "status": "account successfully created",
        "_id": "6438060776b3f3a3fd00461d",
        "parentName": "fady",
        "parentMail": "fadyraouf231@gmail.com",
        "parentPhoneNumber": "01030298360",
        "parentAge": 22
    }
}

if(exist mail )
here you will resevie status: 409
{
    "parent": {
        "status": "this mail is already registered"
    }
}
```

## to log in through website

```
[machine host]/parent/login

request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

var raw = JSON.stringify({
  "mail": "fadyraouf231@gmail.com",
  "password": "123"
});

type : post

response body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
if(ok)
here you will resevie status: 200
{
    "parent": {
        "status": "correct password",
        "_id": "6438060776b3f3a3fd00461d",
        "parentName": "fady",
        "parentMail": "fadyraouf231@gmail.com",
        "parentPhoneNumber": "01030298360",
        "parentAge": 22,
        "parentProfilePic": "Profile/default.png"
    },
    "children": [
        {
            "studentID": "643809661762b3f8644329fb",
            "studentName": "fady",
            "studentUserName": "fady",
            "studentAge": 9,
            "studentPic": "Profile/default.png",
            "studentGrade": 1
        }
    ]
}


if(wrong mail  )
here you will resevie status: 404
{
    "parent": {
        "status": "wrong mail"
    }
}
if(wrong password  )
here you will resevie status: 200
{
    "parent": {
        "status": "wrong password"
    }
}
```

## to add student it should be from website after chosing add child

```
[machine host]/student/AddChild/id
id:it refer to parent id it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

var raw = JSON.stringify({
  "username": "fadiy",
  "password": "123",
  "name": "fady",
  "grade": "4"
});

type : post

response body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
if(ok)
here you will resevie status: 200
{
    "student": {
        "status": "Child was added successfully",
        "_id": "643810158c7ba4f1fb42411d",
        "studentName": "fady",
        "studentUserName": "fady",
        "studentPassword": "fady",
        "studentGrade": 9,
    }
}

if(exist username )
here you will resevie status: 409
{
    "student": {
        "status": "Username already exists"
    }
}
if(wrong user  )
here you will resevie status: 404
{
    "parent": {
        "status": "wrong mail"
    }
}
if(wrong id  )
here you will resevie status: 500

```

## for parent to add data from website that will appear to student in mobile

```
[machine host]/FSE/InsertData/id
id:it refer to parent id it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

ar formdata = new FormData();
formdata.append("grade", "1");  mandtory
formdata.append("subject", "en"); mandtory
formdata.append("wordar", "كلب"); not  mandtory
formdata.append("worden", "dog"); not mandtory
formdata.append("image", fileInput.files[0], "/C:/Users/f0/Pictures/Screenshots/Screenshot (45).png"); not mandtory
formdata.append("sentence", "yesterday i saw dog "); not mandtory
formdata.append("number", "1"); not mandtory
type : post

if(ok)
here you will resevie status: 200
{
    "status": "inserting question succssufully"
}
```

## for parent to show data that previosuly insert

```
[machine host]/FSE/TakeData/id
id:it refer to parent id it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

var raw = JSON.stringify({
  "grade": 1,
  "subject": "en"
});
type : post

if(ok)
here you will resevie status: 200
{
    "data": [
        {
            "dataId": "64381560eacc7abc90deece8",
            "parentId": "6436d8f044bd5589e237d3b5",
            "gradeNo": 1,
            "subjectName": "en",
            "imageUrl": "FSEimage\\dog_1681397088405.png",
            "definitionInAc": "كلب",
            "definitionInEn": "dog",
            "sentence": "yesterday i saw dog",
            "numbers": "1",
            "createdAt": "2023-04-13T14:44:48.421Z",
            "updatedAt": "2023-04-13T14:44:48.421Z"
        },
        {
            "dataId": "643818e5cb5f3327b9284837",
            "parentId": "6436d8f044bd5589e237d3b5",
            "gradeNo": 1,
            "subjectName": "en",
            "imageUrl": "FSEimage\\dog_1681397989670.png",
            "definitionInAc": "كلب1",
            "definitionInEn": "dog",
            "sentence": "yesterday i saw dog",
            "numbers": "1",
            "createdAt": "2023-04-13T14:59:49.688Z",
            "updatedAt": "2023-04-13T14:59:49.688Z"
        },
        {
            "dataId": "643818e9cb5f3327b9284839",
            "parentId": "6436d8f044bd5589e237d3b5",
            "gradeNo": 1,
            "subjectName": "en",
            "imageUrl": "FSEimage\\dog_1681397993974.png",
            "definitionInAc": "كلب2",
            "definitionInEn": "dog",
            "sentence": "yesterday i saw dog",
            "numbers": "1",
            "createdAt": "2023-04-13T14:59:53.980Z",
            "updatedAt": "2023-04-13T14:59:53.980Z"
        },
        {
            "dataId": "643818efcb5f3327b928483b",
            "parentId": "6436d8f044bd5589e237d3b5",
            "gradeNo": 1,
            "subjectName": "en",
            "imageUrl": "FSEimage\\dog_1681397999819.png",
            "definitionInAc": "كلب2",
            "definitionInEn": "dog",
            "sentence": "yesterday i saw dog",
            "numbers": "1",
            "createdAt": "2023-04-13T14:59:59.827Z",
            "updatedAt": "2023-04-13T14:59:59.827Z"
        }
    ]
}
if(error in grade or subject)
{
    "status": "No matching documents found"
}
```

## for parent to assign task from that previosuly inserted data

```
[machine host]/Task/AssignTask/id
id:it refer to student id that this task would be assigned  it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

var raw = JSON.stringify({
  "taskno": 1,
  "gamename": [
    "game1",
    "game2"
  ],
  "id1": "643818e5cb5f3327b9284837",
  "id2": "643818e9cb5f3327b9284839",
  "id3": "64381b0e3c83a88a67f37648",
  "id4": "64381b183c83a88a67f3764a",
  "id5": "64381b1c3c83a88a67f3764c",
  "id6": "64381b1f3c83a88a67f3764e"
});
type : post

if(ok)
here you will resevie status: 200
{
    "status": "Task assigned successfully"
}

if(repeated taskno)
here you will resevie status: 400
{
    "status": "TaskNumber already exists for the same StudentID"
}
```

## for mobile to order assigned tasks

```
[machine host]/Task/TakeTask/id
id:it refer to student id that this task would be assigned  it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

no req body
type : get

if(ok)
here status will be 200
[
    {
        "taskNumber": 1,
        "gameName": [
            "game1",
            "game2"
        ],
        "data": [
            {
                "taskId": "64381c183c83a88a67f37654",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398808660.png",
                "definitionInAc": "كلب7",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c1b3c83a88a67f37656",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398811355.png",
                "definitionInAc": "كلب8",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c1e3c83a88a67f37658",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398814921.png",
                "definitionInAc": "كلب9",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c213c83a88a67f3765a",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398817624.png",
                "definitionInAc": "كلب10",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c243c83a88a67f3765c",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398820340.png",
                "definitionInAc": "كلب11",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c273c83a88a67f3765e",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398823032.png",
                "definitionInAc": "كلب12",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            }
        ]
    },
    {
        "taskNumber": 2,
        "gameName": [
            "game1",
            "game2"
        ],
        "data": [
            {
                "taskId": "64381c183c83a88a67f37654",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398808660.png",
                "definitionInAc": "كلب7",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c1b3c83a88a67f37656",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398811355.png",
                "definitionInAc": "كلب8",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c1e3c83a88a67f37658",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398814921.png",
                "definitionInAc": "كلب9",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c213c83a88a67f3765a",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398817624.png",
                "definitionInAc": "كلب10",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c243c83a88a67f3765c",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398820340.png",
                "definitionInAc": "كلب11",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            },
            {
                "taskId": "64381c273c83a88a67f3765e",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398823032.png",
                "definitionInAc": "كلب12",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1"
            }
        ]
    }
]

if(there's no taskassigned)
here you will resevie status: 404
{
    "status": "No tasks found for this student ID."
}
```

## to log in from mobile as student by the account that parent create it for her child

```
[machine host]/student/StudentLogIn

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

var raw = JSON.stringify({
  "username": "fady",
  "password": "fady"
});

type : post

response body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
if(ok)
here you will resevie status: 200
{
    "student": {
        "status": "Correct password",
        "studentID": "643810158c7ba4f1fb42411d",
        "ParentID": "6438060776b3f3a3fd00461d",
        "studentName": "fady",
        "studentUserName": "fady",
        "studentAge": 9,
        "studentPic": "Profile/default.png",
        "studentGrade": 1
    }
}


if(wrong username  )
here you will resevie status: 404
{
    "student": {
        "status": "Wrong username"
    }
}
if(wrong password  )
here you will resevie status: 200
{
    "student": {
        "status": "Wrong password"
    }
}
```

## to order question to appear to mobile

```
[machine host]/FSE/FSEtakeQuestion/id
id:it refer to parent id it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
{
      "unit": "1",
    "lesson": "1",
    "stadge":"1"
}

type : post
```

<details>
  <summary>Click to expand/collapse</summary>
## to retry question 
```
[machine host]/FSE/FSEretryQuestion/id
id:it refer to parent id it should be embedded to api url

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

json body
{
"id1":"6394e708b273ac393b1576af",
"id2":"6394f2e38117cacee984adac",
"id3":"6394f3198117cacee984adae",
"id4":"6394e6c8cc354df7eb70c080",
"id5":"639501fe967794a33a9833ba",
"id6":"63950fc0e93fe394dc49bf1b"

}
type : get

```
## to update info for student
```

[machine host]/student/StudenUpdateInfo/id
id:it refer to student id it should be embedded to api url

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

forma data like this :
formdata.append("newusername", "abdallh");
formdata.append("newname", "abdallh");
formdata.append("newstage", "1");
type:patch

```
## to update pic for student
```

[machine host]/student/StudenUpdatePic/id
id:it refer to student id it should be embedded to api url

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
formdata.append("image", fileInput.files[0], "/C:/Users/f0/Desktop/grad_pro/game/jiraff.jpg");
type:patch

```
## to update password for student
```

[machine host]/student/StudentUpdatePassword/id
{
"newpassword":"fady"
}
type:patch

```
## to update info for parent
```

[machine host]/parent/ParentUpdateInfo/id
id:it refer to parent id it should be embedded to api url

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

forma data like this :
formdata.append("newmail", "fady@gmail.com");
formdata.append("newname", "fady");
formdata.append("newphonenumber", "1020");
formdata.append("newage", "5");
type:patch

```
## to update pic for parent
```

[machine host]/parent/ParentUpdatePic/id

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
id:it refer to parent id it should be embedded to api url
formdata.append("image", fileInput.files[0], "/C:/Users/f0/Desktop/grad_pro/game/messi.png");
type:patch

```
</details>
```
