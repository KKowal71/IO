import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const EditFieldComponent = ({ value, setValue }) => {
  const [isDisabled, setIsDisabeld] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Input color={"white"} isDisabled={isDisabled}>
        {value}
      </Input>
      <Button
        onClick={() => {
          setIsDisabeld(!isDisabled);
        }}
      >
        ✏️
      </Button>
    </div>
  );
};
