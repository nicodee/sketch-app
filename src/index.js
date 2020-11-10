import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import client from "./client";
import { ApolloProvider } from "@apollo/client";
import Loader from "./components/Loader";
import { BrowserRouter as Router } from "react-router-dom";

function Root() {
  return (
    <React.StrictMode>
      <Router>
        <Suspense
          fallback={
            <Loader>
              <b>Loading</b>
            </Loader>
          }
        >
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </Suspense>
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
