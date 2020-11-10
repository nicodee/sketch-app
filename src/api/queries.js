import { gql } from "@apollo/client";

export const DOCUMENT = gql`
  query GetDocument($shortId: String!) {
    share(shortId: $shortId) {
      shortId
      version {
        document {
          name
          artboards {
            entries {
              shortId
              documentOrder
              name
              isArtboard
              files {
                url
                height
                width
                scale
                thumbnails {
                  url
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;
