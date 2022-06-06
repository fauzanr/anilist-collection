import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@geist-ui/core";
import styled from "@emotion/styled";
import { useCollection } from "../../context/CollectionProvider";
import CollectionForm from "../../components/CollectionForm";
import CollectionRemove from "../../components/CollectionRemove";
import {
  Card,
  Container,
  Grid,
  Heading,
  Truncate,
} from "../../components/styled";
import { defaultBannerUrl } from "../../utils/utils";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Head from "next/head";

const CardRelative = styled(Card)`
  position: relative;
  height: 150px;
  color: white;
`;

const BackDrop = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const BlurBg = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const CollectionActions = styled.div`
  position: absolute;
  display: flex;

  gap: 0.5rem;
  top: 0.5rem;
  right: 0.5rem;
  left: auto;

  transition: all 0.1s linear;

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    opacity: ${({ show }) => (show ? 1 : 0)};
  }
`;

const Collection = () => {
  const [collections] = useCollection();
  const [modal, setModal] = useState({ form: false, remove: false });
  const [collection, setCollection] = useState(null);
  const [hover, setHover] = useState(null);

  const openModal = (e, modal, coll) => {
    e.stopPropagation();
    setCollection(coll || null);
    setModal((m) => ({ ...m, [modal]: true }));
  };

  const closeModal = (modal) => {
    setModal((m) => ({ ...m, [modal]: false }));
  };

  return (
    <>
      <Head>
        <title>My Collection</title>
      </Head>

      <Container>
        <Heading>My Collections</Heading>

        <Button mb={1} onClick={(e) => openModal(e, "form")}>
          + Add a Collection
        </Button>

        <Grid>
          {collections.map((coll) => (
            <Link key={coll.id} href={`/collection/${coll.id}`}>
              <CardRelative
                onMouseOver={() => setHover(coll.id)}
                onMouseLeave={() => setHover(null)}
              >
                <BackDrop>
                  <Image
                    src={coll.bannerUrl || defaultBannerUrl}
                    layout="fill"
                    objectFit="cover"
                    alt="Collection Banner"
                  />
                </BackDrop>

                <BlurBg>
                  <CollectionActions show={hover === coll.id}>
                    <Button
                      auto
                      icon={<PencilAltIcon />}
                      onClick={(e) => openModal(e, "form", coll)}
                    />
                    <Button
                      auto
                      icon={<TrashIcon />}
                      onClick={(e) => openModal(e, "remove", coll)}
                    />
                  </CollectionActions>

                  <Truncate>{coll.name}</Truncate>
                  <small>{coll.animes.length} items</small>
                </BlurBg>
              </CardRelative>
            </Link>
          ))}
        </Grid>
      </Container>

      <CollectionForm
        visible={modal.form}
        onClose={() => closeModal("form")}
        collection={collection}
      />
      <CollectionRemove
        visible={modal.remove}
        onClose={() => closeModal("remove")}
        collection={collection}
      />
    </>
  );
};

export default Collection;
