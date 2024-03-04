'use client'

import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react';
import { Task } from '@prisma/client';
import { title } from 'process';
import React, { FormEvent } from "react";


interface ModalTaskProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    buttonName?: string;
    task?: Task;
    title: string;
}



export default function TaskModal({ isOpen, onClose, handleSubmit, buttonName, title, task }: ModalTaskProps) {

    const initialTitle = task ? task.title : '';
    const initialDescription = task ? task.description : '';

    const initialPriority = task ? task.priority : '';

    const initialDueDate = task && task.dueDate ? new Date(parseInt(task.dueDate)).toISOString().split('T')[0] : '';

    //const initialDueDate = task && task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';

    


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input name="title" defaultValue={initialTitle} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input name="description" defaultValue={initialDescription} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Due Date</FormLabel>
                                <Input name="dueDate" type="date" defaultValue={initialDueDate} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Priority</FormLabel>
                                <Select name='priority' placeholder='Select priority' defaultValue={initialPriority}>
                                    <option value='HIGH'>High</option>
                                    <option value='NORMAL'>Normal</option>
                                    <option value='LOW'>Low</option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        {buttonName && handleSubmit && (
                            <Button type="submit" colorScheme="blue" mr={3}>
                                {buttonName}
                            </Button>
                        )}
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>

                </form>
            </ModalContent>
        </Modal>
    );
}