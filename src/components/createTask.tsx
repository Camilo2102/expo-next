import { gql, useMutation } from "@apollo/client";
import { Button, useDisclosure } from "@chakra-ui/react";
import React, { FormEvent, useRef, useState } from "react";
import TaskModal from "./taskModal";

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            
          

            const formData = new FormData(e.target as HTMLFormElement);
            const title = formData.get('title') as String;
            const description = formData.get('description') as string;
            
            const dueDate = new Date(formData.get('dueDate') as string).toISOString();
            
            const priority = formData.get('priority') as string;

          
            const data = {
                title,
                completed: false,
                description,
                dueDate,
                priority 
            };
            
            console.log('Data:', data);
            await createTask({ variables: data });
            
            

            onClose();
        } catch (error: any) {
            console.error('Error creating task:', error.message);
        }
    };

    return (
        <div>
            <Button onClick={onOpen}>Create new task</Button>
            <TaskModal
                isOpen={isModalOpen}
                onClose={onClose}
                handleSubmit={handleSubmit}
                title="Create Task"
                buttonName="Create Task"
            />
        </div>
    );
}
