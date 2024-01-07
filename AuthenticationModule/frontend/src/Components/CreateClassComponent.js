import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const CreateClassComponent = () => {
  const toast = useToast();
  const [className, setClassName] = useState("");
  const confirmClassCreation = () => {
    toast({
      title: "Success",
      description: "Class created!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="class name"
        onChange={(e) => {
          setClassName(e.target.value);
        }}
      ></input>
      <button onClick={confirmClassCreation}>confirm</button>
    </div>
  );
};

export default CreateClassComponent;
