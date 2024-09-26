import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** ROUTE ELEMENTS */
/** all elements for the routes */
import { HomeLayout, LoginPage, RegisterPage, LandingPage } from "./utils";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
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
