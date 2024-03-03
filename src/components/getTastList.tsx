'use client'

import { gql, useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react';

import type { Task } from '@prisma/client'
import TaskCard from './taskCard';

const getAllQuery = gql`
  query {
    tasks {
      id
      title
      description
      completed
      dueDate 
      priority
    }
  }`

export default function GetTaskList() {
    const { data, loading, error } = useQuery(getAllQuery);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>

    return (
        <Stack spacing='4'>
           {data.tasks.map((task: Task) => (
            <TaskCard task={task} key={"card-"+task.id}></TaskCard>
           ))}
        </Stack>
    )


}