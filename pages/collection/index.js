import React, { useState } from "react";
import { useCollection } from "../../context/CollectionProvider";
import CollectionForm from "../../components/CollectionForm";
import CollectionRemove from "../../components/CollectionRemove";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@geist-ui/core";
import { Card } from "../../components/styled";
import { defaultBannerUrl } from "../../utils/utils";

const Collection = () => {
  const [collections] = useCollection();
  const [modal, setModal] = useState({ form: false, remove: false });
  const [collection, setCollection] = useState(null);

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
      <Button onClick={(e) => openModal(e, "form")}>Add a Collection</Button>
      {collections.map((coll) => (
        <Link key={coll.id} href={`/collection/${coll.id}`}>
          <Card>
            <div>id: {coll.id}</div>
            <div>name: {coll.name}</div>
            <Button onClick={(e) => openModal(e, "form", coll)}>Edit</Button>
            <Button type="error" onClick={(e) => openModal(e, "remove", coll)}>
              Delete
            </Button>
            <div style={{ width: "50px", height: "50px" }}>
              <Image
                src={coll.bannerUrl || defaultBannerUrl}
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
          </Card>
        </Link>
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
