import { Stack, Button, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import RegisterComponent from "../Components/RegisterComponent";

const MainPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setShowSettings(!showSettings)}
        backgroundColor={"transparent"}
      >
        ⚙️
      </Button>
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
          <Text
            color={"white"}
            cursor={"pointer"}
            onClick={() => {
              setShowCredentialsForm(!showCredentialsForm);
            }}
          >
            Update credentials
          </Text>
        </Stack>
      )}
    </div>
  );
};
export default MainPage;
