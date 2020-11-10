import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Home({ history }) {
  const [shortId, setShortId] = useState("");

  function handleShortIdInputChange({ target: { value } }) {
    setShortId(value);
  }

  function handleButtonClick() {
    history.push(`/documents/${shortId}`);
  }

  return (
    <Container>
      <h1>Welcome</h1>
      <input
        type="text"
        placeholder="Enter a short id"
        onChange={handleShortIdInputChange}
      />
      <br />
      <button disabled={!shortId} onClick={handleButtonClick}>
        Go
      </button>
      <br />
      <p>
        You can try{" "}
        <a href="/documents/Y8wDM">
          <b>Y8wDM</b>
        </a>
      </p>
    </Container>
  );
}

export default Home;
