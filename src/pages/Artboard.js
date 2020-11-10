import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { DOCUMENT } from "../api/queries";
import Loader from "../components/Loader";

function Artboard({
  match: {
    params: { shortId, artboardShortId },
  },
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

  if (loading)
    return (
      <Loader>
        <b>Loading...</b>
      </Loader>
    );

  if (error) return <p>Error :(</p>;

  return (
    <div>
      {artboard.files && (
        <div>
          <img src={artboard.files[1].url} alt="" />
        </div>
      )}
    </div>
  );
}

export default Artboard;
