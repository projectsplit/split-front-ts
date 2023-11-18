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
  // Budget,
  Budget2,
} from "./components";

import {
  PrivateRoutes,
  RedirectToTransactions,
  RedirectToActiveGroups,
  RedirectToAnalytics
} from "./routes";

import { Main } from "./layouts";
import ContinueWithEmailLink from "./components/ContinueWithEmailLink/ContinueWithEmailLink";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/styles/global";
import CurrentBudget from "./components/Budget/CurrentBudget/CurrentBudget";
import CreateBudget from "./components/Budget/CreateBudget/CreateBudget";
import RedirectToBudget from "./routes/RedirectToBudget";
import useBudgetInfo from "./hooks/useBudgetInfo";
import Analytics from "./components/Analytics/Analytics";


function App() {
  const theme = {
    colors: {
      body: "#0E0E10",
      text: "#26272B",
      whiteText: "#DDDDDD",
      lightColor: "#f5f5f5",
      pink: "#f91880",
      redish: "#fc4c4c",
      yellowish: "#e7e100",
      yellow: "#fcc504",
      green: "#0d8d01",
      deepPurple: "#8300e7",
      deepPurple2: "#ac5ee7",
      layer1: "#1f1f22",
      layer2: "#18181B",
      layer6: "#a3a3a3",
      labelColor6: "#8594E0",
      inputGrey: "#2d2d2d",
    },
  };
  //rgb(49, 162, 76) fb green
  const { data, isFetching } = useBudgetInfo();

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
              {/*when the /groups rout is matched, it will render whatever is in the RedirectToActiveGroups*/}
              <Route path="active" element={<ActiveGroups />} />
              <Route path="archived" element={<ArchivedGroups />} />
              <Route path="deleted" element={<DeletedGroups />} />
              <Route path="*" element={<RedirectToActiveGroups />} />
              {/*when it lands on /groups/active/whatever it will again land on active groups*/}
            </Route>

            <Route path="/budget" element={<Budget2 />}>
              <Route index element={<RedirectToBudget data={data} isLoading={isFetching}/>} />
              <Route path="current" element={<CurrentBudget />} />
              <Route path="create" element={<CreateBudget />} />
              <Route path="*" element={<RedirectToBudget data={data} isLoading={isFetching}/>} />
            </Route>

            <Route path="/analytics/*" element={<RedirectToAnalytics />} />
            <Route path="/analytics" element={<Analytics />} />

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
