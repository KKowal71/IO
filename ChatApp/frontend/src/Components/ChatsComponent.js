import { Box, Stack } from "@chakra-ui/react";
import React from "react";

const ChatsComponent = () => {
  let chatsArray = ["Adam", "Kuba", "Bartek", "Kazik", "xd"];

  return (
    <div>
      ChatsComponent
      <Stack
        background="red.100"
        marginLeft={5}
        marginTop={10}
        height={600}
        width={350}
      >
        <Box display="flex">
          <ul style={{ background: "red", listStyleType: "none" }}>
            {chatsArray.map((chat) => (
              <li>{chat}</li>
            ))}
          </ul>
        </Box>
      </Stack>
    </div>
  );
};

export default ChatsComponent;
