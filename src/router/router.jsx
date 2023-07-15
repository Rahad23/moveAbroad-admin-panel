import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../component/adminHome/AdminHome";
import AdminEBooks from "../component/adminEBooks/AdminEBooks";
import AdminLiveSeminar from "../component/adminLiveSeminar/AdminLiveSeminar";

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
            }
        ]
    }
]);

export default router;