import { Input, Modal, Text, useToasts } from "@geist-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createCollection,
  editCollection,
  useCollection,
} from "../context/CollectionProvider";

const CollectionForm = ({ visible = false, collection, onClose }) => {
  const { register, getValues, setValue } = useForm();
  const { setToast } = useToasts();
  const [, dispatch] = useCollection();
  const isEdit = collection != null;

  useEffect(() => {
    visible && setValue("name", isEdit ? collection.name : "");
  }, [collection, visible]);

  const onSubmit = () => {
    const name = getValues("name");
    if (name.trim() == "") return;

    if (isEdit === true) {
      dispatch(editCollection({ id: collection?.id, name }));
      setToast({ type: "success", text: "Collection edited" });
    } else {
      dispatch(createCollection({ name }));
      setToast({ type: "success", text: "Collection added" });
    }
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>
        {isEdit === true ? `Edit Collection` : "Add New Collection"}
      </Modal.Title>

      <Modal.Content>
        <Text>Name</Text>
        <Input
          placeholder="Enter collection name"
          width="100%"
          marginBottom="1rem"
          {...register("name")}
        />
      </Modal.Content>

      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={onSubmit}>
        {isEdit === true ? "Edit" : "Add"}
      </Modal.Action>
    </Modal>
  );
};

export default CollectionForm;
