import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/Home";
import SignUp from "./pages/Signup";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/404Page";
import { RootState } from "./state/store";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/DashBoard";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import { Testing } from "./pages/Testing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "SignUp",
      element: <SignUp />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
    {
      path: "community/:ID",
      element: <Community />,
    },
    {
      path: "profile/:username",
      element: <Profile />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "testing",
      element: <Testing />
    },
  ]);

  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
