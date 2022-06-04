import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { Banner, Text } from "../../components/styled";
import {
  addToCollection,
  createCollectionWithAnime,
  useCollection,
} from "../../context/CollectionProvider";
import {
  Button,
  Input,
  Modal,
  Select,
  useModal,
  useToasts,
} from "@geist-ui/core";
import { getAnime } from "../../api";
import { defaultBannerUrl } from "../../utils/utils";

const Container = styled.div`
  padding: 1rem;
  max-width: 1500px;
  margin: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 1rem;
  }
`;

const Main = styled.div`
  margin-bottom: 2rem;
`;

const CoverPlaceholder = styled.div`
  position: relative;
  height: 87px;
  margin-bottom: 1rem;
`;

const CoverContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 240px;
  width: 240px;
  border: 4px solid #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Metrics = styled(FlexRow)`
  justify-content: center;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
  }
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: flex-start;
  }
`;

const Tags = styled(FlexRow)`
  flex-wrap: wrap;
`;

const Tag = styled.label`
  padding: 0 0.5rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.blue1};
`;

const Aside = styled.div``;

const CollectionList = styled.div`
  margin-bottom: 2rem;
`;
const CharacterList = styled.div`
  margin-bottom: 2rem;
`;

const AnimeDetail = ({ anime, characters = [] }) => {
  const {
    id,
    title = {},
    description,
    episodes,
    bannerImage,
    coverImage = {},
    genres = [],
    averageScore,
    popularity,
  } = anime;

  const { visible, setVisible, bindings } = useModal();
  const [collections, dispatch] = useCollection();
  const { register, getValues, setValue, control } = useForm();
  const [isNewCollection, setIsNewCollection] = useState(false);
  const { setToast } = useToasts();

  const fullTitle = title.english || title.userPreferred;
  const inCollections = collections.filter(({ animes }) => animes.includes(id));

  // const { field: selectField } = useController({ name: "collectionId" });

  const onCloseModal = () => {
    setVisible(false);
    setIsNewCollection(false);
  };

  const onSubmitModal = () => {
    if (isNewCollection === true) {
      const name = getValues("collectionName");
      if (name.trim() == "") return;
      dispatch(createCollectionWithAnime({ name, anime }));
      setToast({ type: "success", text: "Added Successfully" });
      setValue("collectionName", "");
      onCloseModal(false);
    } else {
      const id = getValues("collectionId");
      if (id == null) return;
      dispatch(addToCollection({ id, anime }));
      setToast({ type: "success", text: "Added Successfully" });
      setValue("collectionId", null);
      onCloseModal(false);
    }
  };

  return (
    <>
      <Banner>
        <Image
          src={bannerImage || defaultBannerUrl}
          layout="fill"
          objectFit="cover"
          priority
        />
      </Banner>

      <Container>
        <Main>
          <CoverPlaceholder>
            <CoverContainer>
              <Image
                src={coverImage.large || defaultBannerUrl}
                layout="responsive"
                objectFit="cover"
                width={200}
                height={200}
              />
            </CoverContainer>
          </CoverPlaceholder>

          <Title>{fullTitle}</Title>

          <Metrics>
            <Metric>
              <Text as="h2">{episodes || "-"}</Text>
              <Text>Episodes</Text>
            </Metric>
            <Metric>
              <Text as="h2">{averageScore || "-"}</Text>
              <Text>Score</Text>
            </Metric>
            <Metric>
              <Text as="h2">{popularity || "-"}</Text>
              <Text>Popularity</Text>
            </Metric>
          </Metrics>

          <Button type="success" mb={1} onClick={() => setVisible(true)}>
            + Add to My Collection
          </Button>

          <Text mb="1rem">{description}</Text>
          <Tags>
            {genres.map((genre) => (
              <Tag key={genre}>{genre}</Tag>
            ))}
          </Tags>
        </Main>

        <Aside>
          <CollectionList>
            <Title as="h2">In Collection</Title>
            {inCollections.length === 0 && <Text>Not in any collection.</Text>}
            {inCollections.map((coll) => (
              <div key={coll.id}>
                <Link href={`/collection/${coll.id}`}>{coll.name}</Link>
              </div>
            ))}
          </CollectionList>
          <CharacterList>
            <Title as="h2">Characters</Title>
            {characters.map(({ node = {}, voiceActors = [] }) => (
              <div key={node.id}>
                <Text as="h4">{node.name?.full}</Text>
                <Text mb="1rem">{voiceActors[0]?.name?.full}</Text>
              </div>
            ))}
          </CharacterList>
        </Aside>
      </Container>

      <Modal visible={visible} {...bindings} onClose={onCloseModal}>
        <Modal.Title>Add to My Collection</Modal.Title>

        <Modal.Content>
          <Text>Add {fullTitle} to</Text>

          {isNewCollection ? (
            <>
              <Input
                placeholder="Enter new collection name"
                width="100%"
                marginBottom="1rem"
                {...register("collectionName")}
              />
            </>
          ) : (
            <>
              <Controller
                name="collectionId"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Choose collection"
                    width="100%"
                    marginBottom="1rem"
                    {...field}
                  >
                    {collections.map((coll) => (
                      <Select.Option key={coll.id} value={coll.id}>
                        {coll.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />

              <Button width="100%" onClick={() => setIsNewCollection(true)}>
                + New Collection
              </Button>
            </>
          )}
        </Modal.Content>

        <Modal.Action passive onClick={onCloseModal}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={onSubmitModal}>Add</Modal.Action>
      </Modal>
    </>
  );
};

export default AnimeDetail;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data } = await getAnime(id);

  const characters = data.Media?.characters?.edges || [];
  const anime = data.Media;

  return {
    props: { anime, characters },
  };
}
