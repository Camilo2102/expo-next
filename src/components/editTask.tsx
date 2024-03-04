import { gql, useMutation } from "@apollo/client";
import { Button, Flex } from "@chakra-ui/react";
import TaskModal from "./taskModal";
import { FormEvent, useState } from "react";
import { Task } from "@prisma/client";

const UPDATE_TASK_MUTATION = gql`
  mutation MyMutation($id: ID!, $data: UpdateTaskInput!) {
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



export default function UpdateTask({ task }: { task: Task }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
           
            const idTask = task.id;
            
            console.log(idTask);
            

            const formData = new FormData(e.target as HTMLFormElement);
            const title = formData.get('title') as string;
            const description = formData.get('description') as string;
            const dueDate = new Date(formData.get('dueDate') as string).toISOString();
            const priority = formData.get('priority') as string;
            const completed = task.completed;

            const data = {
                title,
                description,
                dueDate,
                completed,
                priority
            };

            await updateTask({ variables: { id: idTask, data } });

            closeEditModal();
        } catch (error: any) {
            console.error('Error updating task:', error.message);
        }
    };

    return (
        <div>
            <Button colorScheme='blue' onClick={openEditModal}>
                Edit
            </Button>
            <TaskModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                title="Edit Task"
                buttonName="Save Changes"
                handleSubmit={handleUpdateTask}
                task={task}
            />
        </div>
    );
}
