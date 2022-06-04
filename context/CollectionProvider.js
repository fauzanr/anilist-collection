import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  collectionStorageName,
  defaultBannerUrl,
  generateId,
} from "../utils/utils";

// {
//   id: '',
//   name: '',
//   bannerUrl: ''
//   animes: [],
// }

export const createCollection = ({ name }) => ({
  type: "CREATE",
  payload: { name },
});

export const createCollectionWithAnime = ({ name, anime }) => ({
  type: "CREATE",
  payload: { name, animeId: anime.id, bannerUrl: anime.bannerImage },
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

const collectionReducer = (state, action) => {
  const { type = "", payload = {} } = action;

  let newState = state;

  switch (type) {
    case "CREATE":
      const newCollection = {
        id: generateId(),
        name: payload.name,
        bannerUrl: payload.bannerUrl || defaultBannerUrl,
        animes: payload.animeId ? [payload.animeId] : [],
      };

      newState = [...state, newCollection];
      break;

    case "EDIT":
      const selectedCollection0 = state.find((coll) => coll.id === payload.id);
      if (selectedCollection0) {
        selectedCollection0.name = payload.name;
      }
      newState = state;
      break;

    case "DELETE":
      state = state.filter((coll) => coll.id !== payload.id);
      newState = state;
      break;

    case "ADD_ANIME":
      const collection1 = state.find((coll) => coll.id === payload.id);

      if (collection1) {
        if (collection1.animes.length === 0) {
          collection1.animes = [payload.animeId];
          collection1.bannerUrl = payload.bannerUrl || defaultBannerUrl;
        } else {
          const animeSet = new Set(collection1.animes);
          animeSet.add(payload.animeId);
          collection1.animes = [...animeSet];
        }
      }
      newState = state;
      break;

    case "REMOVE_ANIME":
      const collection2 = state.find((coll) => coll.id === payload.id);
      if (collection2) {
        collection2.animes = collection2.animes.filter(
          (animeId) => animeId !== payload.animeId
        );
      }
      newState = state;
      break;

    case "SET_STATE":
      state = payload;
      newState = state;
      break;
  }

  localStorage.setItem(collectionStorageName, JSON.stringify(newState));
  return newState;
};

export const CollectionContext = createContext();

export const useCollection = () => useContext(CollectionContext);

const getInitialState = () => {
  return localStorage.getItem(collectionStorageName)
    ? JSON.parse(localStorage.getItem(collectionStorageName))
    : [];
};

const CollectionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionReducer, []);

  useEffect(() => {
    dispatch({ type: "SET_STATE", payload: getInitialState() });
  }, []);

  useEffect(() => {}, [state]);

  return (
    <CollectionContext.Provider value={[state, dispatch]}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
