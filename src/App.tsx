import { useEffect, useState } from 'react'

import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "./firebase/index.ts";
import './App.css';
import type {IProject, Itask} from './interface/index.ts';

function App() {
  
let [projects, setProjects] = useState<IProject[]>([]);
let [tasksDone, setTasksDone] = useState< Itask[] >();
let [tasksInReview, setTasksInReview] = useState< Itask[] >();
let [tasksInProgress, setTasksInProgress] = useState< Itask[] >();

const getProjectsByUserId = async (uid:string) => {
  const q = query(collection(db, "projects"), where("userId", "==", uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {

    // console.log("Project ID:", doc.id, "=> Data:", doc.data());
    setProjects((prevProjects) => [...prevProjects, doc.data() as IProject]);
  });
};


const getTodosByUserId = async (uid:string) => {
  const q = query(collection(db, "todos"), where("userId", "==", uid));

  const querySnapshot = await getDocs(q);
  let sortedTasks: { [key: string]: Itask[] } = {};
  querySnapshot.forEach((doc) => {

     console.log("Todo ID:", doc.id, "=> Data:", doc.data().status);

     sortedTasks[doc.data().status] = sortedTasks[doc.data().status] || [];
     sortedTasks[doc.data().status].push(doc.data() as Itask);
  });

  setTasksDone(sortedTasks['done']);
  setTasksInProgress(sortedTasks['inProgress']);
  setTasksInReview(sortedTasks['inReview']);
 
  
};


useEffect(() => {
  
  getProjectsByUserId("105950886150924190679");
  getTodosByUserId("105950886150924190679");

}, []);


//done inProgress inReview
  
  return (
   
<div>
    {/* {projects.map((task, index) => (
      <div key={index}>
        <p>Project Name: {task.projectName}</p>
        <p>Project ID: {task.projectId}</p>
        <p>User ID: {task.userId}</p>
        <p>Created At: {task.createAt}</p>
      </div>
    ))} */}

    {tasksDone && tasksDone.map((task, index) => (
      <div key={index}>
        <p>Task Text: {task.text}</p>
        <p>Task ID: {task.todoId}</p>
        <p>User ID: {task.userId}</p>
        <p>Status: {task.status}</p>
        <p>Description: {task.discription}</p>
        <p>Project ID: {task.projectId}</p>
        <p>Created At: {task.createAt}</p>
      </div>
    ))}

     
  </div>


  )
}

export default App
