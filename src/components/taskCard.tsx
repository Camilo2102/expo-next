"use client";

import TaskModal from "./taskModal";
import { Task } from "@prisma/client";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import GetOneTask from "./getOneTask";


export default function TaskCard({ task }: { task: Task }) {
  const [viewOne, setViewOne] = useState<boolean>(false);

  return (
    <>
      <Box p={5} shadow="md" borderWidth="1px" onClick={()=>setViewOne(true)}>
        <Heading fontSize="xl">{task.title}</Heading>
        <Text mt={4}>{task.description}</Text>

        <Badge mt={2} colorScheme={task.completed ? "green" : "red"}>
          {task.completed ? "Completed" : "Pending"}
        </Badge>

        <Text mt={2}>
          Due: {task.dueDate ? task.dueDate?.toString() : "No"}
        </Text>

        <Badge mt={2} colorScheme={task.priority === "HIGH" ? "red" : "gray"}>
          {task.priority} Priority
        </Badge>
      </Box>

      {viewOne && <GetOneTask id={task.id}></GetOneTask>}
    </>
  );
}
