import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/outline";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 1px #00000040;
  }
`;
const Cover = styled.div`
  flex: none;
  background: lightgray;
`;
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Desc = styled.p`
  margin: 0;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Title = styled.h3`
  flex: 1;
  margin: 1rem 0;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AnimeCard = ({
  id,
  title,
  description,
  episodes,
  coverImage,
  averageScore,
}) => {
  const handleClick = () => {};

  return (
    <Link href={`/anime/${id}`}>
      <Card>
        <Cover>
          <Image
            src={coverImage.extraLarge}
            layout="responsive"
            objectFit="cover"
            width={100}
            height={100}
          />
        </Cover>
        <Body>
          <Desc>{description || "-"}</Desc>
          <Title title={title.english}>{title.english || "-"}</Title>
          <Footer>
            <StarIcon height="1em" />
            <span>{averageScore}</span>
            <span>•</span>
            <span>{episodes} EP</span>
          </Footer>
        </Body>
      </Card>
    </Link>
  );
};

export default AnimeCard;
