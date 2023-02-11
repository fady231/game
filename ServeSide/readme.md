to create account for parent on website
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


//////////////////////////////////
to log in through website 
localhost:3000/parent/login

json body like this :
{
    "mail": "fady2@gmail.com",
    "password": "(12345678)"
}

type :post 

////////////////////////////////
to create student account it should be from website after chosing add child 
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
////////////////////////////////
for parent to add question from website that will appear to student in mobile 
localhost:3000/FSE/FSEinsertQuestion/id
id:it refer to student id it should be embedded to api url 
json body like this :
{    
    "unit": "1",
    "lesson": "1",
    "defintionen":"dog",
    "defintionac":"??? "
   
}
when uploading photo it should be on object name "thing"
type : post


///////////////////////////////
to log in from mobile as student by the account that parent create it for her child 
localhost:3000/student/StudentLogIn
json body like this :
{
    "username": "student1",
    "password": "123"
}
type : post 
/////////////////////////////
to order question to appear to mobile 
localhost:3000/FSE/FSEtakeQuestion/id
id:it refer to student id it should be embedded to api url 
json body like this : 
{
    "unit":1,
    "lesson":1
}
type : get 
the on request will give you 6 questions(image,unit,lesson,definiton in arabic , definition in english) filter them as you like
to retry question 
localhost:3000/FSE/FSEretryQuestion/id
id:it refer to student id it should be embedded to api url 
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