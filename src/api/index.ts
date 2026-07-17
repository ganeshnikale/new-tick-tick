import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "@/firebase/index.ts";

import type {IProject, Itask} from '@/interface/index.ts';


export const getProjectsByUserId = async (uid:string) => {
  const q = query(collection(db, "projects"), where("userId", "==", uid));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as IProject);
};


export const getTodosByUserId = async (uid:string) => {
  const q = query(collection(db, "todos"), where("projectId", "==", uid));

  const querySnapshot = await getDocs(q);
  let sortedTasks: { [key: string]: Itask[] } = {};
   querySnapshot.forEach((doc) => {

     sortedTasks[doc.data().status] = sortedTasks[doc.data().status] || [];
     sortedTasks[doc.data().status].push(doc.data() as Itask);
  });

  return sortedTasks;
  
};


export const getAllTaksByUserId = async (uid:string) => {
  const q = query(collection(db, "todos"), where("userId", "==", uid));

  const querySnapshot = await getDocs(q);
  let sortedTasks: { [key: string]: Itask[] } = {};
   querySnapshot.forEach((doc) => {

     sortedTasks[doc.data().status] = sortedTasks[doc.data().status] || [];
     sortedTasks[doc.data().status].push(doc.data() as Itask);
  });
console.log(sortedTasks);
  return sortedTasks;
  
};

