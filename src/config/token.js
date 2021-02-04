const jwt = require("jsonwebtoken");
module.exports={
    generateToken(user){
        return jwt.sign({ id: user.id }, "secret", {
          expiresIn: 86400
        });
    },
}