import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query ($page: Int, $perPage: Int, $ids: [Int]) {
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
`;

export const GET_ANIME = gql`
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
`;
