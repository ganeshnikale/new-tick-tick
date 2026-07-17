import { getAllTaksByUserId } from "@/api";
import type { Itask } from "@/interface";
import { useEffect, useState } from "react";


const Pomodoro = () => {
    let [tasksInReview, setTasksInReview] = useState<Itask[]>();
    let [tasksInProgress, setTasksInProgress] = useState<Itask[]>();
    let [timerActive, setTimerActive] = useState(false);
    let [seconds, setSeconds] = useState(0);
    let [work, setWork] = useState(true);
    let [sessionCounter, setSessionCounter] = useState(0);
    

    async function fetchTodos(projectId: string) {
        let data = await getAllTaksByUserId(projectId);
        setTasksInReview(data['inReview']);
        setTasksInProgress(data['inProgress']);

    }

    useEffect(() => {
        fetchTodos('105950886150924190679');
    }, []);





    useEffect(() => {
        let sec = null;

        if(timerActive && work) {
            console.log("in work");
            sec = setInterval(() => {
                setSeconds((prev) => {
                    if(prev < 20) {
                       return prev + 1 
                    } else {
                        setWork(false)
                        setSessionCounter((prev) => prev+1);
                        return 0
                    }
                })
            }, 1000);
        }

        if(timerActive && !work) {
            console.log("in break")
            sec = setInterval(() => {
                setSeconds((prev) => {
                    if(prev < 10 ) {
                       return prev + 1
                    } else {
                        setWork(true)
                        return 0
                    }
                } )
            }, 1000);
        }

        return () => {
            if(sec) {
                clearInterval(sec)
            }
        };

    }, [timerActive,work]);

    const handleReset = () =>{
        setTimerActive(false);
        setSeconds(0);
    }

    const formatTime = (totalSeconds:number) =>{
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return `${minutes} :${seconds}`


    }


    return (
        <div>
            <h1> Select Task For </h1>
            <select onChange={(e) => console.log(e.target.value)}>
                <option value="">Select a task</option>
                {tasksInReview && tasksInReview.map((task: Itask, index: number) =>
                    <option key={index} value={JSON.stringify(task)}>{task.text}</option>
                )}
            </select>

            <h1>Pomodoro Timer</h1>
            {sessionCounter}
            <button onClick={() => handleReset()}>reset</button>
            <button onClick={() => setTimerActive(!timerActive)}> {timerActive ? 'pause' : 'play'} </button>
            {formatTime(seconds)}
        </div>

    )
}

export default Pomodoro;