import React, { createContext, useContext, useReducer } from "react";

// {
//   id: '',
//   name: '',
//   bannerUrl: ''
//   animes: [],
// }

const initialState = [];

export const CollectionContext = createContext();

export const useCollection = () => useContext(CollectionContext);

export const createCollection = ({ name }) => ({
  type: "CREATE",
  payload: { name },
});

export const createCollectionWithAnime = ({ name, anime }) => ({
  type: "CREATE",
  payload: { name, animeId: anime.id, bannerUrl: bannerImage },
});

export const editCollection = ({ id, name }) => ({
  type: "EDIT",
  payload: { id, name },
});

export const removeCollection = (id) => ({
  type: "DELETE",
  payload: { id },
});

export const addToCollection = ({ id, anime }) => ({
  type: "ADD_ANIME",
  payload: { id, animeId: anime.id, bannerUrl: anime.bannerImage },
});

export const removeFromCollection = ({ id, animeId }) => ({
  type: "REMOVE_ANIME",
  payload: { id, animeId },
});

const collectionReducer = (state = initialState, action) => {
  const { type = "", payload = {} } = action;

  switch (type) {
    case "CREATE":
      const newCollection = {
        id: Math.random().toString(36).substring(2, 9),
        name: payload.name,
        bannerUrl: payload.bannerUrl,
        animes: payload.animeId ? [animeId] : [],
      };
      return [...state, newCollection];

    case "EDIT":
      const selectedCollection0 = state.find((coll) => coll.id === payload.id);
      if (selectedCollection0) {
        selectedCollection0.name = payload.name;
      }
      return state;

    case "DELETE":
      state.filter((coll) => coll.id !== payload.id);
      return state;

    case "ADD_ANIME":
      const collection1 = state.find((coll) => coll.id === payload.id);

      if (collection1) {
        if (collection1.animes.length === 0) {
          collection1.animes = [payload.animeId];
          collection1.bannerUrl = [payload.bannerUrl];
        } else {
          const animeSet = new Set(collection1.animes);
          animeSet.add(payload.animeId);
          collection1.animes = [...animeSet];
        }
      }
      return state;

    case "REMOVE_ANIME":
      const collection2 = state.find((coll) => coll.id === payload.id);
      if (collection2) {
        collection2.animes = collection2.animes.filter(
          (animeId) => animeId !== payload.animeId
        );
      }
      return state;

    default:
      return state;
  }
};

const CollectionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionReducer);

  return (
    <CollectionContext.Provider value={[state, dispatch]}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
