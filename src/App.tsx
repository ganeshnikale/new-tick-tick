import { useEffect, useState } from 'react'
import '@/App.css';
import type { IProject, Itask } from '@/interface/index.ts';
import { getProjectsByUserId, getTodosByUserId } from '@/api/index.ts';
import { Link } from 'react-router-dom';

function App() {

  let [projects, setProjects] = useState<IProject[]>([]);
  let [tasksDone, setTasksDone] = useState<Itask[]>();
  let [tasksInReview, setTasksInReview] = useState<Itask[]>();
  let [tasksInProgress, setTasksInProgress] = useState<Itask[]>();
  let [selectedProject, setSelectedProject] = useState<string>('');


  async function fetchProjects() {
    let data = await getProjectsByUserId("105950886150924190679");
    setProjects((prevVal) => [...prevVal, ...data]);
  }

  async function fetchTodos(projectId: string) {
    let data = await getTodosByUserId(projectId);
    setTasksDone(data['done']);
    setTasksInReview(data['in-review']);
    setTasksInProgress(data['in-progress']);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTodos(selectedProject);
  }, [selectedProject]);



  return (
    <div>
      <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
        <option value="">Select a project</option>
        {projects.map((task, index) => (
          <option key={index} value={task.projectId}>
            {task.projectName}

          </option>
        ))}
      </select>

      {selectedProject}
      {tasksDone && tasksDone.map((task, index) => (
        <div key={index}>
          <p>Task Text: {task.text}</p>
          <p>Task ID: {task.todoId}</p>
          <p>User ID: {task.userId}</p>
          <p>Status: {task.status}</p>o
          <p>Description: {task.discription}</p>
          <p>Project ID: {task.projectId}</p>
          <p>Created At: {task.createAt}</p>
          <Link to={`taskDetails/${task.todoId}`}>View</Link>
        </div>
      ))}

      {tasksInReview && tasksInReview.map((task, index) => (
        <div key={index}>
          <p>Task Text: {task.text}</p>
          <p>Task ID: {task.todoId}</p>
          <p>User ID: {task.userId}</p>
          <p>Status: {task.status}</p>o
          <p>Description: {task.discription}</p>
          <p>Project ID: {task.projectId}</p>
          <p>Created At: {task.createAt}</p>
          <Link to={`taskDetails/${task.todoId}`}>View</Link>
        </div>
      ))}

      {tasksInProgress && tasksInProgress.map((task, index) => (
        <div key={index}>
          <p>Task Text: {task.text}</p>
          <p>Task ID: {task.todoId}</p>
          <p>User ID: {task.userId}</p>
          <p>Status: {task.status}</p>o
          <p>Description: {task.discription}</p>
          <p>Project ID: {task.projectId}</p>
          <p>Created At: {task.createAt}</p>
          <Link to={`taskDetails/${task.todoId}`}>View</Link>
        </div>
      ))}


    </div>


  )
}

export default App
