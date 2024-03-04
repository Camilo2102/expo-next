export const typeDefs = `
  type Task {
    id: ID
    title: String!
    description: String
    completed: Boolean! 
    dueDate: String
    priority: Priority!
  }
  
  enum Priority {
    HIGH
    NORMAL
    LOW  
  }
  
  input TaskWhereUniqueInput {
    id: ID
  }
  
  input CreateTaskInput {
    title: String!
    description: String
    completed: Boolean
    dueDate: String
    priority: Priority  
  }
  
  input UpdateTaskInput {
    title: String
    description: String
    completed: Boolean
    dueDate: String 
    priority: Priority
  }
  
  type Query {
    tasks: [Task!]!
    task(where: TaskWhereUniqueInput): [Task!]!
  }
  
  type Mutation {
    createTask(data: CreateTaskInput!): Task! 
    updateTask(id: ID!, data: UpdateTaskInput!): Task
    deleteTask(where: TaskWhereUniqueInput!): Task  
  }
  
`

//updateTask(data: UpdateTaskInput!, where: TaskWhereUniqueInput!): Task