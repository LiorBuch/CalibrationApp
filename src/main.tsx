import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import THEME from "./theme";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={THEME}>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
