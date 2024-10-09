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
  IndexPage,
  ErrorPage,
  CreatePost,
  UpdateUser,
} from "./utils";

/** action and loader functions to submit and load data*/
import { action as registerAction } from "./pages/RegisterPage.jsx";
import { action as loginAction } from "./pages/LoginPage.jsx";
import { action as createPostAction } from "./pages/DashboardPages/CreatePost.jsx";
import { action as updateUserAction } from "./pages/UpdateUser.jsx";
import { loader as getLoggedUser } from "./pages/DashboardPages/DashboardLayout.jsx";
import { loader as getAllPhotos } from "./pages/DashboardPages/IndexPage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      loader: getLoggedUser,
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
          path: "update-user/:id",
          element: <UpdateUser />,
          action: updateUserAction,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          loader: getLoggedUser,
          children: [
            {
              path: "index",
              element: <IndexPage />,
              loader: getAllPhotos,
            },
            {
              path: "create-post",
              element: <CreatePost />,
              action: createPostAction,
            },
          ],
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
