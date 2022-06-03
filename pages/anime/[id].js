import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import {
  addToCollection,
  createCollectionWithAnime,
  useCollection,
} from "../../context/CollcectionProvider";
import {
  Button,
  Input,
  Modal,
  Select,
  useModal,
  useToasts,
} from "@geist-ui/core";
import { Controller, useForm } from "react-hook-form";

const Banner = styled.div`
  height: 180px;
  position: relative;
`;

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

const Text = styled.p`
  margin-bottom: ${({ mb }) => mb};
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
      setToast({ text: "Added Successfully" });
      setValue("collectionName", "");
      onCloseModal(false);
    } else {
      const id = getValues("collectionId");
      if (id == null) return;
      dispatch(addToCollection({ id, anime }));
      setToast({ text: "Added Successfully" });
      setValue("collectionId", null);
      onCloseModal(false);
    }
  };

  return (
    <>
      <Banner>
        <Image src={bannerImage} layout="fill" objectFit="cover" priority />
      </Banner>

      <Container>
        <Main>
          <CoverPlaceholder>
            <CoverContainer>
              <Image
                src={coverImage.extraLarge || coverImage.extra}
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
              <Text as="h2">{episodes}</Text>
              <Text>Episodes</Text>
            </Metric>
            <Metric>
              <Text as="h2">{averageScore}</Text>
              <Text>Score</Text>
            </Metric>
            <Metric>
              <Text as="h2">{popularity}</Text>
              <Text>Popularity</Text>
            </Metric>
          </Metrics>

          <Button type="success" onClick={() => setVisible(true)}>
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

export async function getServerSideProps() {
  const data = {
    Media: {
      id: 140960,
      title: {
        english: "SPY x FAMILY",
        userPreferred: "SPY×FAMILY",
      },
      description:
        'Everyone has a part of themselves they cannot show to anyone else.\n<br><br>\nAt a time when all nations of the world were involved in a fierce war of information happening behind closed doors, Ostania and Westalis had been in a state of cold war against one another for decades. The Westalis Intelligence Services\' Eastern-Focused Division (WISE) sends their most talented spy, "Twilight," on a top-secret mission to investigate the movements of Donovan Desmond, the chairman of Ostania\'s National Unity Party, who is threatening peace efforts between the two nations.\n<br><br>\nThis mission is known as "Operation Strix." It consists of "putting together a family in one week in order to infiltrate social gatherings organized by the elite school that Desmond\'s son attends." <br><br>\n"Twilight" takes on the identity of psychiatrist Loid Forger and starts looking for family members. But Anya, the daughter he adopts, turns out to have the ability to read people\'s minds, while his wife, Yor, is an assassin! With it being in each of their own interests to keep these facts hidden, they start living together while concealing their true identities from one another. <br>\nWorld peace is now in the hands of this brand-new family as they embark on an adventure full of surprises.\n<br><br>\n(Source: Crunchyroll)',
      episodes: 12,
      bannerImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg",
      coverImage: {
        extraLarge:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Yl5M3AiLZAMq.png",
        large:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx140960-Yl5M3AiLZAMq.png",
      },
      genres: ["Action", "Comedy", "Slice of Life", "Supernatural"],
      averageScore: 88,
      popularity: 172003,
      characters: {
        edges: [
          {
            node: {
              id: 138101,
              name: {
                full: "Loid Forger",
              },
            },
            voiceActors: [
              {
                id: 102695,
                name: {
                  full: "Takuya Eguchi",
                },
              },
              {
                id: 108235,
                name: {
                  full: "Alex Organ",
                },
              },
              {
                id: 100120,
                name: {
                  full: "Tim Knauer",
                },
              },
              {
                id: 208660,
                name: {
                  full: "Miguel de León",
                },
              },
              {
                id: 195092,
                name: {
                  full: "Guilherme Marques",
                },
              },
              {
                id: 271598,
                name: {
                  full: "Glen Hervé",
                },
              },
            ],
          },
          {
            node: {
              id: 138102,
              name: {
                full: "Yor Forger",
              },
            },
            voiceActors: [
              {
                id: 95869,
                name: {
                  full: "Saori Hayami",
                },
              },
              {
                id: 144358,
                name: {
                  full: "Natalie Van Sistine",
                },
              },
              {
                id: 133021,
                name: {
                  full: "Daniela Molina",
                },
              },
              {
                id: 106623,
                name: {
                  full: "Romina Marroquín Payró",
                },
              },
              {
                id: 199293,
                name: {
                  full: "Maíra Paris",
                },
              },
              {
                id: 102669,
                name: {
                  full: "Adeline Chetail",
                },
              },
            ],
          },
          {
            node: {
              id: 138100,
              name: {
                full: "Anya Forger",
              },
            },
            voiceActors: [
              {
                id: 112215,
                name: {
                  full: "Atsumi Tanezaki",
                },
              },
              {
                id: 120247,
                name: {
                  full: "Megan Shipman",
                },
              },
              {
                id: 143592,
                name: {
                  full: "Lana Finn Marti",
                },
              },
              {
                id: 189432,
                name: {
                  full: "Elizabeth Infante",
                },
              },
              {
                id: 205014,
                name: {
                  full: "Nina Carvalho",
                },
              },
              {
                id: 221274,
                name: {
                  full: "Lila Lacombe",
                },
              },
            ],
          },
          {
            node: {
              id: 157888,
              name: {
                full: "Franky Franklin",
              },
            },
            voiceActors: [
              {
                id: 95283,
                name: {
                  full: "Hiroyuki Yoshino",
                },
              },
              {
                id: 102450,
                name: {
                  full: "Anthony Bowling",
                },
              },
              {
                id: 105706,
                name: {
                  full: "Dirk Petrick",
                },
              },
              {
                id: 272074,
                name: {
                  full: "Jean-Rémi Tichit",
                },
              },
              {
                id: 100133,
                name: {
                  full: "Thiago Keplmair",
                },
              },
              {
                id: 116839,
                name: {
                  full: "Miguel Ángel Ruiz",
                },
              },
            ],
          },
          {
            node: {
              id: 180190,
              name: {
                full: "Henry Henderson",
              },
            },
            voiceActors: [
              {
                id: 101755,
                name: {
                  full: "Kazuhiro Yamaji",
                },
              },
              {
                id: 249500,
                name: {
                  full: "Julien Kramer",
                },
              },
              {
                id: 100431,
                name: {
                  full: "Barry Yandell",
                },
              },
              {
                id: 182488,
                name: {
                  full: "Hélio Ribeiro",
                },
              },
              {
                id: 96669,
                name: {
                  full: "Erich Räuker",
                },
              },
              {
                id: 201026,
                name: {
                  full: "Rodrigo Martínez",
                },
              },
            ],
          },
          {
            node: {
              id: 180192,
              name: {
                full: "Donovan Desmond",
              },
            },
            voiceActors: [
              {
                id: 104256,
                name: {
                  full: "Philippe Roullier",
                },
              },
            ],
          },
          {
            node: {
              id: 157887,
              name: {
                full: "Sylvia Sherwood",
              },
            },
            voiceActors: [
              {
                id: 95428,
                name: {
                  full: "Yuuko Kaida",
                },
              },
              {
                id: 277088,
                name: {
                  full: "Sabrina Marchese",
                },
              },
              {
                id: 103549,
                name: {
                  full: "Antje von der Ahe",
                },
              },
              {
                id: 257282,
                name: {
                  full: "Clara Rocha",
                },
              },
              {
                id: 257282,
                name: {
                  full: "Clara Rocha",
                },
              },
              {
                id: 95475,
                name: {
                  full: "Stephanie Young",
                },
              },
              {
                id: 108265,
                name: {
                  full: "Karina Altamirano",
                },
              },
            ],
          },
        ],
      },
    },
  };

  const characters = data.Media?.characters?.edges || [];
  const anime = data.Media;

  delete anime?.characters;

  return {
    props: { anime, characters },
  };
}
