import { Card, Timeline,Text } from "@mantine/core";
import { IconCircleX,IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";

function TestPage() {
  const[selected,setSelected] = useState(1)
  const results = [{icon:IconCircleCheck,color:"green"},{icon:IconCircleX,color:"red"}]
  return (
    <Card
      m={"md"}
      h={"90vh"}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      id="test_page_id"
    >
      <Timeline active={selected} bulletSize={1} id="test_timeline">
        <Timeline.Item title="Open Port">
          <Text>Open a port for the device</Text>
        </Timeline.Item>
        <Timeline.Item title="Id Device">
          <Text>Get the device Name and MAC</Text>
        </Timeline.Item>
        <Timeline.Item title="Test Gain">
          <Text>Test the device Gain levels</Text>
        </Timeline.Item>
      </Timeline>
    </Card>
  );
}
export default TestPage;
