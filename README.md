# Property Management App
> The Property Management App is designed to make it easier for property owners and tenants to interact, and to make it so information only needs to be written down one time.

This app allows property owners and tenants to manage profiles and payments all in one location. For tenants, rather than having to fill out their information everytime they want to move to a new apartment they only need to make a profile with their information one time, streamlining the application process.

## Authentication with JWT
This application uses JSON Web Tokens for user authentication. Below is a helper function that is designed to attempt to give the user a token.
```
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

## Starting the Application
1. Run locally: From ``/server, create /config/config.json`` and enter local postgres db credentials.
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
