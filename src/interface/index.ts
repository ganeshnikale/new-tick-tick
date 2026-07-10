

interface IProject {
  
createAt:string;
projectId:string;
projectName:string;
userId:string;
}

interface Itask {
createAt:string
discription:string;
projectId:string
status:string
text:string
todoId:string
userId:string;
}


export type { IProject, Itask };