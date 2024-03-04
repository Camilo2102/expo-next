"use client";

import { gql, useQuery } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import TaskModal from "./taskModal";

const getOneQuery = gql`
  query {
    task(where: { id: $id }) {
      id
      dueDate
      description
      completed
      priority
      title
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

  const [isEnabled, setIsEnabled] = useState(false)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const task = data?.task;

  return (
    <TaskModal
      isOpen={isModalOpen}
      onClose={onClose}
      buttonName="OK Task"
      title="Info Task"
      task={task}
      isEnabled={isEnabled}
    />
  );
}
