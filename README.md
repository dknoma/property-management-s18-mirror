# Property Management App
> The Property Management App is designed to make it easier for property owners and tenants to interact, and to make it so information only needs to be written down one time.

This app allows property owners and tenants to manage profiles and payments all in one location. For tenants, rather than having to fill out their information everytime they want to move to a new apartment they only need to make a profile with their information one time, streamlining the application process.

Property Managers can do the following:
- Create and Post Properties on the Application
- Process Property Applications
- Process Maintenance Requests
- Message Tenants
- Join a Live Chatroom

Tenants can do the following:
- Apply to Properties
- Submit Maintenance Requests
- Search and Filter Properties
- Message Property Managers
- Join a Live Chatroom
- Pay their rent through the application

## Backend Documentation

### Authentication Tokens with JWT
This application uses JSON Web Tokens for user authentication. Below is a helper function that is designed to attempt to give the user a token.
```js
function generateToken(user) {
  const payload = {
    userId: user.id,
    user_type: user.user_type
  };
  try {
    return token = jwt.sign(payload, config.secret, {
      expiresIn: "24h" //expires after 24 hours
    });
  } catch (Error) {
    return res.status(400).send({
      message: 'Unable to get token.'
    });
  }
}
```

Given a User object, the function then attempts to create a payload from the user's information. This payload is then used to try and generate a token. If token creation fails, then the function returns an error message.

### User Authentication
Below is a function inside one of the pieces of middleware in our application. It attempts to authenticate the user via the user's JWT.
```js
function authorize(req, res, next) {
  if(!req.header('token')
    || req.header('token') == null
    || req.header('token') == undefined) {
    return res.status(401).send({message: 'Unable to authenticate'});
  }

  try {
    var currentUser = jwt.verify(req.header('token'), config.secret);

    if(currentUser.userId) {
      User.findById(currentUser.userId)
      .then(user => {
        req.currentUser = user.id;
        next();
      })
      .catch((err, user) => {
        if (err || !user) {
            return res.status(401).send({message: 'Unable to authenticate'});
        }
      });
    } else {
      req.currentUser = false;
      next();
    }
  } catch (err) {
    return res.status(401).send({message: 'Unable to authenticate', err});
  }
}
```
Being middleware, the function can take in request and response objects and manipulate them. The function will try and find the user's token and attempt to return the id from the token. If no valid token is present the function returns false, indicating that authentication has failed. If no token is present or an error occurs, authentication terminates and the function returns an error message through the response.

## Frontend Documentation

This application uses React to manage the Frontend view, and Redux to manage the application state. It communicates with the backend via axios. Below are some of the core packages in use.

- React
- Redux
- React-Redux
- Material UI
- React-Router
- Lodash
- Axios
- Babel
- React Table
- Redux Form

### Persistent Storage

State persists through page reload through the localStorage.js class, where state is automatically saved to local storage.

localStorage.js
```js

/* Save state to local Storage */
export const saveState = (state) => {
  try {
    /* Turn object into string and save to localstorage */
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    /* Turn string into an object and update state */
    // const newState = JSON.parse(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

```

## Starting the Application
1. Run npm install from root directory, and from /client directory
2. Run locally: From /server, create /config/config.json and enter local postgres db credentials.
3. Run server with ``npm run start:dev``. In new terminal window, cd into client and run ``npm start``.

## Authors
* **Jose Alvarado** - *Sponsor* - [GitHub](https://github.com/sfdevshop)
* **Nick Kebbas** - *Frontend* - [GitHub](https://github.com/nicholas-kebbas)
* **Soo Jung Kim** - *Frontend* - [GitHub](https://github.com/soojkim0306)
* **Yuxin Huang** - *Backend* - [GitHub](https://github.com/huan0750)
* **Drew Noma** - *Backend* - [GitHub](https://github.com/dknoma)

See also the list of [contributors](https://github.com/sfdevshop/Property-Management-S18/graphs/contributors) who participated in this project.

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
