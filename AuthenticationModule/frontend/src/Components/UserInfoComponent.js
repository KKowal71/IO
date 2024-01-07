import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import EditFieldComponent from "./EditFieldComponent";
import axios from "axios";
import { useState } from "react";

const UserInfoComponent = () => {
  const toast = useToast();
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("loginUserData")).username
  );
  const [password, setPassword] = useState(
    JSON.parse(localStorage.getItem("loginUserData")).password
  );

  const updateUserData = () => {
    if (
      username != JSON.parse(localStorage.getItem("loginUserData")).username ||
      password != JSON.parse(localStorage.getItem("loginUserData")).password
    ) {
      const { data } = axios.post(
        `/api/user/${
          JSON.parse(localStorage.getItem("loginUserData")).user_id
        }`,
        { username, password }
      );
      console.log(data);
      toast({
        title: "Success",
        description: "User credentials updated!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userData", JSON.stringify(data));
    }
  };

  return (
    <Stack>
      <EditFieldComponent
        value={username}
        setValue={setUsername}
      ></EditFieldComponent>
      <EditFieldComponent
        value={password}
        setValue={setPassword}
      ></EditFieldComponent>
      <Button onClick={updateUserData}>confirm changes</Button>
    </Stack>
  );
};

export default UserInfoComponent;
