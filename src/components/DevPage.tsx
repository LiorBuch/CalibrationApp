import {
  Card,
  Stack,
  Group,
  Text,
  Space,
  NumberInput,
  Button,
} from "@mantine/core";
import { FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api";

function DevPage() {
  const [resultCpp, setResultCpp] = useState(0);
  const [resultCS, setResultCS] = useState(0.0);
  const [numA, setNumA] = useState<string | number>(0);
  const [numB, setNumB] = useState<string | number>(0);
  const [numC, setNumC] = useState<string | number>(0);
  const [numD, setNumD] = useState<string | number>(0);
  const handleSubmitCpp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    invoke<number>("call_cpp", { a: numA, b: numB })
      .then((message) => {
        setResultCpp(message);
      })
      .catch((reason) => console.log(`error ${reason}`));
  };
  const handleSubmitCS = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    invoke("call_cs", { a: numC, b: numD })
      .then((message) => {
        setResultCS(-1);
        console.log(message)
      })
      .catch((reason) => console.log(`error ${reason}`));
  };
  return (
    <Card
      m={"md"}
      h={"90vh"}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      id="dev_page_id"
    >
      <Stack>
        <Text fw={750}>POC C++ Invoker</Text>
        <Group>
          <form onSubmit={handleSubmitCpp}>
            <NumberInput
              placeholder="Input A"
              value={numA}
              onChange={setNumA}
            />
            <NumberInput
              placeholder="Input B"
              value={numB}
              onChange={setNumB}
            />
            <Text>{resultCpp}</Text>
            <Button type="submit">Calculate</Button>
          </form>
        </Group>
        <Space />
        <Text fw={750}>POC C# Invoker</Text>
        <Group>
          <form onSubmit={handleSubmitCS}>
            <NumberInput
              placeholder="Input C"
              value={numA}
              onChange={setNumC}
            />
            <NumberInput
              placeholder="Input D"
              value={numB}
              onChange={setNumD}
            />
            <Text>{resultCS}</Text>
            <Button type="submit">Calculate</Button>
          </form>
        </Group>
      </Stack>
    </Card>
  );
}
export default DevPage;
