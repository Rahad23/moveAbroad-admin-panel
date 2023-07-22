import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../component/adminHome/AdminHome";
import AdminEBooks from "../component/adminEBooks/AdminEBooks";
import AdminLiveSeminar from "../component/adminLiveSeminar/AdminLiveSeminar";
import Login from "../component/Login_Registration/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminHome />,
        children:[
            {
                path: "/adminEbooks",
                element: <AdminEBooks />
            },
            {
                path:"/live_seminar",
                element: <AdminLiveSeminar />
            },
            
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
]);

export default router;