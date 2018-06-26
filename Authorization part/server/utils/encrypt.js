const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
}
