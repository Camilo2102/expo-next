import { Task } from "@prisma/client";
import prisma from "../../lib/prisma";

export const taskMutation = {
    createTask: async (_: any, { data }: { data: Task }) => {
        try {
            const newTask = await prisma.task.create({
                data: {
                    title: data.title,
                    description: data.description,
                    completed: data.completed || false,
                    dueDate: data.dueDate,
                    priority: data.priority
                },
            });
            return newTask;
        } catch (error: any) {
            throw new Error(`Error creating task: ${error.message}`);
        }
    },
    updateTask: async (_: any, { id, data }: { id: string, data: Task}) => {

        try {
            const updatedTask = await prisma.task.update({
                where: {
                    id
                },
                data: {
                    title: data.title,
                    description: data.description,
                    completed: data.completed,
                    dueDate: data.dueDate,
                    priority: data.priority
                }
            });
            return updatedTask;
        } catch (error: any) {
            throw new Error(`Error updating task: ${error.message}`);
        }
    },
}
