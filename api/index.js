import client from "./apolloClient";
import { gql } from "@apollo/client";

export const getAnimes = (page = 1, perPage = 10, ids) => {
  return client.query({
    variables: { page, perPage, ids },
    query: gql`
      query AnimeList($page: Int, $perPage: Int, $ids: [Int]) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            perPage
            lastPage
            hasNextPage
          }
          media(sort: TRENDING_DESC, id_in: $ids) {
            id
            title {
              english
              userPreferred
            }
            description
            episodes
            coverImage {
              extraLarge
              large
            }
            averageScore
          }
        }
      }
    `,
  });
};

export const getAnime = (mediaId) => {
  return client.query({
    variables: { mediaId },
    query: gql`
      query AnimeDetail($mediaId: Int) {
        Media(id: $mediaId) {
          id
          title {
            english
            userPreferred
          }
          description
          episodes
          bannerImage
          coverImage {
            extraLarge
            large
          }
          genres
          averageScore
          popularity
          characters(perPage: 7, page: 1) {
            edges {
              node {
                id
                name {
                  full
                }
              }
              voiceActors {
                id
                name {
                  full
                }
              }
            }
          }
        }
      }
    `,
  });
};
