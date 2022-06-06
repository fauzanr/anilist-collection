import React, { useState } from "react";
import { Button, Input, Modal, Select, useToasts } from "@geist-ui/core";
import { Controller, useForm } from "react-hook-form";
import {
  addManyToCollection,
  addToCollection,
  createCollectionWithAnime,
  createCollectionWithAnimes,
  useCollection,
} from "../context/CollectionProvider";
import { collectionNameValidation } from "../utils/utils";
import { Text } from "./styled";

const AddToCollection = ({
  visible,
  bindings,
  anime,
  animes = [],
  multiple,
  onClose,
  onSubmitted,
}) => {
  const [collections, dispatch] = useCollection();
  const { register, getValues, setValue, trigger, getFieldState, control } =
    useForm();
  const [isNewCollection, setIsNewCollection] = useState(false);
  const { setToast } = useToasts();

  const onCloseModal = () => {
    setIsNewCollection(false);
    onClose();
  };

  const onSubmitModal = async () => {
    if (isNewCollection === true) {
      await trigger("collectionName");
      const { error } = getFieldState("collectionName");

      if (error) {
        setToast({ type: "error", text: error.message });
        return;
      }

      const name = getValues("collectionName").trim();
      if (multiple) {
        dispatch(createCollectionWithAnimes({ name, ids: animes }));
      } else {
        dispatch(createCollectionWithAnime({ name, anime }));
      }

      setToast({ type: "success", text: "Added Successfully" });
      setValue("collectionName", "");
      onCloseModal();
    } else {
      const id = getValues("collectionId");
      if (id == null) return;

      if (multiple) {
        dispatch(addManyToCollection({ id, ids: animes }));
      } else {
        dispatch(addToCollection({ id, anime }));
      }

      setToast({ type: "success", text: "Added Successfully" });
      setValue("collectionId", null);
      onCloseModal();
    }

    onSubmitted?.();
  };

  return (
    <Modal visible={visible} {...bindings} onClose={onCloseModal}>
      <Modal.Title>Add to My Collection</Modal.Title>

      <Modal.Content>
        <Text>
          Add {anime && (anime.title.english || anime.title.userPreferred)} to
        </Text>

        {isNewCollection ? (
          <>
            <Input
              placeholder="Enter new collection name"
              width="100%"
              marginBottom="1rem"
              autoFocus
              {...register(
                "collectionName",
                collectionNameValidation(collections)
              )}
            />

            <Button width="100%" onClick={() => setIsNewCollection(false)}>
              Pick a collection
            </Button>
          </>
        ) : (
          <>
            <Controller
              name="collectionId"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Choose collection"
                  width="100%"
                  marginBottom="1rem"
                  {...field}
                >
                  {collections.map((coll) => (
                    <Select.Option key={coll.id} value={coll.id}>
                      {coll.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />

            <Button width="100%" onClick={() => setIsNewCollection(true)}>
              + New Collection
            </Button>
          </>
        )}
      </Modal.Content>

      <Modal.Action passive onClick={onCloseModal}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={onSubmitModal}>Add</Modal.Action>
    </Modal>
  );
};

export default AddToCollection;
