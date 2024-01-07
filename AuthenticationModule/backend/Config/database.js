const mysql = require("mysql");

var Server = {
  connectionInit: () => {
    this.dbConn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "authmodule",
      port: "3306",
    });

    this.dbConn.connect((err) => {
      if (err) {
        console.error("Mysql connection error:", err);
        return;
      }
      console.log("Mysql database is connected");
    });
  },

  getQueryResult: (query) => {
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
  },

  addNewUser: async (username, passwordHash, email, role) => {
    const query = `INSERT INTO user (username, password, email, role_id)
    SELECT "${username}", "${passwordHash}", "${email}", role_id FROM ROLE WHERE role_name like "%${role}"`;
    return Server.getQueryResult(query);
  },

  getUser: (username) => {
    const query = `SELECT * FROM user u JOIN role r ON u.role_id = r.role_id WHERE username = "${username}"`;
    return Server.getQueryResult(query);
  },

  updateUser: (id, username, passwordHash) => {
    const query = `UPDATE user SET username = ${username}, password = ${passwordHash} WHERE user_id = ${id}`;
    return Server.getQueryResult(query);
  },
};
Server.connectionInit();
module.exports = Server;
