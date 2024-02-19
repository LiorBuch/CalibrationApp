//import { invoke } from "@tauri-apps/api/tauri";
import { AppShell, Burger, Group, NavLink, Stack ,Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MainPage from "./components/MainPage";
import {
  IconHome,
  IconReportAnalytics,
  IconSettings2,
  IconTestPipe2,
} from "@tabler/icons-react";
import SettingsPage from "./components/SettingsPage";
import { useState } from "react";
import { Text } from "@mantine/core";
import TestPage from "./components/TestPage";
import ReportGeneratorPage from "./components/ReportGeneratorPage";
import appIcon from "./assets/sm_icon.png";
import DevPage from "./components/DevPage";

function App() {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const pages = [
    {
      icon: IconHome,
      page: MainPage,
      label: "Home",
      pageId: "main_page_navlink",
    },
    {
      icon: IconSettings2,
      page: SettingsPage,
      label: "Settings",
      pageId: "settings_page_navlink",
    },
    {
      icon: IconTestPipe2,
      page: TestPage,
      label: "Testing",
      pageId: "test_page_navlink",
    },
    {
      icon: IconReportAnalytics,
      page: ReportGeneratorPage,
      label: "Report",
      pageId: "report_page_navlink",
    },
    {
      icon: IconReportAnalytics,
      page: DevPage,
      label: "Dev",
      pageId: "dev_page_navlink",
    },
  ];
  const [activePage, setPage] = useState(0);
  const ActivePageComponent = pages[activePage].page;
  const focusStyle = { filter: desktopOpened ? "blur(1px)" : "none" };
  return (
    <AppShell
      id="app_shell_id"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: !desktopOpened },
      }}
      padding={"md"}
    >
      <AppShell.Header>
        <Group h="100%" px="md" gap={"lg"} justify="flex-start">
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            size={"sm"}
            id="app_nav_burger"
          />
          <Image src={appIcon}/>
          <Stack gap={"xs"}>
            <Text fw={500} size="lg">
              ScanMaster
            </Text>
            <Text size="xs" fs={"italic"}>
              Calibration App
            </Text>
          </Stack>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={"sm"}>
        Navigation
        {pages.map((item, index) => (
          <NavLink
            href="#required-for-focus"
            key={item.label}
            label={item.label}
            active={index === activePage}
            onClick={() => setPage(index)}
            leftSection={<item.icon size={"1rem"} stroke={1.5} />}
            variant="subtle"
            id={item.pageId}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main id="app_shell_main" style={focusStyle}>
        <ActivePageComponent />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
