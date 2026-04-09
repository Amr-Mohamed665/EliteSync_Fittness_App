import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthenticationCntextProvider } from "./lib/Cntext/AuthenticationCntext";

// Layoutes
import MainLayout from "./components/layout/MainLayout";
import AuthenticationLayout from "./components/layout/AuthenticationLayout";
import ProfileLayout from "./components/layout/ProfileLayout/ProfileLayout";

// ProtectedRoute
import AuthenticationProtectedRoute from "./components/protectedRoutes/AuthenticationProtectedRoute";
import AppProtectedRoute from "./components/protectedRoutes/AppProtectedRoute";

// pages
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import Packages from "./pages/Packages/Packages";
import Home from "./pages/Home/Home";
import NotFoundPage from "./pages/NotFound/NotFound";
import Trainers from "./pages/Trainers/Trainers";
import Classes from "./pages/Classes/Classes";
import Contact from "./pages/Contact/Contact";
import TrainerProfile from "./pages/TrainerProfile/TrainerProfile";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import VerifyEmail from "./pages/Authentication/VerifyEmail";
import ResetPassword from "./pages/Authentication/ResetPassword";
import CompleteProfile from "./pages/Authentication/CompleteProfile";
import Notifications from "./pages/Notifications/Notifications";
import Booking from "./pages/Booking/Booking";
import PackageBooking from "./pages/Booking/PackageBooking";

import Messages from "./pages/UserProfile/Messages";

// Profile Pages
import ProfileOverview from "./pages/UserProfile/ProfileOverview";
import PersonalInfoForm from "./pages/UserProfile/PersonalInfoForm";
import UpcomingSessions from "./pages/UserProfile/UpcomingSessions";
import MyPackages from "./pages/UserProfile/MyPackages";
import ProgressActivity from "./pages/Profile/ProgressActivity";
import WorkoutHistory from "./pages/UserProfile/WorkoutHistory";
import PaymentMethods from "./pages/UserProfile/PaymentMethods";
import BillingHistory from "./pages/UserProfile/BillingHistory";
import SecurityPassword from "./pages/UserProfile/SecurityPassword";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Toaster} from 'react-hot-toast'

const queryClient = new QueryClient();

function App() {
  const routers = createBrowserRouter([
    {path : "" , element : <MainLayout /> , children : [
      {index : true , element : <AppProtectedRoute> <Home/> </AppProtectedRoute> } , 
      {path : "packages" , element : <AppProtectedRoute> <Packages/> </AppProtectedRoute> } ,
      {path : "trainers" , element : <AppProtectedRoute> <Trainers/> </AppProtectedRoute> } ,
      {path : "classes" , element : <AppProtectedRoute> <Classes/> </AppProtectedRoute> } ,
      {path : "contact" , element : <AppProtectedRoute> <Contact/> </AppProtectedRoute> } ,
      {path : "booking/:packageId" , element : <AppProtectedRoute> <Booking/> </AppProtectedRoute> } ,
      {path : "package-booking/:packageId" , element : <AppProtectedRoute> <PackageBooking/> </AppProtectedRoute> } ,
      {
        path: "profile",
        element: <AppProtectedRoute><ProfileLayout /></AppProtectedRoute>,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <ProfileOverview /> },
          { path: "personal-info", element: <PersonalInfoForm /> },
          { path: "messages", element: <Messages /> },
          { path: "messages/:conversationId", element: <Messages /> },
          { path: "sessions", element: <UpcomingSessions /> },
          { path: "packages", element: <MyPackages /> },
          { path: "progress", element: <ProgressActivity /> },
          { path: "workout-history", element: <WorkoutHistory /> },
          { path: "payment", element: <PaymentMethods /> },
          { path: "billing", element: <BillingHistory /> },
          { path: "security", element: <SecurityPassword /> },
        ],
      } ,
      {path : "notifications" , element : <AppProtectedRoute> <Notifications/> </AppProtectedRoute> } ,
      {path : "trainers/:id" , element : <AppProtectedRoute> <TrainerProfile/> </AppProtectedRoute> } ,
      {path : "complete-profile" , element : <AppProtectedRoute><CompleteProfile/></AppProtectedRoute> } ,
      {path : "*" , element : <AppProtectedRoute><NotFoundPage /></AppProtectedRoute> }
    ]} ,
    {path : "" , element : <AuthenticationLayout /> , children : [
      {path : "login" , element : <AuthenticationProtectedRoute><Login/></AuthenticationProtectedRoute> } ,
      {path : "sign-up" , element : <AuthenticationProtectedRoute><SignUp/></AuthenticationProtectedRoute> } ,
      {path : "forgot-password" , element : <AuthenticationProtectedRoute><ForgotPassword/></AuthenticationProtectedRoute> } ,
      {path : "verify/:email/:navigateTo" , element : <AuthenticationProtectedRoute><VerifyEmail/></AuthenticationProtectedRoute> } ,
      {path : "reset-password/:email/:code" , element : <AuthenticationProtectedRoute><ResetPassword/></AuthenticationProtectedRoute> } ,
      
    ]} ,
  ])
  return (
    <div className="dark">
      <AuthenticationCntextProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
          <RouterProvider router={routers} />
        </QueryClientProvider>
      </AuthenticationCntextProvider>
    </div>
  );
}

export default App;
