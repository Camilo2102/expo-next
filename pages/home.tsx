import { gql, useQuery } from '@apollo/client'
import type { Task } from '@prisma/client'

const getAllQuery = gql`
  query {
    tasks {
      id
      title
      description
      completed
      dueDate 
      priority
    }
  }`

export default function Home(){
    const {data, loading, error} = useQuery(getAllQuery);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>

    return data.tasks.map((task: Task) => (
            <li key={task.id} className="shadow  max-w-md  rounded">
              <h2>{task.title}</h2>
            </li>
          ))
    
} 