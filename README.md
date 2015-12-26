# API NodeJS Simple Token Auth and ACL - Component-based architecture


## Run
Install node modules:
```
npm install
```

After installing node modules, the start (I hope the mongodb is running):
```
npm start
```

Now go to the [/api/setup](http://localhost:3000/api/setup) to create the user *demo*, admin role as default.

Retrieve a token accessing via POST [/api/signin](http://localhost:3000/api/signin) with a body raw json:
```json
{"username": "demo", "password": "demo"}
```

Use the recovered token in the header of the next requests with *Authorization*.

Go to [/api/users](http://localhost:3000/api/users) with GET method to list users (make sure the Authorization header with token).

This seed has the complete CRUD, using the methods GET, POST, PUT and DELETE, to list, create, change and remove users, respectively.

Enjoy and collaborate with the project. :)

[About me](http://guiseek.github.io)
