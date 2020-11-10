import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { DOCUMENT } from "../api/queries";
import Loader from "../components/Loader";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { ReactComponent as Breadcrumb } from "../assets/breadcrumb.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { ReactComponent as Separator } from "../assets/separator.svg";
import styled from "styled-components";
import { find } from "lodash";

const ArtBoardHeaderWrapper = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-bottom: 1px solid #cdd0d2;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 64px;
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  color: rgb(130, 130, 130);
  padding: 0px;
  border: none;
  background-color: transparent;
  appearance: none;
  cursor: pointer;
  opacity: 0.5;

  &:focus {
    outline: unset;
  }

  &:hover {
    opacity: 1;
  }

  &:disabled {
    pointer-events: none;
  }
`;

const LeftHeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgb(130, 130, 130);
  z-index: 1;
`;

const ArtboardName = styled.span`
  font-weight: bold;
  position: absolute;
  width: 100%;
  text-align: center;
`;

const BreadcrumbWrapper = styled.span`
  margin-left: 3px;
  margin-right: 3px;
`;

function ArtBoardHeader({
  name,
  documentOrder,
  artboards,
  goToArtboard,
  goToDocument,
}) {
  const previousArtboard = find(artboards, {
    documentOrder: Number(documentOrder) - 1,
  });
  const nextArtboard = find(artboards, {
    documentOrder: Number(documentOrder) + 1,
  });

  return (
    <ArtBoardHeaderWrapper>
      <LeftHeaderSection>
        <Button onClick={goToDocument} className="artboard-header-button">
          <Close />
        </Button>

        <Separator />

        <Button
          className="artboard-header-button"
          onClick={() => {
            goToArtboard(previousArtboard.shortId);
          }}
          disabled={!previousArtboard}
        >
          <ArrowLeft />
        </Button>

        {documentOrder + 1}

        <BreadcrumbWrapper>
          <Breadcrumb />
        </BreadcrumbWrapper>

        {artboards.length}

        <Button
          className="artboard-header-button"
          onClick={() => {
            goToArtboard(nextArtboard.shortId);
          }}
          disabled={!nextArtboard}
        >
          <ArrowRight />
        </Button>
      </LeftHeaderSection>

      <ArtboardName>{name}</ArtboardName>
    </ArtBoardHeaderWrapper>
  );
}

function Artboard({
  match: {
    params: { shortId, artboardShortId },
  },
  history,
}) {
  const { loading, error, data } = useQuery(DOCUMENT, {
    variables: { shortId: shortId },
  });
  const [artboard, setArtboard] = useState({});

  useEffect(() => {
    if (!!data) {
      const a = data.share.version.document.artboards.entries.filter(
        (entry) => String(entry.shortId) === artboardShortId
      );
      setArtboard(a[0]);
    }
  }, [data, artboardShortId]);

  function goToArtboard(id) {
    history.push(`/documents/${shortId}/artboards/${id}`);
  }

  function goToDocument() {
    history.push(`/documents/${shortId}`);
  }

  if (loading)
    return (
      <Loader>
        <b>Loading...</b>
      </Loader>
    );

  if (error) return <p>Error :(</p>;

  return (
    <div className="artboard-wrapper">
      <ArtBoardHeader
        name={artboard.name}
        documentOrder={artboard.documentOrder}
        artboards={data.share.version.document.artboards.entries}
        goToArtboard={goToArtboard}
        goToDocument={goToDocument}
      />
      {artboard.files && (
        <div className="artboard-body">
          <div className="artboard">
            <img src={artboard.files[1].url} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Artboard;
