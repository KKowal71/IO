import { Stack, Button, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateClassComponent from "../Components/CreateClassComponent";
import RegisterComponent from "../Components/RegisterComponent";
import UserInfoComponent from "../Components/UserInfoComponent";
import { useHistory } from "react-router-dom";

import axios from "axios";

const MainPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  const [showCreateClassForm, setShowCreateClassForm] = useState(false);
  const history = useHistory();

  const logOut = async () => {
    await axios.post("/api/user/logout");
    localStorage.removeItem("loginUserData");
    history.replace("/");
  };

  return (
    <div>
      <Button
        onClick={() => setShowSettings(!showSettings)}
        backgroundColor={"transparent"}
      >
        ⚙️
      </Button>
      <Button onClick={logOut}>🔚</Button>
      {showSettings && (
        <Stack>
          <Text
            color={"white"}
            cursor={"pointer"}
            onClick={() => {
              setShowRegisterForm(!showRegisterForm);
            }}
          >
            Register user
          </Text>
          {showRegisterForm && <RegisterComponent />}

          {JSON.parse(localStorage.getItem("loginUserData")).role ===
            "ROLE_DIRECTOR" && (
            <Text
              color={"white"}
              cursor={"pointer"}
              onClick={() => {
                setShowCreateClassForm(!showCreateClassForm);
              }}
            >
              CREATE CLASS
            </Text>
          )}
          {showCreateClassForm && <CreateClassComponent />}
          <Text
            color={"white"}
            cursor={"pointer"}
            onClick={() => {
              setShowCredentialsForm(!showCredentialsForm);
            }}
          >
            Update credentials
          </Text>
          {showCredentialsForm && <UserInfoComponent></UserInfoComponent>}
        </Stack>
      )}
    </div>
  );
};
export default MainPage;
