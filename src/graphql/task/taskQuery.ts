import prisma from "../../lib/prisma";

export const taskQuery = {
  tasks: () => {
    return prisma.task.findMany();
  },
  task: (id: string) => {
    return prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  },
};
