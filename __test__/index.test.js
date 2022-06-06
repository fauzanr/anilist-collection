import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Collection from "../pages/collection/index";
import { animes, pageInfo, collections } from "./data";
import { CollectionContext } from "../context/CollectionProvider";
import { ThemeProvider } from "@emotion/react";
import theme from "../utils/theme";
import CollectionDetail from "../pages/collection/[id]";

import AnimeList from "../pages/anime";

// describe("Anime List", () => {
//   it("renders 10 cards", async () => {
//     const props = {
//       animes,
//       pageInfo,
//     };
//     const { findAllByTestId } = render(<AnimeList {...props} />);

//     const card = findAllByTestId(/anime-card/i);
//     expect(card.length).toBe(10);
//   });
// });

describe("Collection List", () => {
  let CollectionPage;

  beforeEach(() => {
    CollectionPage = () => (
      <CollectionContext.Provider value={[collections, jest.fn()]}>
        <ThemeProvider theme={theme}>
          <Collection />
        </ThemeProvider>
      </CollectionContext.Provider>
    );
  });

  it(`renders ${collections.length} collections`, async () => {
    const { getAllByTestId, getByText } = render(<CollectionPage />);

    const cards = getAllByTestId(/collection-card/i);
    const title = getByText(collections[0].name);

    expect(cards.length).toBe(collections.length);
    expect(title.innerHTML).toBe(collections[0].name);
  });

  it(`renders edit and remove button`, async () => {
    const { getAllByTestId } = render(<CollectionPage />);

    const editBtns = getAllByTestId(/edit-btn/i);
    const remove = getAllByTestId(/remove-btn/i);

    expect(editBtns.length).toBe(collections.length);
    expect(remove.length).toBe(collections.length);
  });

  it(`show a collection remove modal`, async () => {
    const { getAllByTestId, getByText } = render(<CollectionPage />);

    const removeBtn = getAllByTestId(/remove-btn/i);
    fireEvent.click(removeBtn[0]);
    const removeModal = getByText(collections[0].name);

    expect(removeModal).toBeInTheDocument();
  });

  it(`show a collection edit modal`, async () => {
    const { getAllByTestId, getByText } = render(<CollectionPage />);

    const editBtn = getAllByTestId(/edit-btn/i);
    fireEvent.click(editBtn[0]);
    const editModal = getByText(collections[0].name);

    expect(editModal).toBeInTheDocument();
  });

  it(`show an add collection modal`, async () => {
    const { getByTestId, getByText } = render(<CollectionPage />);

    const addBtn = getByTestId(/add-btn/i);
    fireEvent.click(addBtn);
    const addModal = getByText("Add New Collection");

    expect(addModal).toBeInTheDocument();
  });
});

describe("Collection Detail", () => {
  let CollectionPage;

  beforeEach(() => {
    CollectionPage = () => (
      <CollectionContext.Provider value={[collections, jest.fn()]}>
        <ThemeProvider theme={theme}>
          <CollectionDetail id={collections[0].id} />
        </ThemeProvider>
      </CollectionContext.Provider>
    );
  });

  it(`render a collection detail`, async () => {
    const { getByText } = render(<CollectionPage />);

    const title = getByText(collections[0].name);

    expect(title).toBeInTheDocument();
  });

  it(`show an edit modal`, async () => {
    const { getByText } = render(<CollectionPage />);

    const editBtn = getByText(/Edit/i);
    fireEvent.click(editBtn);
    const editModal = getByText("Edit Collection");

    expect(editModal).toBeInTheDocument();
  });
});
