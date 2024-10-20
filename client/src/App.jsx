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
  // IndexPage,
  ErrorPage,
  CreatePost,
  UpdateUser,
  PostPage,
  ProfilePage,
  DeletePage,
  DeletePostPage,
  AboutPage,
} from "./utils";

/** action and loader functions to submit and load data*/
import { action as registerAction } from "./pages/RegisterPage.jsx";
import { action as loginAction } from "./pages/LoginPage.jsx";
import { action as createPostAction } from "./pages/DashboardPages/CreatePost.jsx";
import { action as updateUserAction } from "./pages/UpdateUser.jsx";
import { action as deleteCommentAction } from "./pages/DashboardPages/DeletePage.jsx";
import { action as deletePostAction } from "./pages/DashboardPages/DeletePostPage.jsx";
import { loader as getLoggedUser } from "./pages/HomeLayout.jsx";
import { loader as getAllPhotos } from "./pages/DashboardPages/IndexPage.jsx";
import { loader as getSinglePhoto } from "./pages/DashboardPages/PostPage.jsx";
import { loader as getUser } from "./pages/DashboardPages/ProfilePage.jsx";

import { lazy, Suspense } from "react";
import Loading from "./components/Loading.jsx";

const IndexPage = lazy(() => import("./pages/DashboardPages/IndexPage.jsx"));

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
          path: "profile/:id",
          element: <ProfilePage />,
          loader: getUser,
        },

        {
          path: "dashboard",
          element: <DashboardLayout />,
          // loader: getLoggedUser,
          children: [
            {
              path: "home",
              element: (
                <Suspense fallback={<Loading />}>
                  <IndexPage />
                </Suspense>
              ),
              loader: getAllPhotos,
            },
            {
              path: "about",
              element: <AboutPage />,
            },
            {
              path: "create-post",
              element: <CreatePost />,
              action: createPostAction,
            },
            {
              path: "post/deletePost/:id",
              element: <DeletePostPage />,
              action: deletePostAction,
            },
            {
              path: "post/:id",
              element: <PostPage />,
              loader: getSinglePhoto,
            },

            {
              path: "post/deleteComment/:photoId/:commentId",
              element: <DeletePage />,
              action: deleteCommentAction,
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
