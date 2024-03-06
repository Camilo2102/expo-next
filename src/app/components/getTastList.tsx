'use client'

import { QueryResult, gql, useLazyQuery, useQuery } from '@apollo/client'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import type { Task } from '@prisma/client'
import TaskRow from './taskRow';
import LoadingComponent from './loadingComponent';
import { useEffect, useState } from 'react';
import { useReloadContext } from '../context/taskContext';

const GET_ALL_QUERY = gql`
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
  const [getAllTasks, { refetch }] = useLazyQuery(GET_ALL_QUERY);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {reload} = useReloadContext();

  const getTasks = () => {
    setLoading(true);

    refetch().then(res => {
      setTasks(res.data.tasks)
    }).catch(error => {
      setError(error as Error)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getTasks()
  }, [reload])

  if(loading) return <LoadingComponent></LoadingComponent>

  if(error) return <p>Oh no... {error.message}</p>;

  return (
    <TableContainer borderWidth='1px' borderRadius='lg'>
      <Table variant='simple'>
        <TableCaption>Lista de tareas</TableCaption>
        <Thead>
          <Tr>
            <Th>Titulo</Th>
            <Th>Descripcion</Th>
            <Th>Completada</Th>
            <Th>Estado</Th>
            <Th>Fecha limite</Th>
            <Th>Prioridad</Th>
            <Th>Detalle</Th>
            <Th>Editar</Th>
            <Th>Eliminar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task: Task) => (
            <TaskRow task={task} key={"row-" + task.id}></TaskRow>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )


}