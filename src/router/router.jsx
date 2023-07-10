import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../component/adminHome/AdminHome";
import AdminEBooks from "../component/adminEBooks/AdminEBooks";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminHome />,
        children:[
            {
                path: "/adminEbooks",
                element: <AdminEBooks />
            }
        ]
    }
]);

export default router;