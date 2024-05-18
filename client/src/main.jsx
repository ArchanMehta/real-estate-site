import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import {MantineProvider} from "@mantine/core"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <Auth0Provider
        domain="dev-m6u5lib0i2h5jnpi.us.auth0.com"
        clientId="JgUIT3LgbNDG7p1D4rMfqe9e2cIFxkC3"
        authorizationParams={{
          redirect_uri: "http://localhost:5173/",
        }}
        audience="http://localhost:8000"
        scope="openid profile email"
      >
        <App />
      </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
);
