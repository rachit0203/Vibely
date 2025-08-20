import React from 'react';
import { Routes, Route, Navigate } from "react-router";


import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";;
import OnboardingPage from "./pages/OnboardingPage.jsx";

import { Toaster } from "react-hot-toast";
import PageLoader from './Componenets/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';

const App = () => {
  
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  console.log(isAuthenticated);
  const isOnboarded = authUser?.isOnboarded;
  console.log(isOnboarded);

  if(isLoading) return <PageLoader />;

  return (



    <div className='bg-red-500 h-screen' data-theme='forest'>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <HomePage /> 
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"  } />
        ) } />
        <Route path="/signup" 
        element={
          !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />   
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          } />
        <Route path="/notifications" element={isAuthenticated ? <NotificationPage /> : <Navigate to={"/login"} />} />
        <Route path="/call" element={isAuthenticated ? <CallPage />  : <Navigate to={"/login"}/>} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage />  : <Navigate to={"/login"}/>} />
        <Route path="/onboarding" element={
          isAuthenticated ? (
            !isOnboarded ? (
              <OnboardingPage /> 
            ) : (
              <Navigate to={"/"} />
            )
        ) : (<Navigate to={"/login"} /> )} />
        
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
