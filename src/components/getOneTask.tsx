"use client";

import { gql, useQuery } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import TaskModal from "./taskModal";

const getOneQuery = gql`
  query GetTask($id: String!) {
    task(where: { id: $id }) {
      id
      title
      description
    }
  }
`;

export default function GetOneTask({ id }: { id: string }) {
  const { data, loading, error } = useQuery(getOneQuery, {
    variables: { id },
  });

  const [isOpen, setIsOpen] = useState(true);
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <TaskModal
      isOpen={isModalOpen}
      onClose={onClose}
      buttonName="Create Task"
      initialRef={initialRef}
      finalRef={finalRef}
    />
  );
}
