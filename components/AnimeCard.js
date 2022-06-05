import React, { useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/outline";
import { Card, Truncate } from "../components/styled";
import { defaultBannerUrl } from "../utils/utils";

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
  useState(coverImage.large);
  return (
    <Link href={`/anime/${id}`}>
      <Card>
        <Cover>
          <Image
            src={coverImage.large || defaultBannerUrl}
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
            <span>{averageScore || "-"}</span>
            <span>•</span>
            <span>{episodes || "-"} EP</span>
          </Footer>
        </Body>
      </Card>
    </Link>
  );
};

export default AnimeCard;
