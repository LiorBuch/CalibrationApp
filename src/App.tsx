//import { invoke } from "@tauri-apps/api/tauri";
import { AppShell, Burger, NavLink, Stack } from "@mantine/core";
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
import TestPage from "./components/TestPage";
import ReportGeneratorPage from "./components/ReportGeneratorPage";

function App() {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const pages = [
    { icon: IconHome, page: MainPage, label: "Main Page",pageId:"main_page_navlink" },
    { icon: IconSettings2, page: SettingsPage, label: "Settings Page" ,pageId:"settings_page_navlink"},
    { icon: IconTestPipe2, page: TestPage, label: "Testing Page" ,pageId:"test_page_navlink" },
    {
      icon: IconReportAnalytics,
      page: ReportGeneratorPage,
      label: "Report Page",pageId:"report_page_navlink"
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
        <Stack h="100%" px="md" justify="center">
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            size={"sm"}
            id="app_nav_burger"
          />
        </Stack>
      </AppShell.Header>
      <AppShell.Navbar>
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
      <AppShell.Main id="app_shell_main">
        <div style={focusStyle}>
          <ActivePageComponent/>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
