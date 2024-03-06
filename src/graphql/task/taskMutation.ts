import { Task } from "@prisma/client";
import prisma from "../../lib/prisma";

export const taskMutation = {
    createTask: (_: any, { data }: { data: Task }) => {
        return prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                completed: data.completed || false,
                dueDate: data.dueDate,
                priority: data.priority
            },
        });
    },
    updateTask: (_: any, { id, data }: { id: string, data: Task }) => {
        return prisma.task.update({
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
    },
    deleteTask: (_: any, { id }: { id: string }) => {
        return prisma.task.delete(
            {
                where: {
                    id
                }
            }
        )
    }
}
