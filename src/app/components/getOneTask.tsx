"use client";

import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import TaskModal from "./taskModal";
import { Task } from "@prisma/client";
import LoadingComponent from "./loadingComponent";
import { ViewIcon } from "@chakra-ui/icons";

const GET_ONE_TASK_QUERY = gql`
  query GetOneTask($id: ID!) {
    task(id: $id) {
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
  const [getTask]  = useLazyQuery(GET_ONE_TASK_QUERY, {
    variables: { id },
  });

  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

  const getOneTask = () => {
    setLoading(true)

    getTask({variables: {id}}).then(res => {
      setTask(res.data.task)
    }).catch(err => {
      setError(err)
    }).finally(() =>{
      setLoading(false);
    })
  }

  if(loading) return <LoadingComponent></LoadingComponent>

  if(error) return <p>Error: {error.message}</p>


  const handleClick = () => {
    getOneTask()
    onOpen()
  }

  return (
    <>
    <Button colorScheme='green' leftIcon={<ViewIcon />} onClick={handleClick}>
          Ver
    </Button>
      <TaskModal
      isOpen={isModalOpen}
      onClose={onClose}
      buttonName="Información"
      title="Información"
      task={task}
      isEnabled={false}
    />
    </>
  );
}
