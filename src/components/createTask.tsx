'use client'

import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react';
import React from "react";

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

export default function CreateTaskComponent() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [createTask] = useMutation(CREATE_TASK_MUTATION);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const title = e.target.title.value;
            const description = e.target.description.value;
            const dueDate = new Date(e.target.dueDate.value).toISOString(); // Formatea la fecha como ISO-8601
            const priority = e.target.priority.value;

            await createTask({
                variables: { title, completed: false, description, dueDate, priority }
            });

            onClose();
        } catch (error: any) {
            console.error('Error creating task:', error.message);
        }
    };

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}> {/* Envuelve el contenido del modal con un formulario */}
                        <ModalHeader>Create Task</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input ref={initialRef} name="title" placeholder='Enter task title' /> {/* Agrega el atributo name */}
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input name="description" placeholder='Enter task description' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Due Date</FormLabel>
                                <Input name='dueDate' type='date' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Priority</FormLabel>
                                <Select name='priority' placeholder='Select priority'>
                                    <option value='HIGH'>High</option>
                                    <option value='NORMAL'>Normal</option>
                                    <option value='LOW'>Low</option>
                                </Select>
                            </FormControl>

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit'>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
