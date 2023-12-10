import {
  FormControl,
  Stack,
  Box,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginComponent = () => {
  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlePassword = () => setShow(!show);

  const toast = useToast();

  const history = useHistory();
  const goToForgottenPasswordPage = () => history.push("/forgottenPassword");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toast({
        title: "Error",
        description: "You have to fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Success",
        description: "Logged in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("loginUserData", JSON.stringify(data));
      history.push("/chats");
    } catch {
      toast({
        title: "Error",
        description: "Fatal authentication",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setIsLoading(false);
  };

  return (
    <Stack spacing={4} align="center" width={600}>
      <FormControl isRequired>
        <FormLabel>e-mail address</FormLabel>
        <Input
          placeholder="enter your e-mail address"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="enter your password"
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

      <Button
        isLoading={isLoading}
        width={40}
        background="blue.300"
        _hover={{ background: "blue.500" }}
        onClick={logIn}
      >
        Log In!
      </Button>

      <Box display="inline-block">
        If you forgot password click here
        <Button
          marginLeft={5}
          onClick={goToForgottenPasswordPage}
          background="blue.300"
        >
          :)
        </Button>
      </Box>
    </Stack>
  );
};

export default LoginComponent;
