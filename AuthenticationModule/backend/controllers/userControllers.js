const asyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");
const Server = require("../Config/database");
const Authenticator = require("../Config/authenticator");
const { use } = require("../routes/userRoutes");

const registerUser = asyncHandler(async (request, response) => {
  const { email, username, password, role } = request.body;
  console.log(email, username, password, role);

  if (!email || !username || !password || !role) {
    response.status(400);
    throw new Error("Empty fields found");
  }
  const db = new Server();
  const authenticator = new Authenticator(db);
  const user = await authenticator.Register(username, password, email, role);
  if (user) {
    response.status(201).json({
      user_id: user.user_id,
      username: user.username,
      role: user.role_name,
      role_id: user.role_id,
      email: user.email,
      enabled: user.enabled,
      token: generateToken(user.user_id),
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
  const db = new Server();
  const authenticator = new Authenticator(db);
  const user = await authenticator.Login(username, password);
  if (user) {
    response.status(201).json({
      user_id: user.user_id,
      username: user.username,
      role: user.role_name,
      role_id: user.role_id,
      email: user.email,
      enabled: user.enabled,
      token: generateToken(user.user_id),
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
      email: user.email,
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

module.exports = { registerUser, loginUser, getLoggedUser, getGreeting };
