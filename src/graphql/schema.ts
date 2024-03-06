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
    ALTA
    NORMAL
    BAJO 
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
    task(id: ID!): Task!
  }
  
  type Mutation {
    createTask(data: CreateTaskInput!): Task! 
    updateTask(id: ID!, data: UpdateTaskInput!): Task
    deleteTask(id: ID!): Task  
  }
  
`

//updateTask(data: UpdateTaskInput!, where: TaskWhereUniqueInput!): Task