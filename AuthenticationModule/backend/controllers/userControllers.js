const asyncHandler = require("express-async-handler");
const { Server, Logger } = require("../Config/database");
const { Authenticator, Security } = require("../Config/authenticator");
const { response } = require("express");

const registerUser = asyncHandler(async (request, response) => {
  const { email, username, password, role } = request.body;
  console.log(email, username, password, role);

  if (!email || !username || !password || !role) {
    response.status(400);
    throw new Error("Empty fields found");
  }

  const authenticator = new Authenticator();
  const user = await authenticator.Register(username, password, email, role);
  if (user) {
    response.status(201).json({
      user_id: user.user_id,
      username: user.username,
      role: user.role_name,
      role_id: user.role_id,
      email: user.email,
      enabled: user.enabled,
    });
  } else {
    throw new Error("Failed to create user");
  }
});

const loginUser = asyncHandler(async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    response.status(400);
    throw new Error("Empty fields found");
  }
  const authenticator = new Authenticator();
  const user = await authenticator.Login(username, password);
  if (user) {
    response.status(201).json({
      user_id: user.user_id,
      username: user.username,
      role: user.role_name,
      role_id: user.role_id,
      email: user.email,
      enabled: user.enabled,
      token: user.token,
    });
  } else {
    response.status(401);
    throw new Error("Fatal authorization");
  }
});

const getLoggedUser = asyncHandler(async (request, response) => {
  const user = Authenticator.user;
  if (user) {
    response.status(201).json({
      user_id: user.user_id,
      username: user.username,
      role: user.role_name,
      email: user.email,
      enabled: user.enabled,
      token: user.token,
    });
  } else {
    response.status(401);
    throw new Error("User Not Logged In");
  }
});

const getGreeting = async (reuest, response) => {
  response.status(201).json({
    greeting: "Hello",
  });
};

const updateUserData = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const { username } = request.body;
  const db = Server;
  const updatedUser = await db.updateUser(id, username);
  Authenticator.user = updatedUser;
  response.status(201).send(updatedUser);
});

const createNewClass = async (request, response) => {
  const { className, user_id } = request.body;
  await Server.addNewClass(className, user_id);
  response.status(201).send("Class created successfully");
};

const logOutUser = asyncHandler(async (request, response) => {
  Authenticator.user = null;
  response.status(201).send("User logged out successfully");
});

const logEvent = async (request, response) => {
  const { message, level } = request.body;
  const timestamp = Date.now();
  await Logger.addLog(message, timestamp, level);
  response.status(201).sent("logged new event");
};

module.exports = {
  registerUser,
  loginUser,
  getLoggedUser,
  getGreeting,
  updateUserData,
  createNewClass,
  logOutUser,
  logEvent,
};
