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

  addNewUser: async (username, passwordHash, email, role, container_owner) => {
    const returnQuery = `INSERT INTO user (username, password, email, role_id, container_id)
    SELECT "${username}", "${passwordHash}", "${email}", role_id, container_id FROM ROLE JOIN CONTAINERS
    WHERE role_name like "%${role}" and owner_id = ${container_owner}`;
    Server.addLog(
      `Successfully added user ${username} user_id:${id}`,
      new Date().toLocaleString(),
      "INFO"
    );
    return Server.getQueryResult(returnQuery);
  },

  addNewClass: async (container_name, owner_id) => {
    const query = `INSERT INTO containers (container_type_id, container_name, owner_id)
    VALUES (2, "${container_name}", ${owner_id})`;
    Server.addLog(
      `Successfully added new class named ${container_name}, owned by user with id: ${owner_id}`,
      new Date().toLocaleString(),
      "INFO"
    );
    return Server.getQueryResult(query);
  },

  getUser: (username) => {
    const query = `SELECT * FROM user u JOIN role r ON u.role_id = r.role_id WHERE username = "${username}"`;
    return Server.getQueryResult(query);
  },

  updateUser: async (id, username) => {
    const query = `UPDATE user SET username = "${username}" WHERE user_id = ${id}`;
    Server.getQueryResult(query);
    Logger.addLog(
      `Successfully updated username to ${username} user_id:${id}`,
      new Date().toLocaleString(),
      "INFO"
    );
    return Server.getUser(username);
  },
};
class Logger {
  static dbname = "log_table";
  static logLevel = "INFO";

  static addLog = async (message, timestamp, level) => {
    const query = `INSERT INTO ${dbname} (log_message, log_date, log_level) VALUES ("${message}", "${timestamp}", "${level}")`;
    return Server.getQueryResult(query);
  };
}
Server.connectionInit();
(module.exports = Server), Logger;
