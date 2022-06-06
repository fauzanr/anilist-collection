import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Button, Modal, useModal, useToasts } from "@geist-ui/core";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import AnimeCard from "../../components/AnimeCard";
import {
  removeFromCollection,
  useCollection,
} from "../../context/CollectionProvider";
import { defaultBannerUrl } from "../../utils/utils";
import {
  Banner,
  Grid,
  Heading,
  Text,
  Container,
  Truncate,
} from "../../components/styled";
import styled from "@emotion/styled";
import CollectionForm from "../../components/CollectionForm";
import Head from "next/head";

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const ActionContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`;

const AnimeCardWithAction = ({ onClickRemove, ...rest }) => {
  return (
    <Wrapper>
      <AnimeCard {...rest} />
      <ActionContainer>
        <Button
          auto
          type="error"
          icon={<TrashIcon />}
          scale={2 / 3}
          onClick={onClickRemove}
        />
      </ActionContainer>
    </Wrapper>
  );
};

const CollectionDetail = ({ id }) => {
  const [collections, dispatch] = useCollection();
  const [collection, setCollection] = useState(null);
  const { visible: editVisible, setVisible: setEditVisible } = useModal();
  const { visible, setVisible, bindings } = useModal();
  const [anime, setAnime] = useState({ id: null, title: "" });
  const { setToast } = useToasts();

  useEffect(() => {
    setCollection(collections.find((coll) => coll.id === id) || null);
  }, [collections, id]);

  const { data: animes, error } = useSWR(
    collection ? `collection-detail-${collection.animes}` : null,
    () => fetch("/api/anime?id=" + collection.animes).then((res) => res.json())
  );

  const onClickRemove = (animeId, animeTitle) => {
    setAnime({ id: animeId, title: animeTitle });
    setVisible(true);
  };

  const onRemoveAnime = () => {
    if (!anime.id) return;
    dispatch(removeFromCollection({ id, animeId: anime.id }));
    setVisible(false);
    setToast({
      type: "success",
      text: `${anime.title} removed from collection`,
    });
  };

  if (!collection)
    return (
      <Container>
        <Text center>Collection not Found.</Text>
      </Container>
    );

  const { name, bannerUrl } = collection;

  return (
    <>
      <Head>
        <title>My Collection | {name}</title>
      </Head>

      <Banner>
        <Image
          src={bannerUrl || defaultBannerUrl}
          layout="fill"
          objectFit="cover"
          alt="Banner"
          priority
        />
      </Banner>

      <Container>
        <Heading>
          <Truncate title={name}>{name}</Truncate>
          <Button
            auto
            ghost
            iconRight={<PencilAltIcon />}
            onClick={() => setEditVisible(true)}
          >
            Edit
          </Button>
        </Heading>

        {error && <Text>Error fetching collection item.</Text>}
        <Grid>
          {animes && animes.length === 0 && <Text>No item in collection.</Text>}
          {animes &&
            animes.map(
              ({
                id,
                title,
                description,
                episodes,
                coverImage,
                averageScore,
              }) => (
                <AnimeCardWithAction
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  episodes={episodes}
                  coverImage={coverImage}
                  averageScore={averageScore}
                  onClickRemove={() => onClickRemove(id, title.english)}
                />
              )
            )}
        </Grid>
      </Container>

      <CollectionForm
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        collection={collection}
      />

      <Modal visible={visible} {...bindings}>
        <Modal.Title>Remove Anime</Modal.Title>

        <Modal.Content>
          <Text>Remove {anime.title} from collection?</Text>
        </Modal.Content>

        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action type="error" onClick={onRemoveAnime}>
          Remove
        </Modal.Action>
      </Modal>
    </>
  );
};

export default CollectionDetail;

export async function getServerSideProps(context) {
  return {
    props: { id: context.params.id },
  };
}
