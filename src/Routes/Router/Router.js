import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import Completed from "../../Pages/Completed/Completed";
import CompletedTasks from "../../Pages/CompletedTasks/CompletedTasks";
import Login from "../../Pages/Login/Login";
import MyTask from "../../Pages/MyTask/MyTask";
import NotFound from "../../Pages/Others/NotFound/NotFound";
import SignUp from "../../Pages/SignUp/SignUp";
import Update from "../../Update/Update";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <AddTask></AddTask>
            },
            {
                path: '/mytask',
                element:
                    <PrivateRoute>
                        <MyTask></MyTask>
                    </PrivateRoute>
            },
            {
                path: '/completedtasks',
                element:
                    <PrivateRoute>
                        <Completed></Completed>
                    </PrivateRoute>,
            },
            {
                path: '/completedtasks/:id',
                element:
                    <PrivateRoute>
                        <CompletedTasks></CompletedTasks>
                    </PrivateRoute>,
                loader: async ({ params }) => fetch(`https://my-task-manager-server.vercel.app/tasks/${params.id}`)
            },
            {
                path: '/tasks/:id',
                element:
                    <PrivateRoute>
                        <Update></Update>
                    </PrivateRoute>,
                loader: async ({ params }) => fetch(`https://my-task-manager-server.vercel.app/tasks/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
        ]

    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
]);