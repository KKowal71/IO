const mysql = require("mysql");

class Server {
  constructor() {
    this.dbConn = mysql.createConnection({
      host: "io2023.mysql.database.azure.com",
      user: "studentuser",
      password: "kuxgox-6zavgi-qUkkib",
      database: "greenchallenge",
      port: "3306",
      ssl: true,
    });

    this.dbConn.connect((err) => {
      if (err) {
        console.error("Mysql connection error:", err);
      }
      console.log("Mysql database is connected");
    });
  }

  addNewUser = async (username, passwordHash, email, role) => {
    const query = `INSERT INTO user (username, password, email, role_id)
    SELECT "${username}", "${passwordHash}", "${email}", role_id FROM ROLE WHERE role_name like "%${role}"`;
    return this.getQueryResult(query);
  };

  getUser = (username) => {
    const query = `SELECT * FROM user u JOIN role r ON u.role_id = r.role_id WHERE username = "${username}"`;
    return this.getQueryResult(query);
  };

  getQueryResult = (query) => {
    return new Promise((resolve, reject) => {
      this.dbConn.query(query, (err, result) => {
        if (err) {
          reject(err);
          throw err;
        } else {
          resolve(result[0]);
        }
      });
    });
  };
}
module.exports = Server;
