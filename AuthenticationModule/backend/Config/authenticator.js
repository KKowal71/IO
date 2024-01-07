const bcrypt = require("bcrypt");
const server = require("../Config/database");
class Authenticator {
  static user = undefined;
  constructor() {
    this.saltRounds = 15;
    this.dataBase = server;
  }
  Login = async (username, password) => {
    Authenticator.user = await this.IsUserDataValid(username, password);
    return Authenticator.user;
  };

  IsUserDataValid = async (username, password) => {
    const user = await this.dataBase.getUser(username);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log("Password is correct");
      return user;
    } else {
      console.log("Password is incorrect");
      return false;
    }
  };

  Register = async (username, password, email, role) => {
    const passwordHash = this.GenerateHash(password);
    this.dataBase.addNewUser(username, passwordHash, email, role);
    return this.dataBase.getUser(username);
  };

  GenerateHash = (password) => {
    return Security.CalculateHash(password);
  };
}

class Security {
  static CalculateHash = async (password) => {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt).then((hash) => {
        resolve(hash);
      });
    });
  };
}
module.exports = Authenticator;
