import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Pagination, useModal } from "@geist-ui/core";
import { getAnimes } from "../../api";
import AnimeCard from "../../components/AnimeCard";
import { Grid, Heading, Container, Text } from "../../components/styled";
import styled from "@emotion/styled";
import { useState } from "react";
import AddToCollection from "../../components/AddToCollection";

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const Layer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: ${({ selected }) =>
    selected ? "rgba(93, 145, 217, 0.5)" : "rgba(0, 0, 0, 0.1)"};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
`;

const SelectionContainer = ({ isSelection, selected, onSelect, children }) => {
  return (
    <Wrapper>
      {isSelection && <Layer selected={selected} onClick={onSelect}></Layer>}
      {children}
    </Wrapper>
  );
};

const AnimeList = ({ animes, pageInfo }) => {
  const router = useRouter();
  const [isSelection, setIsSelection] = useState(false);
  const [selected, setSelected] = useState([]);
  const { visible, setVisible, bindings } = useModal();

  const { currentPage, lastPage } = pageInfo;

  const selectItem = (id) => {
    if (selected.includes(id)) {
      setSelected((selected) => selected.filter((s) => s !== id));
    } else {
      setSelected((selected) => {
        const set = new Set(selected);
        set.add(id);
        return [...set];
      });
    }
  };

  const closeSelection = () => {
    setSelected([]);
    setIsSelection(false);
  };

  return (
    <>
      <Head>
        <title>Explore Anime | Page {currentPage}</title>
      </Head>

      <Container>
        <Heading>Explore Anime</Heading>

        <ActionContainer>
          {isSelection ? (
            <>
              <Text>{selected.length} selected</Text>
              <Button auto onClick={closeSelection}>
                Cancel Selection
              </Button>
              <Button auto type="secondary" onClick={() => setVisible(true)}>
                + Add To Collection
              </Button>
            </>
          ) : (
            <Button auto type="secondary" onClick={() => setIsSelection(true)}>
              Select Multiple
            </Button>
          )}
        </ActionContainer>

        {animes.length === 0 && <Text center>No data available.</Text>}
        <Grid>
          {animes.map(
            ({
              id,
              title,
              description,
              episodes,
              coverImage,
              averageScore,
            }) => (
              <SelectionContainer
                key={id}
                isSelection={isSelection}
                selected={selected.includes(id)}
                onSelect={() => selectItem(id)}
              >
                <AnimeCard
                  id={id}
                  title={title}
                  description={description}
                  episodes={episodes}
                  coverImage={coverImage}
                  averageScore={averageScore}
                />
              </SelectionContainer>
            )
          )}
        </Grid>

        <Container center>
          <Pagination
            page={currentPage}
            initialPage={currentPage}
            count={lastPage}
            limit={5}
            margin="auto"
            onChange={(newPage) =>
              newPage !== currentPage &&
              router.push({ pathname: "/anime", query: { page: newPage } })
            }
          />
        </Container>

        <AddToCollection
          visible={visible}
          bindings={bindings}
          animes={selected}
          multiple
          onClose={() => setVisible(false)}
          onSubmitted={closeSelection}
        />
      </Container>
    </>
  );
};

export default AnimeList;

export async function getServerSideProps(context) {
  const { page } = context.query;

  const { data } = await getAnimes(parseInt(page) || 1, 10);

  const animes = data.Page.media;
  const pageInfo = data.Page.pageInfo;
  return {
    props: { animes, pageInfo },
  };
}
