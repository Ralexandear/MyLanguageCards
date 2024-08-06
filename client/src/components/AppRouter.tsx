import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '..';
import { ContextAttributes } from '../interfaces/ContextAttributes';

const getRoutes = (routes: {Component: () => JSX.Element, path: string}[]) => routes.map(({path, Component}) => <Route path={path} Component={Component} /> )

export default function AppRouter() {
  const {user} = useContext(Context) as ContextAttributes;
  console.log(user)
  return (
    <Routes>
      {
        user.isAuth && getRoutes( authRoutes )
      }
      {
        getRoutes( publicRoutes )
      }
      <Route path="*" element={<Navigate to={ LOGIN_ROUTE } replace />} />
    </Routes>
  )
}
