import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../pages/routes";
import { Context } from "..";
import { ContextAttributes } from "../interfaces/ContextAttributes";
import { ROOT_ROUTE } from "../shared/utils/routes";
import { NavBar } from "./navbar/NavBar";

let id = 1;
const getRoutes = (routes: { Component: () => JSX.Element; path: string }[]) =>
  routes.map(({ path, Component }) => (
    <Route key={id++} path={path} Component={Component} />
  ));

export default function AppRouter() {
  const { user } = useContext(Context) as ContextAttributes;
  const userIsAuth = true || user.isAuth

  return (
    <>
      {userIsAuth && <NavBar />}
      <Routes>
        {userIsAuth &&  getRoutes(authRoutes)}
        <Route path="*" element={<Navigate to={ROOT_ROUTE} replace />} />
      </Routes>
    </>
  );
}
