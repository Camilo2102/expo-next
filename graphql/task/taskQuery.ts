export const taskQuery = {

    tasks: () => {
        return prisma.task.findMany()
      }
}