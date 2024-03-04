import prisma from "../../lib/prisma";

export const taskQuery = {
  tasks: () => {
    return prisma.task.findMany();
  },
  task: (_: any, { id }: { id: string}) => {
    return prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  },
};
