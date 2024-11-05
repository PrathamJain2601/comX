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
import CommunityLayout from "./pages/Community";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import { Testing } from "./pages/Testing";
import MainCalendar from "./pages/community/Calendar/MainCalendar";
import BasicInformation from "./pages/community/settings/BasicInfo";
import MemberManagement from "./pages/community/settings/MemberManagement";
import Permissions from "./pages/community/settings/Permissions";
import NotificationSettings from "./pages/community/settings/NotificationSettings";
import ChatApp from "./pages/chatApp/ChatApp";
import ProjectDashboard from "./pages/community/project/ProjectDashboard";
import TaskPage from "./pages/community/tasks/TasksPage";

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
      path: "profile/:username",
      element: <Profile />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "testing",
      element: <Testing />,
    },
    {
      path: "community/:ID",
      element: <CommunityLayout />,
      children: [
        {
          path: "calendar",
          element: <MainCalendar />,
        },
        {
          path: "code",
          element: <></>,
        },
        {
          path: "settings/basic-info",
          element: <BasicInformation />,
        },
        {
          path: "settings/member-management",
          element: <MemberManagement />,
        },
        {
          path: "settings/privacy-permissions",
          element: <Permissions />,
        },
        {
          path: "settings/notification",
          element: <NotificationSettings />,
        },
        {
          path: "chat",
          element: <ChatApp />,
        },
        {
          path: "projects",
          element: <ProjectDashboard />,
        },
        {
          path: "tasks",
          element: <TaskPage />,
        },
      ],
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
