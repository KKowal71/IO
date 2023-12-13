import { Stack, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import RegisterComponent from "../Components/RegisterComponent";

const MainPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setShowSettings(!showSettings)}
        backgroundColor={"transparent"}
      >
        ⚙️
      </Button>
      <Stack>{showSettings && <RegisterComponent />}</Stack>
    </div>
  );
};
export default MainPage;
