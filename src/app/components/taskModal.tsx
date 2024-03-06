'use client'

import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react';
import { Priority, Task } from '@prisma/client';
import { title } from 'process';
import React, { FormEvent } from "react";
import { useReloadContext } from '../context/taskContext';
import { convertStrToDate, getStrActualDate } from '../utils/dateUtil';
import { useInputHook } from '../hooks/useInputHook';


interface ModalTaskProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit?: (task: Task) => void;
    buttonName?: string;
    task?: Task;
    title: string;
    isEnabled: boolean;
}

const emptyTask = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    completed: false,
    priority: 'NORMAL',
} as Task;


export default function TaskModal({ isOpen, onClose, handleSubmit, buttonName, title, task, isEnabled}: ModalTaskProps) {
    const [taskForm, setTaskForm] = useInputHook<Task>(task || emptyTask);

    const handleClick = () => {
        handleSubmit && handleSubmit(taskForm);
    }

    const handleClose = () => {
        setTaskForm(emptyTask);
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Titulo</FormLabel>
                                <Input name="title" readOnly={!isEnabled} value={taskForm.title} onChange={(e) => setTaskForm({title: e.target.value})}/>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Descripción</FormLabel>
                                <Input name="description" readOnly={!isEnabled} value={taskForm.description ?? ''} onChange={(e) => setTaskForm({description: e.target.value})}/>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Fecha limite</FormLabel>
                                <Input name="dueDate" type="date"  min={getStrActualDate()}  readOnly={!isEnabled} value={taskForm.dueDate as string} onChange={(e) => setTaskForm({dueDate: convertStrToDate(e.target.value)})}/>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Prioridad</FormLabel>
                                <Select name='priority' placeholder='Selecciona prioridad' isDisabled={!isEnabled} value={taskForm.priority} onChange={(e) => setTaskForm({priority: e.target.value as Priority})}>
                                    <option value='ALTA'>Alta</option>
                                    <option value='NORMAL'>Normal</option>
                                    <option value='BAJA'>Baja</option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Cancelar</Button>
                        {buttonName && handleSubmit && (
                            <Button type="submit" colorScheme="blue" ml={3} onClick={handleClick}>
                                {buttonName}
                            </Button>
                        )}
                    </ModalFooter>

            </ModalContent>
        </Modal>
    );
}