import { Card, Stack, Group, Text, Space, Input, Button } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'

function DevPage() {
    const [result, setResult] = useState("0")
    const [data, setData] = useState({
        numA: 0,
        numB: 0,
    });
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        invoke("call_cpp",{a:data.numA,b:data.numB}).then((msg)=>{console.log(msg)})
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
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
                    <form onSubmit={handleSubmit}>
                        <Input placeholder="Input A" onChange={handleChange} />
                        <Input placeholder="Input B" onChange={handleChange} />
                        <Text>{result}</Text>
                        <Button type="submit">Calculate</Button>
                    </form>
                </Group>
                <Space />
                <Text fw={750}>POC C# Invoker</Text>
                <Group>
                </Group>
            </Stack>
        </Card>
    );
}
export default DevPage;