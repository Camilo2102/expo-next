'use client'

import { Task } from "@prisma/client";
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import UpdateTask from "./editTask";

export default function TaskCard({ task }: { task: Task }) {

  
  return (

    <div>

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
      
    </div>
  )
}