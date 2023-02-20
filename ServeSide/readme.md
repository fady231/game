
## to create account for parent on website
```
localhost:3000/parent/create
json body like this : 
{    
    "name": "fady",
    "mail": "fady2@gmail.com",
    "password": "(12345678)",
    "age": "22",
    "phone":"01030298360"
}
type : post
```


## to log in through website 
```
localhost:3000/parent/login

json body like this :
{
    "mail": "fady2@gmail.com",
    "password": "(12345678)"
}

type :post 
```

## to create student account it should be from website after chosing add child 
```
localhost:3000/student/AddChild/id 
id:it refer to parent id it should be embedded to api url 

json body like this :
{    
    "username": "student1",
    "name": "student@net",
    "password": "123",
    "age": "9",
    "stage":"1"
}
type : post 
```

## for parent to add question from website that will appear to student in mobile 
```
localhost:3000/FSE/FSEinsertQuestion/id
id:it refer to parent id it should be embedded to api url 
formdata.append("stadge", "1");
formdata.append("unit", "1");
formdata.append("lesson", "1");
formdata.append("defintionac", "اهلاوي");
formdata.append("defintionen", "donkey");
formdata.append("image", fileInput.files[0], "/C:/Users/f0/Desktop/grad_pro/game/donkey.jpg");
type : post
```


## to log in from mobile as student by the account that parent create it for her child 
```
localhost:3000/student/StudentLogIn
json body like this :
{
    "username": "student1",
    "password": "123"
}
type : post 
```

## to order question to appear to mobile 
```
localhost:3000/FSE/FSEtakeQuestion/id
id:it refer to parent id it should be embedded to api url 
json body like this : 

{
      "unit": "1",
    "lesson": "1",
    "stadge":"1"
}

type : post 
```

## to retry question 
```
localhost:3000/FSE/FSEretryQuestion/id
id:it refer to parent id it should be embedded to api url 
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
localhost:3000/student/StudenUpdateInfo/id
id:it refer to student id it should be embedded to api url 
forma data  like this :
formdata.append("newusername", "abdallh");
formdata.append("newname", "abdallh");
formdata.append("newstage", "1");
type:patch
```
## to update pic for student 
```
localhost:3000/student/StudenUpdatePic/id
id:it refer to student id it should be embedded to api url 
formdata.append("image", fileInput.files[0], "/C:/Users/f0/Desktop/grad_pro/game/jiraff.jpg");
type:patch
```
## to update password for student 
```
localhost:3000/student/StudentUpdatePassword/id
{
"newpassword":"fady"
}
type:patch
```
## to update info for parent 
```
localhost:3000/parent/ParentUpdateInfo/id
id:it refer to parent id it should be embedded to api url 
forma data  like this :
formdata.append("newmail", "fady@gmail.com");
formdata.append("newname", "fady");
formdata.append("newphonenumber", "1020");
formdata.append("newage", "5");
type:patch
```
## to update pic for parent 
```
localhost:3000/parent/ParentUpdatePic/id
id:it refer to parent id it should be embedded to api url 
formdata.append("image", fileInput.files[0], "/C:/Users/f0/Desktop/grad_pro/game/messi.png");
type:patch
```
## to update password for parent 
```
localhost:3000/parent/ParentUpdatePassword/id
{
"newpassword":"fady"
}
type:patch
```