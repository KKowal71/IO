const bcrypt = require("bcrypt");
class Authenticator {
  constructor(dataBase) {
    this.saltRounds = 15;
    this.dataBase = dataBase;
  }
  Login = async (username, password) => {
    return await this.IsUserDataValid(username, password);
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
    const passwordHash = await this.GenerateHash(password);
    this.dataBase.addNewUser(username, passwordHash, email, role);
    return this.dataBase.getUser(username);
  };

  GenerateHash = async (password) => {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt).then((hash) => {
        resolve(hash);
      });
    });
  };
}

module.exports = Authenticator;
