import {
  Stack,
  FormControl,
  Input,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const RegisterComponent = () => {
  const [email, setEmail] = React.useState();
  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmedPassword, setConfirmedPassword] = React.useState();
  const [image, setImage] = React.useState();

  const history = useHistory();

  const toast = useToast();

  const registerNewUser = async () => {
    if (!email || !name || !surname || !password) {
      toast({
        title: "Error",
        description: "You have to fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    } else if (password !== confirmedPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/user/register",
        {
          email,
          name,
          surname,
          password,
          image,
        },
        config
      );
      console.log(data);
      toast({
        title: "Success",
        description: "Account created!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userData", JSON.stringify(data));
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create an account",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    console.log("done");
  };

  const [show, setShow] = React.useState(false);
  const handlePassword = () => setShow(!show);

  const [show1, setShow1] = React.useState(false);
  const handlePassword1 = () => setShow1(!show1);

  return (
    <Stack spacing={3} align="center" width={600}>
      <FormControl isRequired>
        <FormLabel>E-mail address</FormLabel>
        <Input
          placeholder="enter your e-mail address"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="enter your name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Surname</FormLabel>
        <Input
          placeholder="enter your surname"
          onChange={(e) => setSurname(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement>
            <Button
              background="blue.300"
              onClick={handlePassword}
              title={show ? "hide" : "show"}
            >
              {show ? "🙉" : "🙈"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm your password"
            type={show1 ? "text" : "password"}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          ></Input>
          <InputRightElement>
            <Button
              background="blue.300"
              onClick={handlePassword1}
              title={show1 ? "hide" : "show"}
            >
              {show1 ? "🙉" : "🙈"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Image</FormLabel>
        <InputGroup>
          <Input
            size={60}
            type="file"
            cursor="pointer"
            borderRadius={5}
            onChange={(e) => setImage(e.target.value)}
          ></Input>
        </InputGroup>
      </FormControl>

      <Button background="blue.300" onClick={registerNewUser}>
        Create account!
      </Button>
    </Stack>
  );
};

export default RegisterComponent;
