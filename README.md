# todolist
download this repository.
then navigate to the root folder in any terminal e.g hyperterminal or vscode terminal where you'll see server.js etc file.
then run command : 
1. npm install  <-- to install required packages. after npm install finised executing run :- nodemon server.js
2. nodemon server.js <--- to run the server.

Note:- this will run on port 4000 not 3000.
server will start running and listening to requests

i'm pushing my database credentials with this repository if someone steals then create new cluster in mongodb
and paste username and password in config.env file in root folder

NODE_ENV=development 
PORT=4000
DATABASE=mongodb+srv://pasteUsernameHere:<db_password>@cluster0.obqov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 
DATABASE_PASSWORD=pastePasswordhere
JWT_SECRET=hello_this_is_mySecret_not_really_a_Secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

then save the config.env file with changes and restart server with nodemon server.js
here's the example of functionality :- https://drive.google.com/drive/folders/1ZpNpT3q-L_xIrp9lQ09zaUZKAzLDVbVr?usp=sharing

commands
1. to create task send POST request to localhost:4000/tasks  with data eg. {
    "title":"order some food",
    "description":"order pasta and some groceries etc."
}
2. to fetch all task send GET request to localhost:4000/tasks
   it will return all tasks
3. to fetch task with an id send GET request to  localhost:4000/tasks/:id e.g localhost:4000/tasks/677452b9deaa812dd89ddc00
   it will return task if any task exist with such id.
4. to update task with an id you have to send PUT request to localhost:4000/tasks/:id e.g localhost:4000/tasks/677452b9deaa812dd89ddc00
   with post body containing data in this format : {
    "markStatusAs":"completed"
}  although someone can only task status to in-progress or completed and it will check if task exist with given id and then perform accordingly
5. to delete a task you have to send DELETE request to localhost:4000/tasks/:id e.g localhost:4000/tasks/67746bd930505f4080e04a34
   it will check if task exist with given id and then perform accordingly

Optional :- JWT 
Note:- i've implemented simple user authentication for jwt, just so jwt will be return on successfull login
1. to sign up send POST Request to localhost:4000/signup with data example.
   {
    "name":"your name",
    "email":"your email id",
    "password":"your password",
    "confirmPassword":"your password"
} after successful signup perform login.
2. to login send POST LOGIN request to localhost:4000/login with data example
   {
     "email":"your email id",
    "password":"your password"
}
