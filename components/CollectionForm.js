import { Input, Modal, Text, useToasts } from "@geist-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { collectionNameValidation } from "../utils/utils";
import {
  createCollection,
  editCollection,
  useCollection,
} from "../context/CollectionProvider";

const CollectionForm = ({ visible = false, collection, onClose }) => {
  const { register, getValues, setValue, trigger, getFieldState } = useForm();
  const { setToast } = useToasts();
  const [collections, dispatch] = useCollection();
  const isEdit = collection != null;

  useEffect(() => {
    visible && setValue("name", isEdit ? collection.name : "");
  }, [collection, visible, isEdit]);

  const onSubmit = async () => {
    await trigger("name", { shouldFocus: true });
    const { error } = getFieldState("name");

    if (error) {
      setToast({ type: "error", text: error.message });
      return;
    }
    const name = getValues("name").trim();

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
          {...register(
            "name",
            collectionNameValidation(
              isEdit
                ? collections.filter((coll) => coll.id !== collection.id)
                : collections
            )
          )}
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
