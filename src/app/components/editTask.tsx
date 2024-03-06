import { gql, useMutation } from "@apollo/client";
import { Button, Flex } from "@chakra-ui/react";
import TaskModal from "./taskModal";
import { FormEvent, useState } from "react";
import { Priority, Task } from "@prisma/client";
import { EditIcon } from "@chakra-ui/icons";
import { useReloadContext } from "../context/taskContext";

const UPDATE_TASK_MUTATION = gql`
  mutation ($id: ID!, $data: UpdateTaskInput!) {
    updateTask(
      id: $id,
      data: $data
    ) {
      id
      dueDate
      description
      completed
      priority
      title
    }
  }
`;

type taskUpdate = {
    title: string
    description: string | null
    completed: boolean
    dueDate: string | null
    priority: Priority
}

export default function UpdateTask({ task }: { task: Task }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const {reloadTable} = useReloadContext();

    const handleUpdateTask = async (task: Task) => {
        try {
            const taskData: taskUpdate = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                dueDate: task.dueDate,
                priority: task.priority
              };
            await updateTask({ variables: { id: task.id, data: taskData } });
            reloadTable();
            closeEditModal();
        } catch (error: any) {
            console.error('Error updating task:', error.message);
        }
    };

    return (
        <div>
            <Button colorScheme='blue' leftIcon={<EditIcon/>} onClick={openEditModal}>
                Editar
            </Button>
            <TaskModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                title="Edit Task"
                buttonName="Save Changes"
                handleSubmit={handleUpdateTask}
                task={task}
                isEnabled={true}
            />
        </div>
    );
}
