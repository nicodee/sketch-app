import React from "react";
import styled, { keyframes } from "styled-components";

const SpinKeyFrame = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 4px solid #f48f00;
  border-radius: 50%;
  border-top: 3px solid #b5bcc269;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite;
  -webkit-animation: cilQsd 2s linear infinite;
  animation: ${SpinKeyFrame} 2s linear infinite;
`;

export const Children = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const LoaderWrapper = styled.div`
  align-items: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background: #fff;
`;

export default function Loader({ children }) {
  return (
    <LoaderWrapper>
      <Spinner />
      <Children>{children}</Children>
    </LoaderWrapper>
  );
}
