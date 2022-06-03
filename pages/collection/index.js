import React, { useState } from "react";
import { useCollection } from "../../context/CollcectionProvider";
import Image from "next/image";
import { Button } from "@geist-ui/core";
import CollectionForm from "../../components/CollectionForm";
import CollectionRemove from "../../components/CollectionRemove";

const Collection = () => {
  const [collections] = useCollection();
  const [modal, setModal] = useState({ form: false, remove: false });
  const [collection, setCollection] = useState(null);

  const openModal = (modal, coll) => {
    setCollection(coll || null);
    setModal((m) => ({ ...m, [modal]: true }));
  };

  const closeModal = (modal) => {
    // setCollection(null);
    setModal((m) => ({ ...m, [modal]: false }));
  };

  return (
    <>
      <Button onClick={() => openModal("form")}>Add a Collection</Button>
      {collections.map((coll) => (
        <div key={coll.id} style={{ marginBottom: "1rem" }}>
          <div>id: {coll.id}</div>
          <div>name: {coll.name}</div>
          <Button onClick={() => openModal("form", coll)}>Edit</Button>
          <Button type="error" onClick={() => openModal("remove", coll)}>
            Delete
          </Button>
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
              <div key={anime}>{anime}</div>
            ))}
          </div>
        </div>
      ))}
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
