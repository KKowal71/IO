const bcrypt = require("bcrypt");
const server = require("../Config/database");
const generateToken = require("../Config/generateToken");

class Authenticator {
  static user = undefined;
  constructor() {
    this.dataBase = server;
  }
  Login = async (username, password) => {
    Authenticator.user = await this.IsUserDataValid(username, password);
    Authenticator.user.token = generateToken(Authenticator.user.user_id);
    Logger.addLog(
      `Logged in username ${username}`,
      new Date().toLocaleString(),
      "INFO"
    );
    return Authenticator.user;
  };

  IsUserDataValid = async (username, password) => {
    const user = await this.dataBase.getUser(username);
    const match = await CompareHash(password, user.password);
    if (match) {
      console.log("Password is correct");
      return user;
    } else {
      console.log("Password is incorrect");
      return false;
    }
  };

  CompareHash = async (password, user_password) => {
    return await bcrypt.compare(password, user.password);
  };

  Register = async (username, password, email, role) => {
    const passwordHash = await this.GenerateHash(password);
    console.log(Authenticator.user);
    this.dataBase.addNewUser(
      username,
      passwordHash,
      email,
      role,
      Authenticator.user.user_id
    );
    Logger.addLog(
      `Registered user named ${username}`,
      new Date().toLocaleString(),
      "INFO"
    );
    return this.dataBase.getUser(username);
  };

  GenerateHash = async (password) => {
    return await Security.CalculateHash(password);
  };
}

class Security {
  static CalculateHash = async (password) => {
    const saltRounds = 15;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };
}
module.exports = { Authenticator, Security };
