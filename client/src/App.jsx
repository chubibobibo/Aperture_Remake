import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** ROUTE ELEMENTS */
/** all elements for the routes */
import {
  HomeLayout,
  LoginPage,
  RegisterPage,
  LandingPage,
  DashboardLayout,
} from "./utils";

/** action and loader functions to submit and load data*/
import { action as registerAction } from "./pages/RegisterPage.jsx";
import { action as loginAction } from "./pages/LoginPage.jsx";
import { loader as getLoggedUser } from "./pages/DashboardPages/DashboardLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
          action: loginAction,
        },
        {
          path: "register",
          element: <RegisterPage />,
          action: registerAction,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          loader: getLoggedUser,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
