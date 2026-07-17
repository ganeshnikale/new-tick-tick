import RootLayout from "@/layout/RootLayout";
import App from "@/App";
import AddProject from "@/pages/projects/addProject";
import TaskDetails from "@/pages/taks/taskDetails";

import {
    createBrowserRouter,
} from "react-router";
import Pomodoro from "@/pages/pomodoro/pomodoro";

let router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: App },
            {
                path: "/addProject/",
                Component: AddProject,
            },
            {
                path: "/taskDetails/:taskId",
                Component: TaskDetails,
            },
            {
                path:"pomodoro",
                Component: Pomodoro
            }

        ]



    },

]);


export default router;