const asyncHandler = require("express-async-handler");
const User = require("../Schemas/userRegisterSchema");
const generateToken = require("../Config/generateToken");

////////////controll for register///////////////////
const registerUser = asyncHandler(async (request, response) => {
  const { email, name, surname, password, image } = request.body;

  if (!email || !name || !surname || !password) {
    response.status(400);
    throw new Error("Empty fields found");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    response.status(400);
    throw new Error("User having that e-mail already exists");
  }

  const newUser = await User.create({
    email,
    name,
    surname,
    password,
    image,
  });

  if (newUser) {
    response.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      image: newUser.image,
      token: generateToken(newUser._id),
    });
  } else {
    throw new Error("Failed to create user");
  }
});

////////////////controll for login//////////////////////
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400);
    throw new Error("Empty fields found");
  }
  const user = await User.findOne({ email }); //returns all attributes of the user
  if (user && password === user.password) {
    response.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    response.status(401);
    throw new Error("Fatal authorization");
  }
});

module.exports = { registerUser, loginUser }; // curly brackets because of not default export
