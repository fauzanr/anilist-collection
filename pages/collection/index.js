import React, { useState } from "react";
import {
  addToCollection,
  createCollection,
  useCollection,
} from "../../context/CollcectionProvider";
import Image from "next/image";

const Collection = () => {
  const [collections, dispatch] = useCollection();
  const [collectionName, setCollectionName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!collectionName) return;
    if (collections.some((coll) => coll.name == collectionName.trim())) {
      alert("name must unique");
      return;
    }
    dispatch(createCollection({ name: collectionName }));
    setCollectionName("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name=""
          id=""
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
      </form>
      {collections.map((coll) => (
        <div key={coll.id} style={{ marginBottom: "1rem" }}>
          <div>id: {coll.id}</div>
          <div>name: {coll.name}</div>
          <div style={{ width: "50px", height: "50px" }}>
            <Image
              src={coll.bannerUrl}
              layout="responsive"
              objectFit="cover"
              width="50"
              height="50"
            />
          </div>
          <div>
            {coll.animes.map((anime) => (
              <div>{anime}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collection;
