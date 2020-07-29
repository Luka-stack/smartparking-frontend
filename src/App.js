import React from 'react';
import RenderNavBar from './component/NavBar';
import AppRoutes from './AppRoutes';
import './App.css';


export default function App() {
    return (
      <>
        <RenderNavBar />
        <AppRoutes />
      </>
    );
}