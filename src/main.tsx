import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider, Client, defaultExchanges, subscriptionExchange } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { CompletedRun, EMS, LiveRun } from "components/EMS";
import { RunConfig, RunConfigSteps } from "components/RunConfig";
import Navbar from "components/Navbar";
import NotFound from "components/shared/NotFound";

const GRAPHQL_WS_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_WS_ENDPOINT || "ws://localhost:8000/graphql/";

const GRAPHQL_HTTP_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_HTTP_ENDPOINT ||
  "http://localhost:8000/graphql/";

// Need the min timeout
// https://github.com/apollographql/subscriptions-transport-ws/issues/377#issuecomment-1000431567
const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_ENDPOINT, {
  reconnect: true,
  minTimeout: 10000,
});

const client = new Client({
  url: GRAPHQL_HTTP_ENDPOINT,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
  maskTypename: true,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Navigate replace to="/ems" />} />
            <Route path="ems">
              <Route index element={<EMS />} />
              <Route path="live-run" element={<LiveRun />} />
              <Route path=":runName" element={<CompletedRun />} />
            </Route>
            <Route path="run-config">
              <Route index element={<RunConfig />} />
              <Route path=":runConfigId" element={<RunConfigSteps />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
