"use client";

import TaskModal from "./taskModal";
import { Task } from "@prisma/client";
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, Text} from '@chakra-ui/react';
import UpdateTask from "./editTask";
import GetOneTask from "./getOneTask";
import { useState } from "react";

export default function TaskCard({ task }: { task: Task }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModalGetOneTask = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  
  return (

    <div onClick={handleOpenModalGetOneTask}>

      <Box p={5} shadow='md' borderWidth='1px'>
        <Heading fontSize='xl'>{task.title}</Heading>
        <Text mt={4}>{task.description}</Text>

        <Badge mt={2} colorScheme={task.completed ? 'green' : 'red'}>
          {task.completed ? 'Completed' : 'Pending'}
        </Badge>

        <Text mt={2}>
          Due: {task.dueDate ? task.dueDate?.toString() : 'No'}
        </Text>

        <Badge mt={2} colorScheme={task.priority === 'HIGH' ? 'red' : 'gray'}>
          {task.priority} Priority
        </Badge>

        <Flex mt={4} justify='space-between'>
          <UpdateTask task={task} />
         
        </Flex>
        
      </Box>

      <GetOneTask id={task.id} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Task Details"
        task={task}
        isEditable={false}
      />
      
    </div>
  )
}
