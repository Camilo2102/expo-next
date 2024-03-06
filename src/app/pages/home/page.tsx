'use client'


import GetTaskList from "@/app/components/getTastList";
import CreateTask from "@/app/components/createTask";
import { Box,  ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";

export default function Home() {
    return (
        <Box w="100%" p={4} mt={4}>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box p='2'>
                    <Heading size='md'>Lista de tareas</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <CreateTask />
                </ButtonGroup>
            </Flex>
            <Box mt={8}>
                <GetTaskList></GetTaskList>
            </Box>
        </Box>
    )
}