import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/genral/Home";
import SignUp from "./pages/auth/Signup";
import LoginPage from "./pages/auth/Login";
import NotFoundPage from "./pages/genral/404Page";
import { RootState } from "./state/store";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Contact from "./pages/genral/Contact";
import Profile from "./pages/profile/Profile";
import { Testing } from "./pages/Testing";
import ChatApp from "./pages/chatApp/ChatApp";
import Dashboard from "./pages/dashboard/DashBoard";
import ForgotPassword from "./pages/auth/components/ForgotPassword";
import CommunityLayout from "./pages/community/Community";
import MainCalendar from "./pages/Calendar/MainCalendar";
import BasicInformation from "./pages/community-settings/BasicInfo";
import MemberManagement from "./pages/community-settings/MemberManagement";
import NotificationSettings from "./pages/community-settings/NotificationSettings";
import Permissions from "./pages/community-settings/Permissions";
import ProjectDashboard from "./pages/project/ProjectDashboard";
import TaskPage from "./pages/tasks/TasksPage";

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
          path: "project/:projectId",
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
