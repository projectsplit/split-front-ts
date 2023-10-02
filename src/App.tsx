import React from "react";
import "./App.css";
import "./components/styles/semantic-icons.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  VerifyEmailLinkToken,
  Members,
  Transactions,
  VerifyInvitation,
  GoogleSuccessRedirect,
  AccessScreen,
  ActiveGroups,
  ArchivedGroups,
  DeletedGroups,
  Groups,
  Budget,
} from "./components";

import {
  PrivateRoutes,
  RedirectToTransactions,
  RedirectToActiveGroups,
} from "./routes";

import { Main } from "./layouts";
import ContinueWithEmailLink from "./components/ContinueWithEmailLink/ContinueWithEmailLink";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/styles/global";

function App() {
  const theme = {
    colors: {
      body: "#0E0E10",
      text: "#26272B",
      whiteText: "#DDDDDD",
      lightColor: "#f5f5f5",
      pink: "#f91880",
      redish: "#fc4c4c",
      yellowish:"#e7e100",
      green: "#0d8d01",
      deepPurple: "#8300e7",
      deepPurple2: "#ac5ee7",
      layer1: "#1f1f22",
      layer2: "#18181B",
      layer6: "#a3a3a3",
      labelColor6: "#8594E0",
      inputGrey:"#2d2d2d"
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
            <Route path="/groups" element={<Groups />}>
              <Route index element={<RedirectToActiveGroups />} />
              <Route path="active" element={<ActiveGroups />} />
              <Route path="archived" element={<ArchivedGroups />} />
              <Route path="deleted" element={<DeletedGroups />} />
            </Route>
            <Route path="/budget" element={<Budget/>} />
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

// Hook the LogoStripe and let the page slide up until the Groups
// Backend to return the total from all groups in all currencies for the autheduser in homepage.
// Member since at info of group?

// /posts ->["posts"]
// /posts/1 ->["posts", post.id]
// /posts?authorId=1->["posts", {authorId:1}]
// /posts/2/comments -> ["posts", post.id, "comments"]
