import { Modal, Text, useToasts } from "@geist-ui/core";
import React from "react";
import {
  removeCollection,
  useCollection,
} from "../context/CollcectionProvider";

const CollectionRemove = ({ visible = false, collection, onClose }) => {
  const [, dispatch] = useCollection();
  const { setToast } = useToasts();

  const onSubmit = () => {
    if (collection == null) return;
    dispatch(removeCollection(collection.id));
    setToast({ type: "success", text: "Collection removed" });
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>Remove Collection</Modal.Title>

      <Modal.Content>
        <Text>Remove {collection?.name}?</Text>
      </Modal.Content>

      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action type="error" onClick={onSubmit}>
        Remove
      </Modal.Action>
    </Modal>
  );
};

export default CollectionRemove;
