'use client'

import { Task } from "@prisma/client";
import { Badge, Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

export default function TaskCard    ({ task }: { task: Task }) {
    return (
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
    </Box>
    )
}