'use client'

import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react';
import React, { FormEvent } from "react";


interface ModalTaskProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    buttonName?: string;
    initialRef: React.MutableRefObject<any>;
    finalRef: React.MutableRefObject<any>;
}

export default function TaskModal({ isOpen, onClose, handleSubmit, buttonName, initialRef, finalRef }: ModalTaskProps) {
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader>Create Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input name="title" ref={initialRef} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input name="description" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Due Date</FormLabel>
                                <Input name="dueDate" type="date" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Priority</FormLabel>
                                <Select name='priority' placeholder='Select priority'>
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