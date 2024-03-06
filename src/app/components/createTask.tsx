import { gql, useMutation } from "@apollo/client";
import { Button, useDisclosure } from "@chakra-ui/react";
import React, { FormEvent, useRef, useState } from "react";
import TaskModal from "./taskModal";
import { useReloadContext } from "../context/taskContext";
import { Task } from "@prisma/client";

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($title: String!, $completed: Boolean!, $description: String!, $dueDate: String!, $priority: Priority!) {
    createTask(data: {title: $title, completed: $completed, description: $description, dueDate: $dueDate, priority: $priority}) {
      completed
      description
      dueDate
      id
      priority
      title
    }
  }
`;

export default function CreateTask() {
    const [isOpen, setIsOpen] = useState(false);
    const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [createTask] = useMutation(CREATE_TASK_MUTATION);

    const {reloadTable} = useReloadContext();

    const handleSubmit = async (task: Task) => {
        try {
            await createTask({ variables: task });
            
            reloadTable();
            onClose();
        } catch (error: any) {
            console.error('Error creating task:', error.message);
        }
    };

    return (
        <div>
            <Button onClick={onOpen} colorScheme='whatsapp'>Crear tarea</Button>
            <TaskModal
                isOpen={isModalOpen}
                onClose={onClose}
                handleSubmit={handleSubmit}
                title="Crear tarea"
                buttonName="Crear"
                isEnabled={true}
            />
        </div>
    );
}
