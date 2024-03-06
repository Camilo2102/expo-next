"use client";

import TaskModal from "./taskModal";
import { Task } from "@prisma/client";
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, Td, Text, Tr } from '@chakra-ui/react';
import UpdateTask from "./editTask";
import GetOneTask from "./getOneTask";
import { useState } from "react";
import DeleteTask from "./deleteTask";
import {convertStrToDate} from "../utils/dateUtil";

export default function TaskRow({ task }: { task: Task }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModalGetOneTask = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  

  return (
    <>
      <Tr>
        <Td>{task.title}</Td>
        <Td>{task.description}</Td>
        <Td>{task.title}</Td>
        <Td><Badge mt={2} colorScheme={task.completed ? 'green' : 'red'}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </Badge>
        </Td>
        <Td>
          {task.dueDate ? convertStrToDate(task.dueDate) : 'No aplica'}
        </Td>
        <Td>
          <Badge mt={2} colorScheme={task.priority === 'ALTA' ? 'red' : 'gray'}>
            {task.priority} Prioridad
          </Badge>
        </Td>
        <Td>
          <GetOneTask id={task.id}></GetOneTask>
        </Td>
        <Td>
          <UpdateTask task={task} />
        </Td>
        <Td>
          <DeleteTask task={task} />
        </Td>
      </Tr>
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Task Details"
        task={task}
        isEnabled={false}
      />
    </>
  )
}
