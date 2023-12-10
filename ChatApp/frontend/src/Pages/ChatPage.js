import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatsComponent from "../Components/ChatsComponent";
import SingleChatComponent from "../Components/SingleChatComponent";
import { Stack, Box, Button } from "@chakra-ui/react";
import style from "../index";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("/api/chat");
    console.log(data);
    setChats(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const changeMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div style={{ width: "100%" }}>
      <Box width="95%" background="red" textAlign="center" marginLeft={10}>
        fhhfewheweoeho
      </Box>
      <Stack direction="row" spacing={10}>
        <ChatsComponent />
        <SingleChatComponent />
      </Stack>
      <Box className={isDarkMode ? "heh" : "hehDarkMode"}>
        fdsfeg
        <Button onClick={changeMode}>xd</Button>
      </Box>
    </div>
  );
};

export default ChatPage;
