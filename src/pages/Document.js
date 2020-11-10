import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { DOCUMENT } from "../api/queries";
import Loader from "../components/Loader";
import { ReactComponent as SketchLogo } from "../assets/sketch-logo.svg";

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

const DocumentHeaderWrapper = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-bottom: 1px solid #cdd0d2;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DocumentBodyWrapper = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f7f7f7;
  height: 100%;
  overflow: scroll;
`;

const LogoWrapper = styled.div`
  margin: 16px;
  margin-right: 40px;
  cursor: pointer;
`;

const DocumentTitle = styled.span`
  font-size: 16px;
`;

const ThumbnailWrapper = styled.figure`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  height: 450px;

  &:hover {
    cursor: pointer;
  }
`;

const ThumbnailImage = styled.img`
  max-height: 400px;
  margin-bottom: 20px;
`;

const ThumbnailCaption = styled.figcaption`
  position: absolute;
  bottom: 0px;
`;

function Header({ children }) {
  return (
    <DocumentHeaderWrapper>
      <LogoWrapper>
        <SketchLogo />
      </LogoWrapper>
      <DocumentTitle>{children}</DocumentTitle>
    </DocumentHeaderWrapper>
  );
}

function ArtboardThumbnail({
  url,
  shortId,
  name,
  width,
  handleArtboardClickAction,
}) {
  return (
    <ThumbnailWrapper
      onClick={() => {
        handleArtboardClickAction(shortId);
      }}
    >
      <ThumbnailImage src={url} alt="" width={width} />
      <ThumbnailCaption>{name}</ThumbnailCaption>
    </ThumbnailWrapper>
  );
}

function Document({
  match: {
    params: { shortId },
  },
  history,
}) {
  const { loading, error, data } = useQuery(DOCUMENT, {
    variables: { shortId: shortId },
  });

  function handleArtboardClickAction(artboardShortId) {
    history.push(`/documents/${shortId}/artboards/${artboardShortId}`);
  }

  if (loading)
    return (
      <Loader>
        <b>Loading...</b>
      </Loader>
    );

  if (error) return <p>Error :(</p>;

  return (
    <RootContainer>
      <Header>{data && data.share.version.document.name}</Header>
      <DocumentBodyWrapper>
        {data &&
          data.share.version.document.artboards.entries.map((entry) => {
            const thumbnail = entry.files[0].thumbnails[0];
            return (
              <ArtboardThumbnail
                key={entry.shortId}
                url={thumbnail.url}
                shortId={entry.shortId}
                width={thumbnail.width}
                name={entry.name}
                handleArtboardClickAction={handleArtboardClickAction}
              />
            );
          })}
      </DocumentBodyWrapper>
    </RootContainer>
  );
}

export default Document;
