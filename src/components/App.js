import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages/Home";
import Document from "../pages/Document";
import Artboard from "../pages/Artboard";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <RootContainer>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/documents/:shortId" component={Document} />
        <Route
          export
          path="/documents/:shortId/artboards/:artboardShortId"
          component={Artboard}
        />
        <Redirect to="/" />
      </Switch>
    </RootContainer>
  );
}

export default App;
