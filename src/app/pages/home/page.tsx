'use client'

import CreateTaskComponent from "@/components/createTask";
import GetTaskList from "@/components/getTastList";

export default function Home(){
    return <>
        <GetTaskList></GetTaskList>
        <CreateTaskComponent />
    </>
}