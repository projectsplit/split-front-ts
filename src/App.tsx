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
import Analytics from "./components/Analytics/Analytics";
import { theme } from "./constants/theme";


function App() {

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
              {/* <Route path="*" element={<RedirectToActiveGroups />} /> */}
              {/*when it lands on /groups/active/whatever it will again land on active groups*/}
            </Route>

              <Route path="/groups/active/:groupid" element={<Main />}>
              {/* <Route index element={<RedirectToTransactions />} /> */}
              <Route path="/groups/active/:groupid/transactions" element={<Transactions />} />
              <Route path="/groups/active/:groupid/members" element={<Members />} />
              <Route path="*" element={<RedirectToTransactions />} />
              </Route>

            <Route path="/budget" element={<Budget2 />}>
              <Route index element={<RedirectToBudget />} />
              <Route path="current" element={<CurrentBudget />} />
              <Route path="create" element={<CreateBudget />} />
              <Route path="*" element={<RedirectToBudget />} />
            </Route>

            <Route path="/analytics/*" element={<RedirectToAnalytics />} />
            <Route path="/analytics" element={<Analytics />} />

            <Route path="i/:invitationCode" element={<VerifyInvitation />} />
            {/* <Route path=":groupid" element={<Main />}>
              <Route index element={<RedirectToTransactions />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="members" element={<Members />} />
              <Route path="*" element={<RedirectToTransactions />} />
            </Route> */}
          </Route>
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;


// /posts ->["posts"]
// /posts/1 ->["posts", post.id]
// /posts?authorId=1->["posts", {authorId:1}]
// /posts/2/comments -> ["posts", post.id, "comments"]

//TODO: find a way to automatically roll to the selected item in a scroll down menu, like months in Analytics
