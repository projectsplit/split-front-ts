import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  VerifyEmailLinkToken,
  Members,
  Transactions,
  VerifyInvitation,
  GoogleSuccessRedirect,
  AccessScreen,
} from "./components";
import { PrivateRoutes, RedirectToTransactions } from "./routes";
import { Main } from "./layouts";
import ContinueWithEmailLink from "./components/ContinueWithEmailLink/ContinueWithEmailLink";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/styles/global";

function App() {
  const theme = {
    colors: {
      body: "#0E0E10",
      text: "#26272B",
      whiteText:"#DDDDDD",
      lightColor: "#f5f5f5",
      pink: "#f91880",
      green: "#00ba7c",
      layer1: "#1f1f22",
      layer2: "#18181B",
      layer6: "#a3a3a3",
      labelColor6: "#8594E0",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Routes>
          <Route path="/email-continue" element={<ContinueWithEmailLink />} />
          <Route path="/access" element={<AccessScreen />} />
          <Route path="/redirect" element={<GoogleSuccessRedirect />} />
          <Route path="/v/:token" element={<VerifyEmailLinkToken />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="i/:invitationCode" element={<VerifyInvitation />} />
            <Route path=":groupid" element={<Main />}>
              <Route index element={<RedirectToTransactions />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="members" element={<Members />} />
              <Route path="*" element={<RedirectToTransactions />} />
            </Route>
          </Route>
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
