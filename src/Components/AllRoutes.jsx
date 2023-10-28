import HomePage from "Pages/HomePage/HomePage";
import { LoginSignUp } from "Pages/LoginSignPage/LoginSignUp";
import PageNotFound from "Pages/PageNotFound";
import { ProfilePage } from "Pages/LoginSignPage/ProfilePage/ProfilePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
export const AllRoutes = () => {
  
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginSignUp />} />
      <Route path={"/:page"} element={<LoginSignUp />} />
      <Route path={"/profile/:UID"} element={<ProfilePage />} />
      <Route path={"/404"} element={<PageNotFound />} />
    </Routes>
  );
};
