'use client'


import GetTaskList from "@/components/getTastList";
import CreateTask from "@/components/createTask";

export default function Home(){
    return <>
        <GetTaskList></GetTaskList>
        <CreateTask />
    </>
}