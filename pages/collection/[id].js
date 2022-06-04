import Image from "next/image";
import React, { useEffect, useState } from "react";
import AnimeCard from "../../components/AnimeCard";
import {
  Banner,
  Grid,
  Heading,
  Text,
  Container,
} from "../../components/styled";
import { useCollection } from "../../context/CollectionProvider";
import { defaultBannerUrl } from "../../utils/utils";

const CollectionDetail = ({ id }) => {
  const [collections, dispatch] = useCollection();
  const [collection, setCollection] = useState(null);
  const [animes, setAnimes] = useState(null);

  useEffect(() => {
    setCollection(collections.find((coll) => coll.id === id));
  }, [collections]);

  useEffect(() => {
    if (!collection || collection.animes.length === 0) return;

    const getAnimes = async () => {
      const res = await fetch("/api/anime?id=" + collection.animes);
      const data = await res.json();

      if (data.media) setAnimes(data.media);
    };
    getAnimes();
  }, [collection]);

  if (!collection) return <Text as="h2">Collection not Found.</Text>;

  const { name, bannerUrl } = collection;

  return (
    <>
      <Banner>
        <Image
          src={bannerUrl || defaultBannerUrl}
          layout="fill"
          objectFit="cover"
          priority
        />
      </Banner>

      <Container>
        <Heading mb="1rem">{name}</Heading>

        {animes && (
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
                <AnimeCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  episodes={episodes}
                  coverImage={coverImage}
                  averageScore={averageScore}
                />
              )
            )}
          </Grid>
        )}
        {!animes && <Text>No animes in collection.</Text>}
      </Container>
    </>
  );
};

export default CollectionDetail;

export async function getServerSideProps(context) {
  return {
    props: { id: context.params.id },
  };
}
