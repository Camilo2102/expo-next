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

export default function DeleteTask({task}: {task: Task}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)
  
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
                <Button colorScheme='red' onClick={onClose} ml={3}>
                  Eliminar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )


}