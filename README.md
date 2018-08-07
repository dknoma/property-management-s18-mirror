# Property Management App
> The Property Management App is designed to make it easier for property owners and tenants to interact, and to make it so information only needs to be written down one time.

This app allows property owners and tenants to manage profiles and payments all in one location. For tenants, rather than having to fill out their information everytime they want to move to a new apartment they only need to make a profile with their information one time, streamlining the application process.

## Backend Documentation

### Authentication Tokens with JWT
This application uses JSON Web Tokens for user authentication. Below is a helper function that is designed to attempt to give the user a token.
```js
function generateToken(user) {
  //payload to create token; does not contain sensitive info
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
  } catch (error) {
      req.currentUser = false;
      next();
  }
}
```
Being middleware, the function can take in request and response objects and manipulate them. The function will try and find the user's token and attempt to return the id from the token. If no valid token is present the function returns false, indicating that authentication has failed. If no token is present or an error occurs, authentication terminates and the function returns an error message through the response.

## Starting the Application
1. Run locally: From /server, create /config/config.json and enter local postgres db credentials.
2. Run server with ``npm run start:dev``. In new terminal window, cd into client and run ``npm start``.

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
