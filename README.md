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

Now go to the [http://url:3000/api/setup](setup) to create the user *demo*, admin role as default.

Retrieve a token accessing via POST [http://url:3000/api/signin](signin) with a body raw json:
```json
{"username": "demo", "password": "demo"}
```

Use the recovered token in the header of the next requests with *Authorization*.
