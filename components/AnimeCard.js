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
  gap: 0.5rem;
  padding: 1rem;
`;
const Truncate = styled.div`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-height: 3em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
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
  return (
    <Link href={`/anime/${id}`}>
      <Card>
        <Cover>
          <Image
            src={coverImage.extraLarge}
            layout="responsive"
            objectFit="cover"
            width={200}
            height={200}
          />
        </Cover>
        <Body>
          <Truncate as="h3" title={title.english}>
            {title.english || "-"}
          </Truncate>
          <Truncate as="p">{description || "-"}</Truncate>
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
