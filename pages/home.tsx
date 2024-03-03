import GetTaskList from "@/components/getTastList";
import CreateTaskComponent from "@/components/createTask";

export default function Home() {
  return (
    <div>
      <GetTaskList></GetTaskList>
      <CreateTaskComponent />
    </div>
  )
} 