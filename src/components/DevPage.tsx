import { Card, Stack, Group, Text, Space } from "@mantine/core";

function DevPage() {
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