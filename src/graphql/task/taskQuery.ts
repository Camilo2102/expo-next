import prisma from "../../lib/prisma";

export const taskQuery = {
    tasks: () => {
        return prisma.task.findMany()
    }
}