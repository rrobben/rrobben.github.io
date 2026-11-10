import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./components/layout/App.tsx";
import Profile from "./components/views/Profile.tsx";
import HowIWork from "./components/views/HowIWork.tsx";
import Experience from "./components/views/Experience.tsx";
import Education from "./components/views/Education.tsx";
import Contact from "./components/views/Contact.tsx";

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Profile />,
            },
            {
                path: "experience",
                element: <Experience />,
            },
            {
                path: "education",
                element: <Education />,
            },
            {
                path: "tech",
                element: <HowIWork />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
