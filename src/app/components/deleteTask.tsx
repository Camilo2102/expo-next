import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'

import React from 'react'
import { Task } from '@prisma/client'
import { gql, useMutation } from '@apollo/client'
import { useReloadContext } from '../context/taskContext'


const DELETE_TASK_MUTATION = gql`
mutation ($id: ID!) {
  deleteTask(id: $id) {
    completed
    description
    dueDate
    id
    priority
    title
  }
}
`


export default function DeleteTask({ task }: { task: Task }) {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

  const {reloadTable}= useReloadContext();

  const handleDelete = async () => {
    await deleteTask({variables: {id: task.id}});
    onClose()
    reloadTable()
  }

  return (
    <>
      <Button colorScheme='red' leftIcon={<DeleteIcon />} onClick={onOpen}>
        Eliminar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Deseas eliminar la tarea: {task.title}
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas seguro, esta accion no se puede deshacer
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )


}