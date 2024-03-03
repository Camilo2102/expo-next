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
    }
}
